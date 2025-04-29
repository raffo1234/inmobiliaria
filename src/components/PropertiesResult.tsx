import { supabase } from "../lib/supabase";
import useSWR from "swr";
import PropertyItem from "./PropertyItem";
import getLastSlashValueFromCurrentUrl from "src/utils/getLastSlashValueFromCurrentUrl";
import { PropertyState, PropertyType } from "@types/propertyState";
import PropertiesGrid from "./PropertiesGrid";
import { Icon } from "@iconify/react";

const columnsToSearch = [
  "title",
  "description",
  "location",
  "price",
  "state",
  "type",
  "phase",
  "size",
  "bathroom_count",
  "bedroom_count",
];

const query = `
          id,
          title,
          description,
          user_id,
          type,
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
        `;

const fetcher = async (searchTerms: string, pathnameArray: string[]) => {
  const orConditions = columnsToSearch
    .map((column) => `${column}.ilike.%${searchTerms}%`)
    .join(",");

  const propertyType =
    (pathnameArray?.at(0)?.toUpperCase() as PropertyType) ||
    PropertyType.APARTMENT;

  const { data, error } = searchTerms
    ? await supabase
        .from("property")
        .select(query)
        .eq("state", PropertyState.ACTIVE)
        .eq("type", propertyType)
        .or(orConditions)
        .order("created_at", { ascending: false })
        .limit(4)
    : await supabase
        .from("property")
        .select(query)
        .eq("type", propertyType)
        .eq("state", PropertyState.ACTIVE)
        .order("created_at", { ascending: false })
        .limit(4);

  if (error) throw error;
  return data;
};

export default function PropertiesResult({
  userId,
  pathnameArray,
}: {
  userId: string;
  pathnameArray: string[];
}) {
  const searchTerms = getLastSlashValueFromCurrentUrl() || "";
  const { data: properties } = useSWR(
    `${userId}-${searchTerms}-result-properties`,
    () => fetcher(searchTerms, pathnameArray),
  );

  if (properties?.length === 0) {
    return (
      <div className="max-w-md mx-auto items-center flex flex-col gap-10">
        <div className="flex justify-center w-[300px] rounded-full items-center mx-auto bg-cyan-500 aspect-square bg-opacity-5">
          <Icon
            icon="solar:album-broken"
            className="text-[200px] text-cyan-500"
          />
        </div>
        <h1 className="text-center">Prueba con otra búsqueda diferente.</h1>
        <a
          href="/"
          title="Ir al Inicio"
          className="text-lg flex items-center gap-2 px-6 pb-4 pt-3 bg-black text-white rounded-full transition-colors duration-700 hover:bg-gray-800 active:bg-gray-900"
        >
          <Icon icon="solar:home-smile-angle-broken" fontSize={24}></Icon>
          <span>Ir al Inicio</span>
        </a>
      </div>
    );
  }

  return (
    <PropertiesGrid>
      {properties?.map((property) => {
        return (
          <PropertyItem key={property.id} userId={userId} property={property} />
        );
      })}
    </PropertiesGrid>
  );
}
