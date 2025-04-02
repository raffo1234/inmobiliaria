import { supabase } from "@lib/supabase";
import { Skeleton } from "antd";
import hero from "@assets/hero.jpg";
import useSWR from "swr";
import { PlusOutlined } from "@ant-design/icons";
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
      price,
      size
    `
    )
    .eq("property_id", propertyId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export default function PropertyTypes({ id }: { id: string }) {
  const [displayAddform, setDisplayAddForm] = useState(false);
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
        />
      ) : (
        <section
          key={id}
          className="grid gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          <button
            onClick={() => setDisplayAddForm(true)}
            className="hover:bg-gray-200 transition-colors active:bg-gray-300 h-[260px] bg-gray-100 rounded-lg"
          >
            <PlusOutlined className="text-xl" />
          </button>
          {types.map(({ id, name }) => {
            return (
              <img
                key={id}
                src={hero.src}
                className="w-full h-[260px] object-cover object-top rounded-lg mb-4"
                alt={name}
              />
            );
          })}
        </section>
      )}
    </>
  );
}
