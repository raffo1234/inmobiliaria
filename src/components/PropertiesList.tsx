import Property from "./Property";
import PropertyItem from "./PropertyItem";
import PropertiesGrid from "./PropertiesGrid";

type Property = {
  id: string;
  title: string;
  description: string;
};

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
