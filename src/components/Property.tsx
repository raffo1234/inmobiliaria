import hero from "@assets/hero.jpg";
import { useState } from "react";
import Typologies from "./Typologies";
import { Icon } from "@iconify/react";
import { Carousel } from "antd";
import { PropertyPhase } from "@types/propertyState";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Like from "./Like";
import GetInTouch from "./GetInTouch";

const MainImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loading, setLoading] = useState(false);
  return (
    <img
      src={src}
      onLoad={() => setLoading(true)}
      alt={alt}
      loading="lazy"
      className={`w-full aspect-5/3 transition-opacity rounded-md duration-700 ease-in-out ${loading ? "opacity-100" : "opacity-0"}`}
    />
  );
};

type Typology = {
  name: string;
  description: string;
  price: string;
  size: string;
  stock: string;
  bathroom_count: string;
  bedroom_count: string;
};

type Company = {
  id: string;
  name: string;
  logo_url: string;
  image_url: string;
};

type Property = {
  id: string;
  title: string;
  description: string;
  price: string;
  bathroom_count: string;
  bedroom_count: string;
  state: string;
  size: string;
  typologies?: Typology[];
  delivery_at: string;
  phase: string;
  company: Company;
  location: string;
};

export default function Property({
  userId,
  property,
}: {
  property: Property | undefined;
  userId: string;
}) {
  if (!property) return null;

  const {
    id,
    title,
    bathroom_count,
    bedroom_count,
    phase,
    delivery_at,
    price,
    location,
    company,
  } = property;

  return (
    <>
      <div className="mx-auto max-w-[1250px] w-full mb-6">
        <div className="mb-4">
          <h2 className="md:text-2xl text-lg font-semibold">{title}</h2>
          {location ? <p className="text-sm mt-1">{location}</p> : null}
        </div>
        <div className="flex items-center gap-3 w-full justify-between mb-4">
          <a
            href={`/empresa/${company.id}`}
            title={company.name}
            className="flex items-center gap-2"
          >
            <img src={company.logo_url} alt={company.name} className="w-24" />
            <span>{company.name}</span>
          </a>
          <div className="flex gap-3">
            <Like propertyId={id} userId={userId} />
            <GetInTouch
              propertyId={id}
              companyName={company.name}
              companyLogo={company.logo_url}
              propertyTitle={property.title}
            />
          </div>
        </div>
        <div className="lg:flex items-start gap-2">
          <div className="flex-grow lg:w-3/5 mb-2">
            <Carousel
              arrows
              draggable
              infinite={false}
              autoplay={{ dotDuration: true }}
              autoplaySpeed={3000}
            >
              <MainImage src={hero.src} alt={title} />
              <MainImage
                src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp"
                alt={title}
              />
              <MainImage
                src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp"
                alt={title}
              />
            </Carousel>
          </div>
          <section
            className="grid gap-2"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
            }}
          >
            <div className="rounded-lg p-4 bg-[#FFF7E1]">
              <div className="p-2 inline-block rounded-lg bg-[#F3B408] mb-1">
                <Icon
                  icon="iconoir:bed-ready"
                  className="text-2xl text-white"
                />
              </div>
              <div className="text-xs text-gray-400 mb-1">{phase}</div>
              {phase === PropertyPhase.PLANOS ||
                phase === PropertyPhase.CONSTRUCCION ? (
                <div className="text-sm">
                  <span className="text-xs">Entrega:</span>{" "}
                  <span className="font-semibold">
                    {format(new Date(delivery_at), "dd MMMM, yyyy", {
                      locale: es,
                    })}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="rounded-lg p-4 bg-[#E6ECFF]">
              <div className="p-2 inline-block rounded-lg bg-[#476CF6] mb-1">
                <Icon
                  icon="lucide:bed-double"
                  className="text-2xl text-white"
                />
              </div>
              <div className="text-xs text-gray-400 mb-1">Dormitorios</div>
              <div className="text-sm font-semibold">{bedroom_count}</div>
            </div>
            <div className="rounded-lg p-4 bg-[#DAF8F7]">
              <div className="p-2 inline-block rounded-lg bg-[#2FCCCC] mb-1">
                <Icon
                  icon="lucide-lab:shower"
                  className="text-2xl text-white"
                />
              </div>
              <div className="text-xs text-gray-400 mb-1">Ba&ntilde;os</div>
              <div className="text-sm font-semibold">{bathroom_count}</div>
            </div>
            <div className="rounded-lg p-4 bg-[#E5E3FF]">
              <div className="p-2 inline-block rounded-lg bg-[#8C75FF] mb-1">
                <Icon
                  icon="solar:tag-price-linear"
                  className="text-2xl text-white"
                />
              </div>
              <div className="text-xs text-gray-400 mb-1">Precio</div>
              <div className="text-sm">
                Desde: S/. <span className="font-semibold">{price}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
      {property.description ? (
        <>
          <h3 className="mb-6 text-xl font-semibold">Conoce mas:</h3>
          <p className="leading-relaxed">{property.description}</p>
        </>
      ) : null}

      <Typologies propertyId={property.id} />
    </>
  );
}
