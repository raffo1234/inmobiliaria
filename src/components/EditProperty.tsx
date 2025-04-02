import FormSkeleton from "@components/FormSkeleton";
import { supabase } from "@lib/supabase";
import useSWR, { mutate } from "swr";
import { useEffect, useMemo, useState } from "react";
import { Modal, message } from "antd";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { PropertyState } from "@types/propertyState";

async function fetcher(id: string) {
  const { data, error } = await supabase
    .from("property")
    .select()
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

export default function EditUser({ id }: { id: string }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const { data, error, isLoading } = useSWR(id, () => fetcher(id));

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Item updated successfully!",
    });
  };

  const { reset, register, handleSubmit } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: useMemo(() => {
      return data;
    }, [data]),
  });

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { data: updatedData } = await supabase
        .from("property")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      await mutate(id, updatedData);
      await mutate("properties");
      success();
      hideModal();
    } catch (error) {
      console.error(error);
      hideModal();
    }
  };

  useEffect(() => {
    reset(data);
  }, [data]);

  if (error) return <div>Error loading item details</div>;

  return (
    <>
      <button
        type="button"
        disabled={isLoading}
        onClick={showModal}
        className="inline-block text-500 hover:text-blue-500 py-2 px-5 text-sm"
      >
        Edit
      </button>
      {contextHolder}
      <Modal
        title="Edit Property"
        open={open}
        onCancel={hideModal}
        destroyOnClose
        okText="Save"
        okButtonProps={{
          disabled: isLoading,
          form: "editProperty",
          htmlType: "submit",
        }}
        cancelButtonProps={{ disabled: isLoading }}
      >
        {isLoading ? (
          <FormSkeleton rows={2} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} id="editProperty">
            <div className="flex flex-col gap-4">
              <fieldset>
                <label
                  htmlFor="state"
                  className="block font-bold mb-2 font-manrope"
                >
                  State
                </label>
                <select
                  id="state"
                  {...register("state")}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>{PropertyState.DRAFT}</option>
                  <option>{PropertyState.PENDING}</option>
                  <option>{PropertyState.ACTIVE}</option>
                </select>
              </fieldset>
              <fieldset>
                <label
                  htmlFor="title"
                  className="block font-bold mb-2 font-manrope"
                >
                  Titulo
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("title")}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
              </fieldset>
              <fieldset>
                <label
                  htmlFor="description"
                  className="block mb-2.5 font-manrope font-bold"
                >
                  description
                </label>
                <input
                  type="text"
                  id="description"
                  {...register("description")}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:outline-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
              </fieldset>
              <fieldset>
                <label
                  htmlFor="Location"
                  className="block mb-2.5 font-manrope font-bold"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="Location"
                  {...register("location")}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:outline-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
              </fieldset>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
