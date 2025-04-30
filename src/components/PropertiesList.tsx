import Property from "./Property";
import PropertyItem from "./PropertyItem";
import PropertiesGrid from "./PropertiesGrid";
import { useState } from "react";
import { supabase } from "@lib/supabase";
import { PropertyState } from "@types/propertyState";
import useSWR from "swr";
import InfiniteScrollSentinel from "./InfiniteScrollSentinel";

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
  userEmail,
  setIsLoadingMore,
}: {
  index: number;
  pageSize: number;
  setIsLoadingMore: (value: boolean) => void;
  userEmail?: string;
}) {
  const { data: properties, isLoading } = useSWR(
    `properties-${index}`,
    async () => await fetcher(index, pageSize),
  );

  setIsLoadingMore(isLoading);

  return properties?.map((property) => (
    <PropertyItem key={property.id} userEmail={userEmail} property={property} />
  ));
}

export default function PropertiesList({
  userEmail,
  properties,
}: {
  userEmail?: string;
  properties: Property[];
}) {
  const pageSize = 4;
  const [index, setIndex] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const pages = [];

  for (let i = 1; i < index; i++) {
    pages.push(
      <Page
        key={i}
        index={i}
        pageSize={pageSize}
        setIsLoadingMore={setIsLoadingMore}
        userEmail={userEmail}
      />,
    );
  }

  const showSentinel = !isLoadingMore;

  return (
    <>
      <PropertiesGrid>
        {properties.map((property) => {
          return (
            <PropertyItem
              key={property.id}
              userEmail={userEmail}
              property={property}
            />
          );
        })}
        {pages.map((page) => page)}
      </PropertiesGrid>
      {showSentinel && (
        <InfiniteScrollSentinel
          onElementVisible={() => setIndex((prev) => prev + 1)}
          loading={isLoadingMore}
        />
      )}
    </>
  );
}
