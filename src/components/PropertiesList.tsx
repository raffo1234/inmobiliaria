import { supabase } from "../lib/supabase";
import useSWR from "swr";
import { useState } from "react";
import Property from "./Property";
import { PropertyState } from "@types/propertyState";
import PropertyItem from "./PropertyItem";
import PropertyDetail from "./PropertyDetail";
import PropertiesGrid from "./PropertiesGrid";

const fetcher = async () => {
  const { data, error } = await supabase

    .from("property")
    .select(
      `
      id,
      title,
      description,
      state,
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

export default function PropertiesList({ userId }: { userId: string }) {
  const [showDetail, setShowDetail] = useState(false);
  const [propertyValue, setPropertyValue] = useState<Property>();
  const { data: properties = [] } = useSWR("properties", fetcher);

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
