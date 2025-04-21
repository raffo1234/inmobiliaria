import { useEffect, useState } from "react";
import Property from "./Property";
import PropertyItem from "./PropertyItem";
import PropertyDetail from "./PropertyDetail";
import PropertiesGrid from "./PropertiesGrid";

type Property = {
  id: string;
  title: string;
  description: string;
};

export default function PropertiesList({ userId, properties }: { userId: string; properties: Property[] }) {
  const [showDetail, setShowDetail] = useState(false);
  const [currentHref, setCurrentHref] = useState("");
  const [propertyValue, setPropertyValue] = useState<Property>();


  useEffect(() => {
    setCurrentHref(window.location.href);
  }, []);

  return (
    <PropertiesGrid>
      {properties.map((property) => {
        return (
          <PropertyItem
            key={property.id}
            userId={userId}
            property={property}
            setShowDetail={setShowDetail}
            setPropertyValue={setPropertyValue}
            isLoading={false}
          />
        );
      })}
    </PropertiesGrid>
  );
}
