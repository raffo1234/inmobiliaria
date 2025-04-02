import { supabase } from "@lib/supabase";
import useSWR from "swr";
import hero from "@assets/hero.jpg";
import { Skeleton } from "antd";
import { useState } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";
import EditProperty from "@components/EditProperty";
import { PropertyState } from "@types/propertyState";
const PropertyItem = ({ id }: { id: string }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <a href={`inmueble/${id}`}>
        <img
          src={hero.src}
          className="w-full h-[320px] object-cover object-top rounded-lg mb-4"
          alt="Inmobiliaria"
        />
      </a>
      <span
        className={`${hover ? "opacity-100" : "opacity-0"} transition-opacity block absolute left-0 top-0 w-full h-full bg-black bg-opacity-25 rounded-lg`}
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      >
        <div className="absolute bottom-0 left-0 w-full p-5 flex gap-5 text-white">
          <EditProperty id={id} />
          <a href={`../inmueble/${id}`} target="_blank" className="">
            <ArrowUpOutlined className="rotate-45 text-3xl" />
          </a>
        </div>
      </span>
    </div>
  );
};

const fetcher = async () => {
  const { data, error } = await supabase
    .from("property")
    .select(
      `
      id,
      title,
      description,
      location,
      state,
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

  return (
    <section
      className="grid gap-8"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(336px, 1fr))",
      }}
    >
      {properties.map((property) => {
        const { id, title, state } = property;
        if (error) console.error(error);

        if (isLoading) return <Skeleton />;

        return (
          <article key={id}>
            <PropertyItem id={id} />
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-black"></div>
              <h3 className="flex gap-4 justify-between items-start w-full">
                <a href={`inmueble/${id}`} className="font-semibold">
                  {title}
                </a>
                <span
                  className={`rounded border pb-[1px] text-xs px-1 self-center block
                  ${state === PropertyState.DRAFT ? "border-gray-400 text-gray-400" : ""}
                  ${state === PropertyState.PENDING ? "border-cyan-200 text-cyan-200" : ""}
                  ${state === PropertyState.ACTIVE ? "border-green-600 bg-green-600 text-white" : ""}
                  `}
                >
                  {state}
                </span>
              </h3>
            </div>
          </article>
        );
      })}
    </section>
  );
}
