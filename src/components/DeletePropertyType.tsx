import { Icon } from "@iconify/react";
import { supabase } from "@lib/supabase";
import useSWR, { mutate } from "swr";

type Type = {
  id: string;
};

async function fetcher(propertyId: string): Promise<Type[]> {
  const { data, error } = await supabase
    .from("type")
    .select()
    .eq("property_id", propertyId);
  if (error) throw error;
  return data;
}

export default function DeletePropertyType({
  propertyId,
  id,
}: {
  propertyId: string;
  id: string;
}) {
  const { data: types } = useSWR(`${propertyId}-types`, () =>
    fetcher(propertyId)
  );
  const onDelete = async (id: string) => {
    const confirmationMessage = confirm(
      "Esta acción es irreversible. Esta seguro?"
    );
    if (!confirmationMessage) return;

    try {
      const { data: deletedType } = await supabase
        .from("type")
        .delete()
        .eq("id", id)
        .select("id")
        .single();

      if (deletedType && types) {
        await mutate(
          `${propertyId}-types`,
          types.filter((type) => type.id !== deletedType.id),
          false
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
      className="w-12 h-12 flex items-center justify-center"
    >
      <Icon
        icon="material-symbols-light:delete-outline"
        className="text-3xl text-red-500"
      />
    </button>
  );
}
