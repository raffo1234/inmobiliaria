import { supabase } from "../lib/supabase";
import useSWR from "swr";
import { useState } from "react";
import Property from "./Property";
import PropertyItem from "./PropertyItem";
import getLastSlashValueFromCurrentUrl from "src/utils/getLastSlashValueFromCurrentUrl";
import { PropertyState } from "@types/propertyState";
import PropertyDetail from "./PropertyDetail";
import PropertiesGrid from "./PropertiesGrid";

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
  const [showDetail, setShowDetail] = useState(false);
  const [propertyValue, setPropertyValue] = useState<Property>();
  const searchTerms = getLastSlashValueFromCurrentUrl() || "";

  const { data: properties = [] } = useSWR(`${userId}-likes-properties`, () =>
    fetcher(searchTerms)
  );

  return (
    <>
      <div className="flex justify-end mb-8">
        <a href="/inmuebles/favoritos" title="Mis Favoritos">
          Mis favoritos
        </a>
      </div>
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
