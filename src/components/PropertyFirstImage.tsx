import { Icon } from "@iconify/react";
import { supabase } from "@lib/supabase";
import { Carousel } from "antd";
import useSWR from "swr";

const fetcher = async (propertyId: string) => {
  const { data, error } = await supabase
    .from("property_image")
    .select("image_url")
    .eq("property_id", propertyId)
    .single();
  if (error) throw error;
  return data;
};

export default function PropertyFirstImage({
  property,
}: {
  property: {
    title: string;
    id: string;
  };
}) {
  const {
    data: image,
    error,
    isLoading,
  } = useSWR(`${property.id}-image`, () => fetcher(property.id));

  if (!image)
    return (
      <div className="animate-pulse bg-gray-100 rounded-lg w-full aspect-[5/4] flex justify-center items-center">
        <Icon icon="solar:gallery-broken" fontSize={32} />
      </div>
    );

  return (
    <img
      src={image.image_url}
      alt={property.title}
      title={property.title}
      loading="lazy"
      className="w-full aspect-[5/4] object-cover rounded-lg"
    />
  );
}
