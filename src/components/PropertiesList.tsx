import Property from "./Property";
import PropertyItem from "./PropertyItem";
import PropertiesGrid from "./PropertiesGrid";
import { useEffect, useState } from "react";
import { supabase } from "@lib/supabase";
import { PropertyState } from "@types/propertyState";
import useSWR from "swr";
import InfiniteScrollSentinel from "./InfiniteScrollSentinel";
import { propertyQuery } from "@queries/property";

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

const fetcherAll = async () => {
  const { count, error } = await supabase
    .from("property")
    .select("id", { count: "exact", head: true })
    .eq("state", PropertyState.ACTIVE);
  if (error) throw error;
  return count;
};

const fetcher = async (
  index: number,
  pageSize: number,
): Promise<Property[]> => {
  const { data, error } = await supabase
    .from("property")
    .select(propertyQuery)
    .eq("state", PropertyState.ACTIVE)
    .order("created_at", { ascending: false })
    .range(index * pageSize, index * pageSize + pageSize - 1);

  if (error) throw error;
  return data;
};

function Page({
  page,
  pageSize,
  userEmail,
  setIsLoadingMore,
}: {
  page: number;
  pageSize: number;
  setIsLoadingMore: (value: boolean) => void;
  userEmail: string | undefined | null;
}) {
  const { data: properties, isLoading } = useSWR(
    `properties-${page}`,
    async () => await fetcher(page, pageSize),
  );

  useEffect(() => {
    setIsLoadingMore(isLoading);
  }, [properties?.length]);

  return properties?.map((property) => (
    <PropertyItem key={property.id} userEmail={userEmail} property={property} />
  ));
}

export default function PropertiesList({
  userEmail,
  properties,
}: {
  userEmail: string | undefined | null;
  properties: Property[];
}) {
  const pageSize = 4;
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { data: total } = useSWR("total-properties-home-page", fetcherAll);
  const totalPages = total ? Math.ceil((total - pageSize) / pageSize) : 0;
  const pages = [];

  for (let i = 1; i < page; i++) {
    pages.push(
      <Page
        key={i}
        page={i}
        pageSize={pageSize}
        setIsLoadingMore={setIsLoadingMore}
        userEmail={userEmail}
      />,
    );
  }

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
      {!isLoadingMore && page <= totalPages ? (
        <InfiniteScrollSentinel
          onElementVisible={() => setPage((prev) => prev + 1)}
          loading={isLoadingMore}
        />
      ) : null}
    </>
  );
}
