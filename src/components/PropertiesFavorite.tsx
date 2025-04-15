import { supabase } from "../lib/supabase";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Property from "./Property";
import PropertyItem from "./PropertyItem";
import { PropertyState } from "@types/propertyState";
import PropertyDetail from "./PropertyDetail";
import PropertiesGrid from "./PropertiesGrid";
import { Icon } from "@iconify/react";

type Property = {
  id: string;
  title: string;
  user: {
    id: string;
    name: string;
    image_url: string;
  };
};

const fetcher = async (userId: string) => {
  const { data, error } = await supabase
    .from("like")
    .select(
      `
      property(
        id,
        title,
        description,
        state,
        user_id,
        created_at,
        location,
        user!property_user_id_fkey (
          id,
          email,
          name,
          image_url
        ),
        company!property_company_id_fkey (
          id,
          name,
          image_url,
          logo_url
        )
      )
    `
    )
    .eq("property.state", PropertyState.ACTIVE)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export default function PropertiesFavorite({ userId }: { userId: string }) {
  const [showDetail, setShowDetail] = useState(false);
  const [propertyValue, setPropertyValue] = useState<Property | undefined>();
  const [currentHref, setCurrentHref] = useState("");

  const { data: likes = [], isLoading } = useSWR(
    `${userId}-likes-properties`,
    () => (userId ? fetcher(userId) : null)
  );

  useEffect(() => {
    setCurrentHref(window.location.href);
  }, []);

  if (isLoading) return null;

  if (likes?.length === 0) {
    return (
      <div className="max-w-md mx-auto items-center flex flex-col gap-10">
        <div className="flex justify-center w-[300px] rounded-full items-center mx-auto bg-cyan-500 aspect-square bg-opacity-5">
          <Icon
            icon="material-symbols-light:bookmark-heart-outline"
            className="text-[200px] text-cyan-500"
          />
        </div>
        <h1 className="text-center">
          Tu próxima propiedad ideal podría estar esperándote. Explora nuestra
          selección y guarda las que capturen tu interés.
        </h1>
        <a
          href="/"
          className="text-lg flex items-center gap-2 px-6 pb-4 pt-3 bg-black text-white rounded-full transition-colors duration-700 hover:bg-gray-800 active:bg-gray-900"
        >
          <Icon icon="octicon:home-24" fontSize={24}></Icon>
          <span>Ir al Inicio</span>
        </a>
      </div>
    );
  }

  return (
    <>
      {propertyValue ? (
        <PropertyDetail
          userId={userId}
          showDetail={showDetail}
          setShowDetail={setShowDetail}
          propertyValue={propertyValue}
          setPropertyValue={setPropertyValue}
          currentHref={currentHref}
        />
      ) : null}
      <PropertiesGrid>
        {likes?.map(({ property }) => {
          if (property)
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
      </PropertiesGrid>
    </>
  );
}
