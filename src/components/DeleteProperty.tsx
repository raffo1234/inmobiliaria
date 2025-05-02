import { Icon } from "@iconify/react";
import { supabase } from "@lib/supabase";
import useSWR, { mutate } from "swr";

type Property = {
  id: string;
};

async function fetcher(): Promise<Property[]> {
  const { data, error } = await supabase.from("property").select();
  if (error) throw error;
  return data;
}

export default function DeleteProperty({ id }: { id: string }) {
  const { data: properties } = useSWR("admin-properties", fetcher);
  const onDelete = async (id: string) => {
    const confirmationMessage = confirm(
      "Esta acción es irreversible. Esta seguro?",
    );
    if (!confirmationMessage) return;

    try {
      const { data: deletedProperty } = await supabase
        .from("property")
        .delete()
        .eq("id", id)
        .select("id")
        .single();

      if (deletedProperty && properties) {
        await mutate(
          "admin-properties",
          properties.filter((property) => property.id !== deletedProperty.id),
          false,
        );
      }
    } catch (error) {
      console.error(`Error eliminando este item: ${error}`);
    }
  };

  return (
    <button
      onClick={() => onDelete(id)}
      type="button"
      className="w-11 h-11 rounded-full border-gray-100 border text-red-500 flex items-center justify-center"
    >
      <Icon icon="solar:trash-bin-minimalistic-broken" fontSize={24} />
    </button>
  );
}
