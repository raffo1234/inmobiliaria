import { supabase } from "@lib/supabase";
import useSWR from "swr";
import { Skeleton } from "antd";
import { useState } from "react";
import EditProperty from "@components/EditProperty";
import DeleteProperty from "@components/DeleteProperty";
import { PropertyState, Permissions } from "@types/propertyState";
import { Icon } from "@iconify/react";
import CheckPermission from "@components/CheckPermission";
import EditPropertyModal from "./EditPropertyModal";
import PropertyFirstImage from "./PropertyFirstImage";

type Property = {
  id: string;
  title: string;
  state: string;
  phase: string;
  property_image: {
    image_url: string;
  }[];
};

const AdminPropertyItem = ({
  id,
  propertyImage,
  userId,
  title,
  state,
  phase,
}: {
  id: string;
  title: string;
  state: string;
  phase: string;
  propertyImage: {
    image_url: string;
  }[];
  userId: string;
}) => {
  return (
    <article className="bg-white rounded-xl relative">
      <PropertyFirstImage title={id} src={propertyImage?.at(0)?.image_url} />
      <div
        className={`rounded-xl absolute right-3 top-3 text-sm py-1 px-2 
            ${state === PropertyState.DRAFT ? "bg-gray-600 text-white" : ""}
            ${state === PropertyState.PENDING ? "bg-cyan-600 text-white" : ""}
            ${state === PropertyState.ACTIVE ? "bg-green-600 text-white" : ""}
            `}
      >
        {state}
      </div>
      <div className="border-x px-4 border-b rounded-b-xl -mt-3 pt-6 pb-4 border-gray-100">
        <h3 className="mb-3 font-semibold line-clamp-1">{title}</h3>
        <div className="flex gap-2 justify-center">
          <EditProperty id={id} userId={userId} />
          <DeleteProperty id={id} />
        </div>
      </div>
    </article>
  );
};

const fetcher = async (): Promise<Property[]> => {
  const { data, error } = await supabase
    .from("property")
    .select(
      `
      id,
      title,
      description,
      location,
      state,
      phase,
      created_at,
      property_image(image_url),
      typology (
        property_id,
        id,
        name,
        size,
        image
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export default function AdminPropertiesList({
  userId,
  userRoleId,
}: {
  userRoleId: string;
  userId: string;
}) {
  const {
    data: properties,
    error,
    isLoading,
  } = useSWR("admin-properties", fetcher);

  return (
    <>
      <section
        className="grid gap-8"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        <CheckPermission
          userRoleId={userRoleId}
          requiredPermission={Permissions.CREAR_INMUEBLE}
        >
          <a
            href="/admin/property/add"
            title="Agregar Inmueble"
            className="border-dashed border bg-white transition-colors duration-300 border-gray-200 hover:bg-gray-50 rounded-2xl p-4 flex hover:text-cyan-500 justify-center items-center"
          >
            <span className="text-center">
              <Icon
                icon="solar:add-square-broken"
                fontSize={32}
                className="mx-auto mb-2"
              />
              <span>Agregar Inmueble</span>
            </span>
          </a>
        </CheckPermission>
        {Array.isArray(properties) &&
          properties.map((property) => {
            const { id, title, state, phase, property_image } = property;

            if (error) console.error(error);
            if (isLoading) return <Skeleton />;

            return (
              <AdminPropertyItem
                key={id}
                propertyImage={property_image}
                id={id}
                userId={userId}
                title={title}
                state={state}
                phase={phase}
              />
            );
          })}
      </section>
      <EditPropertyModal />
    </>
  );
}
