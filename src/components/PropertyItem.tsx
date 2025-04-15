import { Skeleton } from "antd";
import hero from "@assets/hero.jpg";
import { useState } from "react";
import Like from "./Like";

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
  isLoading,
}: {
  userId: string;
  property: Property;
  setShowDetail: (value: boolean) => void;
  setPropertyValue: (property: Property) => void;
  isLoading: boolean;
}) {
  const { id, title, user } = property;

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

  if (isLoading) {
    return <Skeleton className="xl:max-w-[422px]" />;
  }

  return (
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
          <Like propertyId={id} userId={userId} />
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
            <a title={title} href={`/inmueble/${id}`} className="font-semibold">
              {title}
            </a>
          </h2>
          <div className="flex items-center">
            <Like propertyId={id} userId={userId} size="small" hasCounter />
          </div>
        </div>
      </div>
    </article>
  );
}
