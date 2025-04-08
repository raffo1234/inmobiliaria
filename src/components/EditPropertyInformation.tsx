import { useEffect, useMemo } from "react";
import useSWR, { mutate } from "swr";
import { supabase } from "@lib/supabase";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  PropertyPhase,
  PropertyState,
  PropertyType,
} from "@types/propertyState";
import { Button, message } from "antd";
import FormSkeleton from "./FormSkeleton";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Inputs = {
  title: string;
  description: string;
  location: string;
  state: boolean;
  phase: boolean;
  type: boolean;
  area: boolean;
  created_at: string;
};

async function fetcher(id: string) {
  const { data, error } = await supabase
    .from("property")
    .select()
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export default function EditPropertyInformation({
  id,
  hideModal,
}: {
  id: string;
  hideModal: () => void;
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const { data, error, isLoading } = useSWR(id, () => fetcher(id));

  const { reset, register, handleSubmit } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: useMemo(() => {
      return data;
    }, [data]),
  });

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Item updated successfully!",
    });
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { data: updatedData, error } = await supabase
        .from("property")
        .update(data)
        .eq("id", id)
        .select()
        .single();
      await mutate(id, updatedData);
      await mutate("properties");
      success();
      hideModal();
      console.log(error);
    } catch (error) {
      console.error(error);
      hideModal();
    }
  };

  useEffect(() => {
    reset(data);
  }, [data]);

  if (error) return <div>Error cargando datos ...</div>;

  return isLoading ? (
    <FormSkeleton rows={2} />
  ) : (
    <>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)} id="editProperty">
        <fieldset className="flex flex-col gap-4">
          <div>
            <span className="mb-2 font-bold font-manrope">Creado: </span>
            <span>
              {format(new Date(data.created_at), "dd MMMM, yyyy", {
                locale: es,
              })}
            </span>
          </div>
          <div>
            <label
              htmlFor="state"
              className="block font-bold mb-2 font-manrope"
            >
              Estado
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
          </div>
          <div>
            <label htmlFor="type" className="block font-bold mb-2 font-manrope">
              Tipo
            </label>
            <select
              id="type"
              {...register("type")}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            >
              <option>{PropertyType.APARTMENT}</option>
              <option>{PropertyType.HOUSE}</option>
            </select>
          </div>
          <div>
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
          </div>
          <div>
            <label
              htmlFor="Location"
              className="block mb-2.5 font-manrope font-bold"
            >
              Ubicación
            </label>
            <input
              type="text"
              id="Location"
              {...register("location")}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:outline-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="phase"
              className="block mb-2.5 font-manrope font-bold"
            >
              Fase
            </label>
            <select
              id="phase"
              {...register("phase")}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            >
              <option>{PropertyPhase.PLANOS}</option>
              <option>{PropertyPhase.CONSTRUCCION}</option>
              <option>{PropertyPhase.READY}</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-2.5 font-manrope font-bold"
            >
              Descripción
            </label>
            <textarea
              id="description"
              {...register("description")}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:outline-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <footer className="flex items-center gap-2 pt-4 mt-4 justify-end">
            <Button htmlType="button" onClick={hideModal}>
              Cancel
            </Button>
            <Button htmlType="submit" type="primary">
              Guardar
            </Button>
          </footer>
        </fieldset>
      </form>
    </>
  );
}
