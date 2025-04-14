import { Skeleton } from "antd";
import hero from "@assets/hero.jpg";
import { Icon } from "@iconify/react";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

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

const fetcher = async (id: string, userId: string) => {
  let query = supabase
    .from("like")
    .select("user_id", { count: "exact" })
    .eq("property_id", id);

  if (userId) {
    query = query.eq("user_id", userId);
  }

  const { count, error } = await query;

  if (error) throw error;
  return count;
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

  const [likeByUser, setLikeByUser] = useState<boolean>(false);

  const { data: count, isLoading } = useSWR(`${userId}-${id}-properties`, () =>
    fetcher(id, userId)
  );

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
    if (count === 0) {
      await supabase.from("like").insert([
        {
          property_id: id,
          user_id: userId,
        },
      ]);
      await mutate(`${userId}-${id}-properties`, null);
      setLikeByUser(true);
    } else {
      await supabase
        .from("like")
        .delete()
        .eq("property_id", id)
        .eq("user_id", userId);
      await mutate(`${userId}-${id}-properties`, `${userId}-${id}-properties`);
      setLikeByUser(false);
    }
  };

  useEffect(() => {
    if (count) setLikeByUser(count > 0);
  }, [count]);

  if (isLoading)
    return (
      <div className="max-w-[422px]">
        <Skeleton />
      </div>
    );

  return (
    <article key={id} className="max-w-[422px]">
      <div className="relative mb-4">
        <a
          href={`/inmueble/${id}`}
          onClick={(event) => onDisplayPropertyDetail(event, property)}
        >
          <img
            src={hero.src}
            className="w-full aspect-[5/4] object-cover rounded-lg"
            alt={title}
            title={title}
          />
        </a>
        <div className="absolute right-0 top-0 p-4 gap-2 flex items-center">
          {/* <button className="p-3 hover:text-gray-500 bg-white rounded-full transition-colors duration-700 ease-in-out">
            <Icon icon="material-symbols:bookmark" className="text-2xl" />
          </button> */}
          <button
            onClick={() => handleLike(id)}
            className={`${likeByUser ? "bg-cyan-50 text-cyan-300" : "bg-white hover:text-gray-500"} p-3  rounded-full transition-colors duration-700`}
          >
            {isLoading}
            <Icon icon="solar:heart-bold" className="text-2xl" />
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
        <h2>
          <a title={title} href={`/inmueble/${id}`} className="font-semibold">
            {title}
          </a>
        </h2>
      </div>
    </article>
  );
}
