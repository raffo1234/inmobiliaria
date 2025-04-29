import Property from "./Property";
import PropertyItem from "./PropertyItem";
import PropertiesGrid from "./PropertiesGrid";
import { Icon } from "@iconify/react";

type Property = {
  id: string;
  title: string;
  user_id: string;
  company: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    name: string;
    image_url: string;
  };
  property_image: {
    image_url: string;
  }[];
};

export default function PropertiesFavorite({
  userId,
  likes,
}: {
  userId: string;
  likes: { property: Property[] }[];
}) {
  if (likes?.length === 0) {
    return (
      <div className="max-w-md mx-auto items-center flex flex-col gap-10">
        <div className="flex justify-center w-[300px] rounded-full items-center mx-auto bg-cyan-500 aspect-square bg-opacity-5">
          <Icon
            icon="solar:gallery-favourite-bold"
            className="text-[200px] text-cyan-500"
          />
        </div>
        <h1 className="text-center">
          Tu próxima propiedad ideal podría estar esperándote. Explora nuestra
          selección y guarda las que capturen tu interés.
        </h1>
        <a
          href="/"
          title="Ir al Inicio"
          className="text-lg flex items-center gap-2 px-6 pb-4 pt-3 bg-black text-white rounded-full transition-colors duration-700 hover:bg-gray-800 active:bg-gray-900"
        >
          <Icon icon="solar:home-smile-angle-broken" fontSize={24}></Icon>
          <span>Ir al Inicio</span>
        </a>
      </div>
    );
  }

  return (
    <PropertiesGrid>
      {likes?.map(({ property }) => {
        if (property)
          return (
            <PropertyItem
              key={property.id}
              userId={userId}
              property={property}
            />
          );
      })}
    </PropertiesGrid>
  );
}
