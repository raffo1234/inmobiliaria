import { supabase } from "@lib/supabase";
import { useState } from "react";
import getLastSlashValueFromCurrentUrl from "src/utils/getLastSlashValueFromCurrentUrl";
import useSWR, { mutate } from "swr";
import { Icon } from "@iconify/react";
import { signIn } from "auth-astro/client";
import logo from "@assets/logo.png";
import { useGlobalState } from "@lib/globalState";
import Logo from "./Logo";

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
  size = "medium",
  hasCounter = false,
}: {
  propertyId: string;
  userId?: string;
  size?: "medium" | "small";
  hasCounter?: boolean;
}) {
  const { setModalContent, setModalOpen } = useGlobalState();
  const [isLiking, setIsLiking] = useState(false);
  const keyByUser = `${userId}-${propertyId}-user-like`;
  const keyByProperty = `${userId}-${propertyId}-property-like`;

  const {
    data: countByUser,
    isLoading: isLoadingByUser,
    mutate: mutateByUser,
  } = useSWR(keyByUser, () =>
    userId ? fetcherByUser(propertyId, userId) : null,
  );

  const { data: countByProperty, mutate: mutateByProperty } = useSWR(
    keyByProperty,
    () => fetcherByProperty(propertyId),
  );

  const showGlobalModal = () => {
    setModalContent(
      <>
        <div className="mb-12">
          <Logo />
        </div>
        <h3 className="text-xl mb-10 w-full text-center">
          Para indicar que te gusta, inicia sesion.
        </h3>
        <button
          onClick={() => signIn("google")}
          className="text-lg block w-full px-6 pb-4 pt-3 bg-black text-white rounded-full transition-colors duration-700 hover:bg-gray-800 active:bg-gray-900"
        >
          Iniciar Sesión
        </button>
      </>,
    );
    setModalOpen(true);
  };

  const handleLike = async (propertyId: string) => {
    const lastSlashValue = getLastSlashValueFromCurrentUrl() || "";

    if (!userId) {
      showGlobalModal();
      return;
    }

    setIsLiking(true);
    if (countByUser === 0) {
      await supabase.from("like").insert([
        {
          property_id: propertyId,
          user_id: userId,
        },
      ]);
      await mutateByUser();
      await mutateByProperty();
      setIsLiking(false);

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
      setIsLiking(false);

      if (!lastSlashValue.includes("favorito")) {
        await mutate(`${userId}-likes-properties`, null);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => handleLike(propertyId)}
        className={`${size === "medium" && countByUser ? "bg-cyan-50 text-cyan-300" : "bg-gray-50 hover:text-gray-500"} 
          ${isLoadingByUser ? "opacity-0" : "opacity-100"}          
          transition-all p-3 rounded-full duration-500 flex gap-1 items-center`}
      >
        {isLiking ? (
          <Icon
            icon="line-md:loading-twotone-loop"
            className={`${size === "small" ? "text-lg text-gray-500" : "text-2xl"}`}
          />
        ) : (
          <Icon
            icon="solar:heart-bold"
            className={`${size === "small" ? "text-lg text-gray-500" : "text-2xl"}`}
          />
        )}
        {hasCounter ? (
          <span className="text-xs min-w-2 block">{countByProperty}</span>
        ) : null}
      </button>
    </>
  );
}
