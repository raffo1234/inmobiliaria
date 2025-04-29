import Property from "./Property";
import PropertyItem from "./PropertyItem";
import PropertiesGrid from "./PropertiesGrid";

interface Property {
  id: string;
  title: string;
  user_id: string;
  image_url: string;
  company: {
    id: string;
    name: string;
    logo_url: string;
  };
  user?: {
    id: string;
    email: string;
    name: string;
    image_url: string;
  };
  property_image?: {
    id: string;
    image_url: string;
  };
}

export default function PropertiesList({
  userId,
  properties,
}: {
  userId: string;
  properties: Property[];
}) {
  return (
    <PropertiesGrid>
      {properties.map((property) => {
        return (
          <PropertyItem key={property.id} userId={userId} property={property} />
        );
      })}
    </PropertiesGrid>
  );
}
