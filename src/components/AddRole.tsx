import { Icon } from "@iconify/react";
import { supabase } from "@lib/supabase";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { mutate } from "swr";
import PrimaryButton from "./PrimaryButton";

type Inputs = {
  name: string;
  description: string;
};

export default function AddRole() {
  const [isLoading, setIsLoading] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const { reset, register, handleSubmit } = useForm<Inputs>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    await supabase.from("role").insert([data]);
    await mutate("admin-roles");
    reset();
    setDisplayForm(false);
    setIsLoading(false);
  };

  return (
    <>
      {displayForm ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full items-center text-left hover:bg-gray-50 rounded-bl-xl rounded-br-xl transition-colors duration-300 px-7 pt-4 pb-6 border-t border-gray-200"
        >
          <fieldset className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="inline-block mb-2 text-sm">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                required
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-cyan-100  focus:border-cyan-500"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="inline-block mb-2 text-sm"
              >
                Descripcion
              </label>
              <input
                type="text"
                id="description"
                {...register("description")}
                required
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-cyan-100  focus:border-cyan-500"
              />
            </div>
          </fieldset>
          <div className="flex items-center gap-2 border-t border-gray-200 mt-6 pt-6">
            <button
              onClick={() => setDisplayForm(false)}
              type="button"
              className="font-semibold disabled:border-gray-100 disabled:bg-gray-100 inline-block py-3 px-10 bg-white text-sm border border-gray-100 rounded-lg transition-colors hover:border-gray-200 duration-500 active:border-gray-300"
            >
              Cancelar
            </button>
            <PrimaryButton
              type="submit"
              label="Agregar"
              isLoading={isLoading}
            />
          </div>
        </form>
      ) : (
        <button
          onClick={() => setDisplayForm((prev) => !prev)}
          className="w-full flex gap-3.5 items-center text-left hover:bg-gray-50 transition-colors duration-300 px-6 py-4 border-t border-gray-200"
        >
          <Icon icon="solar:add-square-broken" fontSize={18} />
          <span className="pb-1">Agregar Rol</span>
        </button>
      )}
    </>
  );
}
