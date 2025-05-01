import { Icon } from "@iconify/react";
import { useGlobalState } from "@lib/globalState";
import { useEffect } from "react";

export default function GlobalModal() {
  const { isEditModalOpen, editModalContent, setEditModalOpen } =
    useGlobalState();

  const onClose = () => {
    if (!isEditModalOpen) return;
    setEditModalOpen(false);
  };

  return (
    <div
      className={`${isEditModalOpen ? "translate-x-0 visible opacity-100" : "-translate-x-2 invisible opacity-0"} absolute left-0 top-0 h-full w-full bg-white transition-all z-10 duration-300 px-8 min-h-lvh md:px-10 py-12`}
    >
      <button type="button" className="mb-4" onClick={onClose}>
        <Icon icon="solar:square-alt-arrow-left-broken" fontSize="42" />
      </button>
      {editModalContent}
    </div>
  );
}
