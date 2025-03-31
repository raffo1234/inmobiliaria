import { supabase } from "../lib/supabase";
import useSWR from "swr";
import hero from "../assets/hero.jpg";
import { Skeleton } from "antd";
import { useState } from "react";
import Property from "./Property";
import { CloseOutlined } from "@ant-design/icons";

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

  const onClose = () => {
    window.history.back();
  };

  return (
    <>
      {showDetail ? (
        <>
          <div
            onClick={onClose}
            className="bg-black transition-opacity z-30 bg-opacity-40 fixed top-0 left-0 h-full w-full"
          ></div>
          <div className="fixed z-40 top-0 left-0 w-full h-full overflow-auto p-6">
            <div className="animate-slideUp max-w-[1224px] w-full mx-auto relative delay-50 transform-all w-[calc(100% - 16px)] mx-auto rounded-lg bg-white h-[200%]">
              <Property property={propertyValue} />
              <button
                className="absolute right-6 top-6 text-white rounded-full w-12 h-12 bg-black flex justify-center items-center"
                onClick={onClose}
              >
                <CloseOutlined />
              </button>
            </div>
          </div>
        </>
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
