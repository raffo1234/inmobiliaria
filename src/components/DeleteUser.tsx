import { message } from "antd";
import { supabase } from "@lib/supabase";
import { mutate } from "swr";
import { useState } from "react";
import Modal from "@components/Modal";
import { Button } from "antd";
export default function DeleteUser({ userId }: { userId: string }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

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
    try {
      await supabase.from("user").delete().eq("id", userId);
      await mutate("users");
      successMessage();
      hideModal();
    } catch (error) {
      console.error("Error deleting user", error);
      errorMessage();
      hideModal();
    }
  };

  return (
    <div id="edit-user">
      <button
        onClick={showModal}
        type="button"
        className="inline-block text-500 hover:text-red-500 py-2 px-5 text-sm"
      >
        Delete
      </button>
      {contextHolder}
      <Modal isOpen={open} setOpen={setOpen}>
        <h2 className="font-bold mb-6">Do you want to delete this user?</h2>
        <footer className="flex justify-end gap-2 w-full mt-3">
          <Button onClick={hideModal}>Cancel</Button>
          <Button type="primary" onClick={deleteUser}>
            Delete
          </Button>
        </footer>
      </Modal>
    </div>
  );
}
