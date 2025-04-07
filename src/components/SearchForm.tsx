import FilterDropdown from "@components/FilterDropdown";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function SearchForm() {
  return (
    <form>
      <fieldset className="hover:bg-white hover:border-cyan-100 focus-within:bg-white focus-within:border-cyan-100 border-2 transition-colors duration-500 border-gray-100 flex items-center bg-gray-100 w-[700px] rounded-full p-1 gap-2">
        <FilterDropdown />
        <input
          type="search"
          name="search"
          className="placeholder:text-gray-400 flex-grow border-transparent border-2 focus:outline-none py-3 bg-transparent"
          placeholder="Buscar ..."
        />
        <button
          type="submit"
          className="h-[52px] aspect-square rounded-full bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-600 transition duration-700 flex items-center justify-center"
        >
          <Icon
            icon="mingcute:search-line"
            className="text-white text-[24px]"
          />
        </button>
      </fieldset>
    </form>
  );
}
