import { supabase } from "@lib/supabase";
import useSWR from "swr";
import hero from "@assets/hero.jpg";
import { Skeleton } from "antd";
import { useState } from "react";
import EditProperty from "@components/EditProperty";
import DeleteProperty from "@components/DeleteProperty";
import { PropertyState, Permissions } from "@types/propertyState";
import { Icon } from "@iconify/react";
import CheckPermission from "@components/CheckPermission";

type Property = {
  id: string;
  title: string;
  state: string;
  phase: string;
};

const PropertyItem = ({ id, userId }: { id: string; userId: string }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <a href={`inmueble/${id}`}>
        <img
          src={hero.src}
          className="w-full h-[320px] object-cover object-top rounded-lg mb-4"
          alt="Inmobiliaria"
        />
      </a>
      <span
        className={`${hover ? "opacity-100" : "opacity-0"} transition-opacity block absolute left-0 top-0 w-full h-full bg-black bg-opacity-25 rounded-lg`}
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%)",
        }}
      >
        <div className="absolute bottom-0 left-0 w-full flex gap-1 text-white justify-between p-2">
          <a
            href={`../inmueble/${id}`}
            target="_blank"
            className="flex items-center justify-center w-12 h-12 mt-[1px]"
          >
            <Icon
              icon="material-symbols-light:arrow-outward-rounded"
              className="text-4xl"
            />
          </a>
          <div className="flex gap-1 item-center">
            <EditProperty id={id} userId={userId} />
            <DeleteProperty id={id} />
          </div>
        </div>
      </span>
    </div>
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
    <section
      className="grid gap-8"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(336px, 1fr))",
      }}
    >
      <CheckPermission
        userRoleId={userRoleId}
        requiredPermission={Permissions.CREAR_INMUEBLE}
      >
        <a
          href="/admin/property/add"
          className="h-[320px] flex justify-center items-center rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors"
        >
          <Icon
            icon="material-symbols-light:add-2-rounded"
            className="text-xl"
          />
        </a>
      </CheckPermission>

      {Array.isArray(properties) &&
        properties.map((property) => {
          const { id, title, state, phase } = property;
          if (error) console.error(error);

          if (isLoading) return <Skeleton />;

          return (
            <article key={id}>
              <PropertyItem id={id} userId={userId} />
              <div className="flex flex-col gap-3">
                <h3 className="flex gap-4 justify-between w-full">
                  <a href={`inmueble/${id}`} className="font-semibold">
                    {title}
                  </a>
                  <span className="flex items-center gap-1">
                    <span
                      className={`rounded border pb-[1px] text-xs px-1 mt-1 block self-start
                  ${state === PropertyState.DRAFT ? "border-gray-400 text-gray-400" : ""}
                  ${state === PropertyState.PENDING ? "border-cyan-200 text-cyan-200" : ""}
                  ${state === PropertyState.ACTIVE ? "border-green-600 bg-green-600 text-white" : ""}
                  `}
                    >
                      {state}
                    </span>
                    <span className="rounded border pb-[1px] text-xs px-1 mt-1 block self-start">
                      {phase}
                    </span>
                  </span>
                </h3>
              </div>
            </article>
          );
        })}
    </section>
  );
}
