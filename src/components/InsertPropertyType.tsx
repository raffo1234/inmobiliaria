import FormSkeleton from "@components/FormSkeleton";
import { supabase } from "@lib/supabase";
import useSWR, { mutate } from "swr";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Button, Modal, Skeleton, message } from "antd";
import { useForm } from "react-hook-form";

type TypeInputs = {
  name: string;
  size: string;
  price: string;
  property_id: string;
  bedroom_count: string;
};

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

export default function InsertPropertyType({
  propertyId,
  setDisplayAddForm,
}: {
  propertyId: string;
  setDisplayAddForm: (value: boolean) => void;
}) {
  const { data: types = [], isLoading } = useSWR(`${propertyId}-types`, () =>
    fetcherType(propertyId)
  );

  const { register, reset, handleSubmit } = useForm<TypeInputs>({
    mode: "onBlur",
  });
  async function insertData(data: TypeInputs) {
    const { error, data: insertedData } = await supabase
      .from("type")
      .insert([{ ...data, property_id: propertyId }])
      .select()
      .single();

    await mutate(`${propertyId}-types`, [...types, insertedData], false);
    reset();
    setDisplayAddForm(false);

    if (error) {
      console.error("Error inserting data:", error);
      return { success: false, error: error?.message };
    }
    return { success: true };
  }

  if (isLoading) return <Skeleton />;

  return (
    <form onSubmit={handleSubmit(insertData)}>
      <fieldset className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block font-bold mb-2 font-manrope">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="size" className="block font-bold mb-2 font-manrope">
            Size
          </label>
          <input
            type="number"
            id="size"
            {...register("size")}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="bedroom_count"
            className="block font-bold mb-2 font-manrope"
          >
            Dormitorios
          </label>
          <input
            type="number"
            id="bedroom_count"
            {...register("bedroom_count")}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="price" className="block font-bold mb-2 font-manrope">
            Price
          </label>
          <input
            type="text"
            id="price"
            {...register("price")}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <footer className="flex items-center gap-2 pt-4 mt-4 justify-end">
          <Button htmlType="button" onClick={() => setDisplayAddForm(false)}>
            Cancel
          </Button>
          <Button htmlType="submit" type="primary">
            Guardar
          </Button>
        </footer>
      </fieldset>
    </form>
  );
}
