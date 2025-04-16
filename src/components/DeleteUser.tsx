import { message } from "antd";
import { supabase } from "@lib/supabase";
import { mutate } from "swr";

export default function DeleteUser({ userId }: { userId: string }) {
  const [messageApi] = message.useMessage();

  const successMessage = () => {
    messageApi.open({
      type: "success",
      content: "User deleted successfully!",
    });
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: "There was an error when deleting the user",
    });
  };

  const deleteUser = async () => {
    const confirmationMessage = confirm(
      "Esta acción no se puede deshacer. ¿Realmente desea eliminar este elemento?"
    );
    if (!confirmationMessage) return;

    try {
      await supabase.from("user").delete().eq("id", userId);
      await mutate("users");
      successMessage();
    } catch (error) {
      console.error("Error deleting user", error);
      errorMessage();
    }
  };

  return (
    <div id="edit-user">
      <button
        disabled
        onClick={deleteUser}
        type="button"
        className="disabled:pointer-events-none inline-block py-2 px-6 bg-red-50 text-sm border border-red-100 rounded-lg transition-colors hover:border-red-200 active:border-red-300"
      >
        Delete
      </button>
    </div>
  );
}
