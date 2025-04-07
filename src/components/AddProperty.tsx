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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 mt-16">
        <fieldset>
          <label htmlFor="title" className="block font-bold mb-2 font-manrope">
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
            Descripcion
          </label>
          <input
            type="text"
            id="decription"
            {...register("description")}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </fieldset>
        <fieldset>
          <label
            htmlFor="location"
            className="block mb-2.5 font-manrope font-bold"
          >
            Ubicacion
          </label>
          <input
            type="text"
            id="location"
            {...register("location")}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </fieldset>
      </div>
      <footer className="mt-10">
        <a
          href="/admin/property"
          className="inline-block text-center font-bold text-sm flex-grow px-6 py-2 border-gray-200 bg-white border-width-2 border rounded-md"
        >
          Cancel
        </a>
        <button
          type="submit"
          className="inline-block px-6 flex-grow font-bold text-sm py-2 bg-blue-500 text-white rounded-md"
        >
          Agregar
        </button>
      </footer>
    </form>
  );
}
