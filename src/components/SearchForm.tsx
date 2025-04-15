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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-20 w-full max-w-[600px] mx-auto"
    >
      <div className="w-full hover:bg-white hover:border-cyan-100 focus-within:bg-white focus-within:border-cyan-100 border-2 transition-colors duration-500 border-gray-100 flex items-center bg-gray-100 rounded-full p-1 gap-2">
        <div className="relative group">
          <button
            type="button"
            className="h-[52px] pl-6 pr-3 bg-slate-200 font-semibold rounded-full flex items-center gap-1"
          >
            <span>Depas</span>
            <Icon
              fontSize={24}
              icon="material-symbols-light:chevron-left-rounded"
              className="rotate-90 group-hover:-rotate-90 transition-transform duration-200"
            />
          </button>
          <div className="group-hover:translate-y-0 -translate-y-1 invisible group-hover:visible absolute group-hover:opacity-100 opacity-0 transition-all duration-500 top-full left-0 w-[120px] py-3">
            <div className="bg-white shadow-md rounded-[30px] p-2 flex flex-col">
              <button className="w-full text-left px-5 py-3 hover:bg-slate-100 rounded-full">
                Depas
              </button>
              <button className="w-full text-left px-5 py-3 hover:bg-slate-100 rounded-full">
                Casas
              </button>
            </div>
          </div>
        </div>
        <div className="flex-grow w-[100px]">
          <input
            type="search"
            {...register("buscador")}
            className="w-full flex-grow placeholder:text-gray-400 border-transparent border-2 focus:outline-none py-3 bg-transparent"
            placeholder="Buscar ..."
          />
        </div>
        <button
          type="submit"
          className="h-[52px] aspect-square rounded-full bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-600 transition duration-700 flex items-center justify-center"
        >
          <Icon icon="mingcute:search-line" className="text-white text-2xl" />
        </button>
      </div>
    </form>
  );
}
