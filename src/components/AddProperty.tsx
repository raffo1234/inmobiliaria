import { supabase } from "@lib/supabase";
import { PropertyState } from "@types/propertyState";
import { useForm, type SubmitHandler } from "react-hook-form";
import { mutate } from "swr";

type Inputs = {
  title: string;
  description: string;
  location: string;
};

interface Property {
  state: string;
  title: string;
  description: string;
  location: string;
  password?: string;
  created_at?: string;
  user_id: string;
}

export default function AddProperty({ userId }: { userId: string }) {
  const { reset, register, handleSubmit } = useForm<Inputs>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { data: createdProperty } = await supabase
        .from("property")
        .insert([{ ...data, user_id: userId }])
        .select()
        .single();

      await mutate(createdProperty.id, createdProperty);
      reset();
      window.location.href = "/admin/property";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <h1 className="mb-8 font-semibold text-lg block">Agregar Inmueble</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <fieldset>
          <label htmlFor="title" className="inline-block mb-2 text-sm">
            Titulo
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            required
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-cyan-100  focus:border-cyan-500"
          />
        </fieldset>
        <fieldset>
          <label
            htmlFor="description"
            className="inline-block mb-2 text-sm"
          >
            Descripcion
          </label>
          <input
            type="text"
            id="decription"
            {...register("description")}
            required
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-cyan-100  focus:border-cyan-500"
          />
        </fieldset>
        <fieldset>
          <label
            htmlFor="location"
            className="inline-block mb-2 text-sm"
          >
            Ubicacion
          </label>
          <input
            type="text"
            id="location"
            {...register("location")}
            required
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-cyan-100  focus:border-cyan-500"
          />
        </fieldset>
      </div>
      <footer className="mt-10 flex items-center gap-2">
      <a
        href="/admin/property"
        className="font-semibold disabled:border-gray-100 disabled:bg-gray-100 inline-block py-3 px-10 bg-white text-sm border border-gray-100 rounded-lg transition-colors hover:border-gray-200 duration-500 active:border-gray-300"
        >Cancelar</a>
      <button
        type="submit"
        className="text-white font-semibold disabled:border-gray-100 disabled:bg-gray-100 inline-block py-3 px-10 text-sm bg-cyan-500 hover:bg-cyan-400 transition-colors duration-500 rounded-lg"
        >Agregar</button>
    </footer>
      </form>
    </>
  )
}
