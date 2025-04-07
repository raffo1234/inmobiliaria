import FilterDropdown from "@components/FilterDropdown";
import { Icon } from "@iconify/react";
import { supabase } from "@lib/supabase";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  type: string;
  buscador: string;
};

export default function SearchForm() {
  const { reset, register, handleSubmit } = useForm<Inputs>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const keywords = encodeURIComponent(formData.buscador);
    window.location.href = `/departamentos/${keywords}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-20">
      <fieldset className="hover:bg-white hover:border-cyan-100 focus-within:bg-white focus-within:border-cyan-100 border-2 transition-colors duration-500 border-gray-100 flex items-center bg-gray-100 w-[700px] rounded-full p-1 gap-2">
        <FilterDropdown />
        <input
          type="search"
          {...register("buscador")}
          className="placeholder:text-gray-400 flex-grow border-transparent border-2 focus:outline-none py-3 bg-transparent"
          placeholder="Buscar ..."
        />
        <button
          type="submit"
          className="h-[52px] aspect-square rounded-full bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-600 transition duration-700 flex items-center justify-center"
        >
          <Icon icon="mingcute:search-line" className="text-white text-2xl" />
        </button>
      </fieldset>
    </form>
  );
}
