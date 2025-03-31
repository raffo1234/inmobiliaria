import { supabase } from "../lib/supabase";
import useSWR from "swr";
import hero from "../assets/hero.jpg";
import { Skeleton } from "antd";
import { useState } from "react";
import Property from "./Property";

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

type Property = {
  id: string;
  title: string;
};

export default function PropertiesList() {
  const [showDetail, setShowDetail] = useState(false);
  const [propertyValue, setPropertyValue] = useState<Property>();

  const {
    data: properties = [],
    error,
    isLoading,
  } = useSWR("properties", fetcher);

  const toggleShowDetail = () => setShowDetail((prev) => !prev);

  const onClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    property: Property
  ) => {
    event.preventDefault();

    setPropertyValue(property);
    const newUrl = `inmueble/${property.id}`;
    const newState = { page: property.id };
    const newTitle = property.title;
    const app = document.getElementById("app") as HTMLElement;
    app.classList.add("overflow-hidden");
    toggleShowDetail();

    window.history.pushState(newState, newTitle, newUrl);
  };

  return (
    <>
      {showDetail ? (
        <div className="bg-black bg-opacity-40 fixed z-50 top-0 left-0 h-full w-full p-6 overflow-auto">
          <div className="animate-slideUp relative delay-100 transform-all w-[calc(100% - 16px)] mx-auto rounded-lg bg-white h-[200%]">
            <Property property={propertyValue} />
            <h3 className="mb-6">Details</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Veritatis unde sapiente corrupti voluptates recusandae quos
              repudiandae soluta obcaecati totam qui magnam, libero ducimus
              atque neque quidem omnis voluptate natus aperiam?
            </p>
          </div>
        </div>
      ) : null}
      {properties.map((property) => {
        const { id, title } = property;
        if (error) console.error(error);

        if (isLoading) return <Skeleton />;

        return (
          <article key={id}>
            <a
              href={`inmueble/${id}`}
              onClick={(event) => onClick(event, property)}
            >
              <img
                src={hero.src}
                className="w-full h-[320px] object-cover object-top rounded-lg mb-4"
                alt="Inmobiliaria"
              />
            </a>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-black"></div>
              <h3>
                <a href={`inmueble/${id}`} className="font-semibold">
                  {title}
                </a>
              </h3>
            </div>
          </article>
        );
      })}
    </>
  );
}
