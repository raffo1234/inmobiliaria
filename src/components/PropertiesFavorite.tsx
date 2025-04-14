import { supabase } from "../lib/supabase";
import useSWR from "swr";
import { useState } from "react";
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
  let query = supabase
    .from("property")
    .select(
      `id,
      title,
      like!inner(user_id),
      user_id,
      user!property_user_id_fkey (
        id,
        email,
        name,
        image_url
      )`
    )
    .eq("state", PropertyState.ACTIVE)

    .order("created_at", { ascending: false });

  if (userId) {
    query = query.eq("user_id", userId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
};

export default function PropertiesFavorite({ userId }: { userId: string }) {
  const [showDetail, setShowDetail] = useState(false);
  const [propertyValue, setPropertyValue] = useState<Property | undefined>();

  const { data: properties = [] } = useSWR(`${userId}-likes-properties`, () =>
    fetcher(userId)
  );

  if (properties.length === 0) {
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
      </div>
    );
  }

  return (
    <>
      {propertyValue ? (
        <PropertyDetail
          showDetail={showDetail}
          setShowDetail={setShowDetail}
          propertyValue={propertyValue}
          setPropertyValue={setPropertyValue}
        />
      ) : null}
      <PropertiesGrid>
        {properties.map((property) => {
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
