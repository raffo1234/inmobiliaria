import { supabase } from "../lib/supabase";
import useSWR from "swr";
import { Button } from "antd";
import { useEffect, useState } from "react";
import Property from "./Property";
import { CloseOutlined } from "@ant-design/icons";
import PropertyItem from "./PropertyItem";
import { PropertyState } from "@types/propertyState";
import PropertyDetail from "./PropertyDetail";
import PropertiesGrid from "./PropertiesGrid";

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
    .eq("like.user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export default function PropertiesFavorite({ userId }: { userId: string }) {
  const [showDetail, setShowDetail] = useState(false);
  const [propertyValue, setPropertyValue] = useState<Property | undefined>();

  const { data: properties = [] } = useSWR(`${userId}-likes-properties`, () =>
    fetcher(userId)
  );

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
