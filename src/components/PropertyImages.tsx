import { Icon } from "@iconify/react";
import { supabase } from "@lib/supabase";
import { Carousel } from "antd";
import useSWR from "swr";

const fetcher = async (propertyId: string) => {
  const { data, error } = await supabase
    .from("property_image")
    .select("*")
    .eq("property_id", propertyId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
};

export default function PropertyImages({
  property,
  quantity,
}: {
  property: {
    title: string;
    id: string;
  };
  quantity?: number;
}) {
  const {
    data: images,
    error,
    isLoading,
  } = useSWR(`${property.id}-images`, () => fetcher(property.id));

  if (images?.length === 0 || isLoading || error)
    return (
      <div className="animate-pulse bg-gray-100 rounded-lg w-full aspect-[5/4] flex justify-center items-center">
        <Icon icon="solar:gallery-broken" fontSize={32} />
      </div>
    );

  if (quantity === 1) {
    return (
      <img
        src={images?.at(0).image_url}
        alt={property.title}
        title={property.title}
        loading="lazy"
        className="w-full aspect-[5/4] object-cover rounded-lg"
      />
    );
  }

  // const total = quantity !== 0 ? quantity : images?.length;

  if (quantity === undefined || quantity > 1) {
    return (
      <Carousel
        arrows
        draggable
        infinite={false}
        autoplay={{ dotDuration: true }}
        autoplaySpeed={3000}
      >
        {images?.slice(0, quantity).map((image, index) => {
          return (
            <img
              key={index}
              src={image.image_url}
              alt={property.title}
              title={property.title}
              loading="lazy"
              className="w-full aspect-[5/4] object-cover rounded-lg"
            />
          );
        })}
      </Carousel>
    );
  }
}
