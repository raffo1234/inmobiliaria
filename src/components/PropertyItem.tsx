import { Skeleton } from "antd";
import hero from "@assets/hero.jpg";
import { Icon } from "@iconify/react";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Modal } from "antd";
import logo from "@assets/logo.png";
import { signIn } from "auth-astro/client";
import getLastSlashValueFromCurrentUrl from "src/utils/getLastSlashValueFromCurrentUrl";

interface Property {
  id: string;
  title: string;
  like: {
    user_id: string;
  }[];
  user_id: string;
  user: {
    id: string;
    email: string;
    name: string;
    image_url: string;
  };
}

const fetcherByUser = async (id: string, userId: string) => {
  const { count, error } = await supabase
    .from("like")
    .select("user_id", { count: "exact" })
    .eq("property_id", id)
    .eq("user_id", userId);

  if (error) throw error;
  return count;
};

const fetcherByProperty = async (id: string) => {
  const { count, error } = await supabase
    .from("like")
    .select("property_id", { count: "exact" })
    .eq("property_id", id);

  if (error) throw error;
  return count;
};

const PropertyImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loading, setLoading] = useState(true);

  return (
    <img
      src={src}
      onLoad={() => setLoading(false)}
      alt={alt}
      title={alt}
      loading="lazy"
      className={`transition-opacity w-full aspect-[5/4] object-cover rounded-lg ${loading ? "opacity-0" : "opacity-100"}`}
    />
  );
};

export default function PropertyItem({
  userId,
  property,
  setShowDetail,
  setPropertyValue,
}: {
  userId: string;
  property: Property;
  setShowDetail: (value: boolean) => void;
  setPropertyValue: (property: Property) => void;
}) {
  const { id, title, user } = property;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const keyByUser = `${userId}-${id}-user-like`;
  const keyByProperty = `${userId}-${id}-property-like`;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const {
    data: countByUser,
    isLoading: isLoadingByUser,
    mutate: mutateByUser,
  } = useSWR(keyByUser, () => (userId ? fetcherByUser(id, userId) : null));

  const {
    data: countByProperty,
    isLoading: isLoadingByProperty,
    mutate: mutateByProperty,
  } = useSWR(keyByProperty, () => fetcherByProperty(id));

  const onDisplayPropertyDetail = (
    event: React.MouseEvent<HTMLAnchorElement>,
    property: Property
  ) => {
    event.preventDefault();

    setShowDetail(true);
    setPropertyValue(property);
    const newUrl = `/inmueble/${property.id}`;
    const newState = { page: "property" };
    const newTitle = property.title;
    const app = document.getElementById("app") as HTMLElement;
    app.classList.add("overflow-hidden");
    window.history.pushState(newState, newTitle, newUrl);
  };

  const handleLike = async (id: string) => {
    const lastSlashValue = getLastSlashValueFromCurrentUrl() || "";

    if (!userId) {
      showModal();
      return;
    }

    if (countByUser === 0) {
      await supabase.from("like").insert([
        {
          property_id: id,
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
        .eq("property_id", id)
        .eq("user_id", userId);
      await mutateByUser();
      await mutateByProperty();

      if (!lastSlashValue.includes("favorito")) {
        await mutate(`${userId}-likes-properties`, null);
      }
    }
  };

  if (isLoadingByUser || isLoadingByProperty) {
    return <Skeleton className="xl:max-w-[422px]" />;
  }

  return (
    <>
      <article key={id} className="self-end">
        <div className="relative mb-4">
          <a
            href={`/inmueble/${id}`}
            onClick={(event) => onDisplayPropertyDetail(event, property)}
          >
            <PropertyImage src={hero.src} alt={title} />
          </a>
          <div className="absolute right-0 top-0 p-4 gap-2 flex items-center">
            {/* <button className="p-3 hover:text-gray-500 bg-white rounded-full transition-colors duration-700 ease-in-out">
            <Icon icon="material-symbols:bookmark" className="text-2xl" />
          </button> */}
            <button
              onClick={() => handleLike(id)}
              className={`${countByUser ? "bg-cyan-50 text-cyan-300" : "bg-white hover:text-gray-500"} p-3  rounded-full transition-colors duration-500`}
            >
              {isLoadingByUser ? (
                "..."
              ) : (
                <Icon icon="solar:heart-bold" className="text-2xl" />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <a href={`/user/${user.id}`} title={user.name}>
            <img
              src={user.image_url}
              className="w-8 h-8 object-cover rounded-full"
              alt={user.name}
              title={user.name}
            />
          </a>
          <div className="flex items-center justify-between w-full gap-4">
            <h2>
              <a
                title={title}
                href={`/inmueble/${id}`}
                className="font-semibold"
              >
                {title}
              </a>
            </h2>
            <div className="flex items-center gap-1">
              <Icon icon="solar:heart-bold" className="text-lg text-gray-400" />
              <span className="text-gray-600 text-xs font-semibold min-w-2">
                {countByProperty}
              </span>
            </div>
          </div>
        </div>
      </article>
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
