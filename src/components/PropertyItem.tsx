import Like from "./Like";
import { useGlobalState } from "@lib/globalState";
import PropertyFirstImage from "./PropertyFirstImage";

interface Property {
  id: string;
  title: string;
  user_id: string;
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
  }[];
}

export default function PropertyItem({
  userEmail,
  property,
}: {
  property: Property;
  userEmail: string | undefined | null;
}) {
  const { id, title, company } = property;
  const { setPropertyId, show, isDisplayed } = useGlobalState();

  const onDisplayPropertyDetail = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    if (isDisplayed) return;

    setPropertyId(id);
    show();

    const app = document.getElementById("app") as HTMLElement;
    app.classList.add("overflow-hidden");
    const newUrl = `/inmueble/${property.id}`;
    const newTitle = property.title;
    const newState = { page: property.id };
    window.history.pushState(newState, newTitle, newUrl);
  };

  return (
    <article>
      <div className="relative mb-1">
        <a
          href={`/inmueble/${id}`}
          onClick={(event) => onDisplayPropertyDetail(event, id)}
        >
          <PropertyFirstImage
            title={property.title}
            src={property.property_image?.at(0)?.image_url}
          />
        </a>
        <div className="absolute right-0 top-0 p-4 gap-2 flex items-center">
          {/* <button className="p-3 hover:text-gray-500 bg-white rounded-full transition-colors duration-700 ease-in-out">
            <Icon icon="material-symbols:bookmark" className="text-2xl" />
          </button> */}
          <Like propertyId={id} userEmail={userEmail} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <a
          href={`/empresa/${company.id}`}
          title={company.name}
          className="flex-shrink-0"
        >
          <img
            src={company.logo_url}
            className="w-8 h-8 object-cover rounded-full"
            alt={company.name}
            title={company.name}
          />
        </a>
        <div className="flex items-center justify-between w-full gap-4">
          <h2>
            <a title={title} href={`/inmueble/${id}`} className="font-semibold">
              {title}
            </a>
          </h2>
          <div className="flex items-center">
            <Like
              propertyId={id}
              userEmail={userEmail}
              size="small"
              hasCounter
            />
          </div>
        </div>
      </div>
    </article>
  );
}
