import { supabase } from "../lib/supabase";
import useSWR from "swr";
import { useEffect, useState } from "react";
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
      size,
      delivery_at,
      bathroom_count,
      phase,
      price,
      bedroom_count,
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
  description: string;
};

export default function PropertiesList({ userId }: { userId: string }) {
  const [showDetail, setShowDetail] = useState(false);
  const [currentHref, setCurrentHref] = useState("");
  const [propertyValue, setPropertyValue] = useState<Property>();
  const { data: properties = [], isLoading } = useSWR("properties", fetcher);

  useEffect(() => {
    setCurrentHref(window.location.href);
  }, []);

  return (
    <>
      {propertyValue ? (
        <PropertyDetail
          showDetail={showDetail}
          setShowDetail={setShowDetail}
          propertyValue={propertyValue}
          setPropertyValue={setPropertyValue}
          currentHref={currentHref}
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
              isLoading={isLoading}
            />
          );
        })}
      </PropertiesGrid>
    </>
  );
}
