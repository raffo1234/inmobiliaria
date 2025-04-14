import { supabase } from "../lib/supabase";
import useSWR from "swr";
import { useState } from "react";
import Property from "./Property";
import PropertyItem from "./PropertyItem";
import { PropertyState } from "@types/propertyState";
import PropertyDetail from "./PropertyDetail";
import PropertiesGrid from "./PropertiesGrid";
import { Icon } from "@iconify/react";
import { Skeleton } from "antd";

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

  const { data: likes = [], isLoading } = useSWR(
    `${userId}-likes-properties`,
    () => (userId ? fetcher(userId) : null)
  );

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
