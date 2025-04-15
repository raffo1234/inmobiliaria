import { supabase } from "@lib/supabase";
import { useState } from "react";
import getLastSlashValueFromCurrentUrl from "src/utils/getLastSlashValueFromCurrentUrl";
import useSWR, { mutate } from "swr";
import { Icon } from "@iconify/react";
import { Modal } from "antd";
import { signIn } from "auth-astro/client";
import logo from "@assets/logo.png";

const fetcherByUser = async (propertyId: string, userId: string) => {
  const { count, error } = await supabase
    .from("like")
    .select("user_id", { count: "exact" })
    .eq("property_id", propertyId)
    .eq("user_id", userId);

  if (error) throw error;
  return count;
};

const fetcherByProperty = async (propertyId: string) => {
  const { count, error } = await supabase
    .from("like")
    .select("property_id", { count: "exact" })
    .eq("property_id", propertyId);

  if (error) throw error;
  return count;
};

export default function Like({
  propertyId,
  userId,
}: {
  propertyId: string;
  userId: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const keyByUser = `${userId}-${propertyId}-user-like`;
  const keyByProperty = `${userId}-${propertyId}-property-like`;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const {
    data: countByUser,
    isValidating: isValidatingByUser,
    isLoading: isLoadingByUser,
    mutate: mutateByUser,
  } = useSWR(keyByUser, () =>
    userId ? fetcherByUser(propertyId, userId) : null
  );

  const { data: countByProperty, mutate: mutateByProperty } = useSWR(
    keyByProperty,
    () => fetcherByProperty(propertyId)
  );

  const handleLike = async (propertyId: string) => {
    const lastSlashValue = getLastSlashValueFromCurrentUrl() || "";

    if (!userId) {
      showModal();
      return;
    }

    if (countByUser === 0) {
      await supabase.from("like").insert([
        {
          property_id: propertyId,
          user_id: userId,
        },
      ]);
      await mutateByUser();
      await mutateByProperty();

      if (!lastSlashValue.includes("favorito")) {
        await mutate(`${userId}-likes-properties`, null);
      }
    } else {
      await supabase
        .from("like")
        .delete()
        .eq("property_id", propertyId)
        .eq("user_id", userId);
      await mutateByUser();
      await mutateByProperty();

      if (!lastSlashValue.includes("favorito")) {
        await mutate(`${userId}-likes-properties`, null);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => handleLike(propertyId)}
        disabled={isValidatingByUser}
        className={`${countByUser ? "bg-cyan-50 text-cyan-300" : "bg-white hover:text-gray-500"} ${isLoadingByUser ? "opacity-0" : "opacity-100"} transition-all p-3 rounded-full duration-500`}
      >
        {isValidatingByUser ? (
          <Icon icon="line-md:loading-twotone-loop" className="text-2xl" />
        ) : (
          <Icon icon="solar:heart-bold" className="text-2xl" />
        )}
      </button>
      <Modal
        open={isModalOpen}
        onCancel={hideModal}
        destroyOnClose
        footer={null}
      >
        <div className="py-8 p-6">
          <img
            src={logo.src}
            className="w-20 object-cover object-top mb-8"
            alt="Inmobiliaria"
          />
          <h3 className="text-xl mb-10">
            Para indicar que te gusta, inicia sesion.
          </h3>
          <button
            onClick={() => signIn("google")}
            className="text-lg block w-full px-6 pb-4 pt-3 bg-black text-white rounded-full transition-colors duration-700 hover:bg-gray-800 active:bg-gray-900"
          >
            Iniciar Sesión
          </button>
        </div>
      </Modal>
    </>
  );
}
