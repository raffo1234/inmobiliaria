import { supabase } from "../lib/supabase";
import useSWR from "swr";
import hero from "../assets/hero.jpg";

const fetcher = async () => {
  const { data, error } = await supabase
    .from("property")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export default function PropertiesList() {
  const {
    data: properties = [],
    error,
    isLoading,
  } = useSWR("properties", fetcher);
  console.log(properties, "properties");
  return properties.map(({ id }) => {
    return (
      <article key={id}>
        <a href="/">
          <img
            src={hero.src}
            className="w-full h-[320px] object-cover object-top rounded-lg"
            alt="Inmobiliaria"
          />
        </a>
      </article>
    );
  });
}
