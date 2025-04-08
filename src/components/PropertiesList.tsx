import { supabase } from "../lib/supabase";
import useSWR from "swr";
import { Button } from "antd";
import { useEffect, useState } from "react";
import Property from "./Property";
import { CloseOutlined } from "@ant-design/icons";
import { PropertyState } from "@types/propertyState";
import PropertyItem from "./PropertyItem";

const fetcher = async () => {
  const { data, error } = await supabase
    .from("property")
    .select(
      `
      id,
      title,
      description,
      user_id,
      user!property_user_id_fkey (
        id,
        email,
        name,
        image_url
      )
    `
    )
    .eq("state", PropertyState.ACTIVE)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

type Property = {
  id: string;
  title: string;
};

type User = {
  name: string;
  email: string;
  image: string;
};

export default function PropertiesList({ userId }: { userId: string }) {
  const [currentHref, setCurrentHref] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [propertyValue, setPropertyValue] = useState<Property>();

  const {
    data: properties = [],
    error,
    isLoading,
  } = useSWR("properties", fetcher);

  const handleClose = () => {
    setPropertyValue(undefined);

    const newUrl = currentHref;
    const newState = { page: "Home" };
    const newTitle = "Inmobiliaria";
    const app = document.getElementById("app") as HTMLElement;
    app.classList.remove("overflow-hidden");
    setShowDetail(false);

    window.history.pushState(newState, newTitle, newUrl);
  };

  const onClose = (event?: React.MouseEvent<HTMLElement>) => {
    if (event) {
      if (event.target === event.currentTarget) {
        handleClose();
      }
    } else {
      handleClose();
    }
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", function (event) {
      handleEscape(event);
    });

    return () => {
      document.removeEventListener("keyup", function (event) {
        handleEscape(event);
      });
    };
  }, [showDetail]);

  useEffect(() => {
    setCurrentHref(window.location.href);
  }, []);

  return (
    <>
      <div className="flex justify-end mb-8">
        <a href="/inmuebles/favoritos" title="Mis Favoritos">
          Mis favoritos
        </a>
      </div>
      {showDetail ? (
        <div
          onClick={onClose}
          className="bg-black fixed z-40 top-0 cursor-pointer left-0 w-full h-full overflow-auto p-6 bg-opacity-40"
        >
          <div className="animate-slideUp max-w-[1224px] w-full cursor-default mx-auto relative delay-50 transform-all rounded-lg bg-white min-h-lvh">
            <Property property={propertyValue} />
            <Button
              className="absolute right-6 top-6 rounded-full w-12 h-12 flex justify-center items-center"
              onClick={() => onClose()}
            >
              <CloseOutlined className="text-xl" />
            </Button>
          </div>
        </div>
      ) : null}
      <section
        className="grid gap-8"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(336px, 1fr))",
        }}
      >
        {properties.map((property) => {
          console.log("property", property);
          return (
            <PropertyItem
              key={property.id}
              userId={userId}
              property={property}
              setShowDetail={setShowDetail}
              setPropertyValue={setPropertyValue}
            />
          );
        })}
      </section>
    </>
  );
}
