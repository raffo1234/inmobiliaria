import { supabase } from "../lib/supabase";
import useSWR from "swr";
import { Button } from "antd";
import { useEffect, useState } from "react";
import Property from "./Property";
import { CloseOutlined } from "@ant-design/icons";
import PropertyItem from "./PropertyItem";

const fetcher = async (userId: string) => {
  const { data, error } = await supabase
    .from("like")
    .select("property(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  console.log({ error });
  if (error) throw error;
  return data;
};

type Property = {
  id: string;
  title: string;
};

export default function PropertiesFavorite({
  userEmail,
}: {
  userEmail: string | undefined | null;
}) {
  const [showDetail, setShowDetail] = useState(false);
  const [propertyValue, setPropertyValue] = useState<Property>();

  const {
    data: properties = [],
    error,
    isLoading,
  } = useSWR(`-properties`, () =>
    fetcher("67fc3f7a-9723-4ca4-bef4-43c7428c76c5")
  );

  const handleClose = () => {
    setPropertyValue(undefined);
    const newUrl = "/";
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

  return (
    <>
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
          return (
            <PropertyItem
              key={property.id}
              userEmail={userEmail}
              isLoading={isLoading}
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
