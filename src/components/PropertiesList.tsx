import { supabase } from "../lib/supabase";
import useSWR from "swr";
import hero from "../assets/hero.jpg";

const fetcher = async () => {
  const { data, error } = await supabase
    .from("property")
    .select(
      `
      id,
      title,
      type (
        id,
        name
      )
    `
    )
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

  return properties.map(({ id, title }) => {
    return (
      <article key={id}>
        <a href="/">
          <img
            src={hero.src}
            className="w-full h-[320px] object-cover object-top rounded-lg mb-4"
            alt="Inmobiliaria"
          />
        </a>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-black"></div>
          <h3>
            <a href="/" className="font-semibold">
              {title}
            </a>
          </h3>
        </div>
      </article>
    );
  });
}
