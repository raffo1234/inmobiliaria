import { Skeleton } from "antd";
import hero from "@assets/hero.jpg";
import { Icon } from "@iconify/react";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

type Property = {
  id: string;
  title: string;
};

export default function PropertyItem({
  userEmail,
  isLoading,
  property,
  setShowDetail,
  setPropertyValue,
}: {
  userEmail: string | undefined | null;
  isLoading: boolean;
  property: Property;
  setShowDetail: (value: boolean) => void;
  setPropertyValue: (property: Property) => void;
}) {
  const { id, title } = property;
  const [likeCount, setLikeCount] = useState<boolean>(false);

  const onClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    property: Property
  ) => {
    event.preventDefault();

    setShowDetail(true);
    setPropertyValue(property);
    const newUrl = `inmueble/${property.id}`;
    const newState = { page: "property" };
    const newTitle = property.title;
    const app = document.getElementById("app") as HTMLElement;
    app.classList.add("overflow-hidden");

    window.history.pushState(newState, newTitle, newUrl);
  };

  const handleLike = async (id: string) => {
    const { data } = await supabase
      .from("user")
      .select()
      .eq("email", userEmail)
      .single();

    const { count: like } = await supabase
      .from("like")
      .select("*", { count: "exact" })
      .eq("property_id", id)
      .eq("user_id", data.id);

    if (like === 0) {
      await supabase.from("like").insert([
        {
          property_id: id,
          user_id: data.id,
        },
      ]);
      setLikeCount(true);
    } else {
      await supabase
        .from("like")
        .delete()
        .eq("property_id", id)
        .eq("user_id", data.id);
      setLikeCount(false);
    }
  };

  const loadLike = async () => {
    if (!userEmail) return;

    const { data } = await supabase
      .from("user")
      .select()
      .eq("email", userEmail)
      .single();

    const { count: like } = await supabase
      .from("like")
      .select("*", { count: "exact" })
      .eq("property_id", id)
      .eq("user_id", data.id);

    like === 0 ? setLikeCount(false) : setLikeCount(true);
  };

  useEffect(() => {
    loadLike();
  }, []);

  if (isLoading) return <Skeleton />;

  return (
    <article key={id}>
      <div className="relative mb-4">
        <a
          href={`inmueble/${id}`}
          onClick={(event) => onClick(event, property)}
        >
          <img
            src={hero.src}
            className="w-full h-[320px] object-cover object-top rounded-lg"
            alt={title}
          />
        </a>
        <div className="absolute right-0 top-0 p-4 gap-2 flex items-center">
          {/* <button className="p-3 hover:text-gray-500 bg-white rounded-full transition-colors duration-700 ease-in-out">
            <Icon icon="material-symbols:bookmark" className="text-2xl" />
          </button> */}
          <button
            onClick={() => handleLike(id)}
            className={`${likeCount ? "bg-cyan-50 text-cyan-300" : "bg-white hover:text-gray-500"} p-3  rounded-full transition-colors duration-700`}
          >
            {isLoading}
            <Icon icon="solar:heart-bold" className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 rounded-full bg-black"></div>
        <h2>
          <a href={`inmueble/${id}`} className="font-semibold">
            {title}
          </a>
        </h2>
      </div>
    </article>
  );
}
