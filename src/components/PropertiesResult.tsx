import { supabase } from "../lib/supabase";
import useSWR from "swr";
import { Button } from "antd";
import { useEffect, useState } from "react";
import Property from "./Property";
import { CloseOutlined } from "@ant-design/icons";
import PropertyItem from "./PropertyItem";
import getLastSlashValueFromCurrentUrl from "src/utils/getLastSlashValueFromCurrentUrl";

type Property = {
  id: string;
  title: string;
};

const columnsToSearch = ["title", "description", "location", "type"];

const fetcher = async (searchTerms: string) => {
  const orConditions = columnsToSearch
    .map((column) => `${column}.ilike.%${searchTerms}%`)
    .join(",");

  const { data, error } = searchTerms
    ? await supabase
        .from("property")
        .select("*")
        .or(orConditions)
        .order("created_at", { ascending: false })
    : await supabase
        .from("property")
        .select("*")
        .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export default function PropertiesFavorite({ userId }: { userId: string }) {
  const [currentHref, setCurrentHref] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [propertyValue, setPropertyValue] = useState<Property>();
  const searchTerms = getLastSlashValueFromCurrentUrl() || "";

  const { data: properties = [] } = useSWR(`${userId}-likes-properties`, () =>
    fetcher(searchTerms)
  );

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
        {properties.map(({ id, title }) => {
          return (
            <PropertyItem
              key={id}
              userId={userId}
              property={{ id, title }}
              setShowDetail={setShowDetail}
              setPropertyValue={setPropertyValue}
            />
          );
        })}
      </section>
    </>
  );
}
