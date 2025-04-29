import Property from "./Property";
import PropertyItem from "./PropertyItem";
import PropertiesGrid from "./PropertiesGrid";
import { useState } from "react";
import { supabase } from "@lib/supabase";
import { PropertyState } from "@types/propertyState";
import useSWR from "swr";

interface Property {
  id: string;
  title: string;
  user_id: string;
  company: {
    id: string;
    name: string;
    logo_url: string;
  };
  user?: {
    id: string;
    email: string;
    name: string;
    image_url: string;
  };
  property_image?: {
    image_url: string;
  }[];
}

const fetcher = async (
  index: number,
  pageSize: number,
): Promise<Property[]> => {
  const { data, error } = await supabase
    .from("property")
    .select(
      `
    id,
    title,
    property_image (
      image_url
    ),
    user!property_user_id_fkey (
      id,
      email,
      name,
      image_url
    ),
    company!property_company_id_fkey (
      id,
      name,
      logo_url
    )
  `,
    )
    .eq("state", PropertyState.ACTIVE)
    .order("created_at", { ascending: false })
    .range(index * pageSize, index * pageSize + pageSize - 1);

  if (error) throw error;
  return data;
};

function Page({
  index,
  pageSize,
  userId,
}: {
  index: number;
  pageSize: number;
  userId: string;
}) {
  const { data: properties } = useSWR(
    `properties-${index}`,
    async () => await fetcher(index, pageSize),
  );

  return properties?.map((property) => (
    <PropertyItem key={property.id} userId={userId} property={property} />
  ));
}

export default function PropertiesList({
  userId,
  properties,
}: {
  userId: string;
  properties: Property[];
}) {
  const pageSize = 2;
  const [index, setIndex] = useState(1);

  const pages = [];
  for (let i = 1; i < index; i++) {
    pages.push(<Page key={i} index={i} pageSize={pageSize} userId={userId} />);
  }

  return (
    <>
      <PropertiesGrid>
        {properties.map((property) => {
          return (
            <PropertyItem
              key={property.id}
              userId={userId}
              property={property}
            />
          );
        })}
        {pages.map((page) => page)}
      </PropertiesGrid>
      <button onClick={() => setIndex((prev) => prev + 1)}>mas ++</button>
    </>
  );
}
