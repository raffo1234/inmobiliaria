import FormSkeleton from "@components/FormSkeleton";
import { supabase } from "@lib/supabase";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import { Modal, Skeleton, message } from "antd";
import { useForm } from "react-hook-form";

type TypeInputs = {
  name: string;
  size: string;
  price: string;
  property_id: string;
};

const fetcherType = async (propertyId: string) => {
  console.log("property id", propertyId);
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

const InsertPropertyType = ({ propertyId }: { propertyId: string }) => {
  const {
    data: types = [],
    error,
    isLoading,
  } = useSWR(`${propertyId}-types`, () => fetcherType(propertyId));

  const { register, reset, handleSubmit } = useForm<TypeInputs>({
    mode: "onBlur",
  });
  async function insertData(data: TypeInputs) {
    const { error, data: insertedData } = await supabase
      .from("type")
      .insert([{ ...data, property_id: propertyId }]);

    await mutate(`${propertyId}-types`);
    reset();
    console.log(insertedData);

    if (error) {
      console.error("Error inserting data:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  }

  if (isLoading) return <Skeleton />;

  return (
    <>
      {types.map(({ id, name }) => {
        return <div key={id}>Type name: {name}</div>;
      })}
      <form onSubmit={handleSubmit(insertData)} id="addPropertyType">
        <fieldset>
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
        </fieldset>
        <fieldset>
          <label htmlFor="size" className="block font-bold mb-2 font-manrope">
            Size
          </label>
          <input
            type="text"
            id="size"
            {...register("size")}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </fieldset>
        <fieldset>
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
        </fieldset>
      </form>
    </>
  );
};

async function fetcher(id: string) {
  const { data, error } = await supabase
    .from("property")
    .select(
      `
      id,
      title,
      description,
      location,
      state,
      type (
        id,
        name,
        size,
        image
      )
    `
    )
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

type Inputs = {
  title: string;
  description: string;
  location: string;
  state: boolean;
};

export default function PropertyType({ id }: { id: string }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);

  // const success = () => {
  //   messageApi.open({
  //     type: "success",
  //     content: "Item updated successfully!",
  //   });
  // };

  // const { reset, register, handleSubmit } = useForm<Inputs>({
  //   mode: "onBlur",
  //   defaultValues: useMemo(() => {
  //     return data;
  //   }, [data]),
  // });

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  // const onSubmit: SubmitHandler<Inputs> = async (data) => {
  //   try {
  //     const { data: updatedData } = await supabase
  //       .from("property")
  //       .update(data)
  //       .eq("id", id)
  //       .select()
  //       .single();
  //     await mutate(id, updatedData);
  //     await mutate("properties");
  //     success();
  //     hideModal();
  //   } catch (error) {
  //     console.error(error);
  //     hideModal();
  //   }
  // };

  // useEffect(() => {
  //   reset(data);
  // }, [data]);

  return (
    <>
      <button
        type="button"
        onClick={showModal}
        className="inline-block text-500 hover:text-blue-500 py-2 px-5 text-sm"
      >
        Tipos
      </button>
      {contextHolder}
      <Modal
        title="Tipos"
        open={open}
        onCancel={hideModal}
        destroyOnClose
        okText="Save"
        okButtonProps={{
          form: "addPropertyType",
          htmlType: "submit",
        }}
      >
        <InsertPropertyType propertyId={id} />
      </Modal>
    </>
  );
}
