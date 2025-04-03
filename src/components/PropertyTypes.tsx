import { supabase } from "@lib/supabase";
import { Skeleton } from "antd";
import hero from "@assets/hero.jpg";
import useSWR from "swr";
import { Icon } from "@iconify/react";
import { useState } from "react";
import InsertPropertyType from "./InsertPropertyType";

const fetcherType = async (propertyId: string) => {
  const { data, error } = await supabase
    .from("type")
    .select(
      `
      id,
      property_id,
      name,
      bathroom_count,
      bedroom_count,
      price,
      size,
      floor,
      stock
    `
    )
    .eq("property_id", propertyId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

export default function PropertyTypes({ id }: { id: string }) {
  const [displayAddform, setDisplayAddForm] = useState(false);
  const [lastCreatedId, setLastCreatedId] = useState();
  const { data: types = [], isLoading } = useSWR(`${id}-types`, () =>
    fetcherType(id)
  );

  if (isLoading) return <Skeleton />;

  return (
    <>
      {displayAddform ? (
        <InsertPropertyType
          propertyId={id}
          setDisplayAddForm={setDisplayAddForm}
          setLastCreatedId={setLastCreatedId}
        />
      ) : (
        <section
          key={id}
          className="grid gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {types.map(
            ({
              id,
              name,
              size,
              floor,
              stock,
              bedroom_count,
              bathroom_count,
            }) => {
              return (
                <div key={id}>
                  <div className="relative">
                    {lastCreatedId === id ? (
                      <div className="transition-all animate-[ping_1.5s_ease-in-out] absolute w-full h-full left-0 top-0 bg-orange-200 rounded-xl z-0"></div>
                    ) : null}
                    <img
                      src={hero.src}
                      className="w-full h-[260px] object-cover object-top rounded-lg mb-4 z-10 relative"
                      alt={name}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-black rounded-full"></div>
                      <p>{name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="material-symbols-light:bedroom-parent-outline"
                        className="text-2xl"
                      />
                      <p>
                        {size} m<sup>2</sup>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="material-symbols-light:bedroom-parent-outline"
                        className="text-2xl"
                      />
                      <p>Dormitorios: {bedroom_count}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="material-symbols-light:shower-outline"
                        className="text-2xl"
                      />
                      <p>Ba&ntilde;os: {bathroom_count}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="material-symbols-light:elevator-outline"
                        className="text-2xl"
                      />
                      <p>Piso: {floor}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="material-symbols-light:production-quantity-limits"
                        className="text-2xl"
                      />
                      <p>Disponibles: {stock}</p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
          <button
            onClick={() => setDisplayAddForm(true)}
            className="hover:bg-gray-200 transition-colors active:bg-gray-300 h-[260px] bg-gray-100 rounded-lg flex justify-center items-center"
          >
            <Icon
              icon="material-symbols-light:add-2-rounded"
              className="text-xl"
            />
          </button>
        </section>
      )}
    </>
  );
}
