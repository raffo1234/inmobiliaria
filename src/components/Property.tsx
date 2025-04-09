import hero from "@assets/hero.jpg";
import { useState } from "react";
import Typologies from "./Typologies";
import { Icon } from "@iconify/react";
import { Carousel } from "antd";

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

type Property = {
  id: string;
  title: string;
  description: string;
  typologies?: Typology[];
};

export default function Property({
  property,
}: {
  property: Property | undefined;
}) {
  if (!property) return null;

  return (
    <>
      <div className="mx-auto max-w-[1250px] w-full">
        <h2 className="text-2xl font-semibold mb-8">{property.title}</h2>
        <div className="flex w-full items-start gap-6">
          <div className="w-4/5">
            <Carousel
              arrows
              draggable
              infinite={false}
              autoplay={{ dotDuration: true }}
              autoplaySpeed={3000}
            >
              <MainImage src={hero.src} alt={property.title} />
              <MainImage
                src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp"
                alt={property.title}
              />
              <MainImage
                src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp"
                alt={property.title}
              />
            </Carousel>
          </div>
          <section className="flex-grow w-1/5">
            <div className="grid gap-2">
              <div className="rounded-lg p-4 bg-[#FFF7E1]">
                <div className="p-2 inline-block rounded-lg bg-[#F3B408] mb-1">
                  <Icon
                    icon="iconoir:bed-ready"
                    className="text-2xl text-white"
                  />
                </div>
                <div className="text-xs text-gray-400 mb-1">En Planos</div>
                <div className="text-sm">Entrega: 03 de Enero, 2025</div>
              </div>
              <div className="rounded-lg p-4 bg-[#E6ECFF]">
                <div className="p-2 inline-block rounded-lg bg-[#476CF6] mb-1">
                  <Icon
                    icon="iconoir:bed-ready"
                    className="text-2xl text-white"
                  />
                </div>
                <div className="text-xs text-gray-400 mb-1">En Planos</div>
                <div className="text-sm">Entrega: 03 de Enero, 2025</div>
              </div>
              <div className="rounded-lg p-4 bg-[#DAF8F7]">
                <div className="p-2 inline-block rounded-lg bg-[#2FCCCC] mb-1">
                  <Icon
                    icon="iconoir:bed-ready"
                    className="text-2xl text-white"
                  />
                </div>
                <div className="text-xs text-gray-400 mb-1">En Planos</div>
                <div className="text-sm">Entrega: 03 de Enero, 2025</div>
              </div>
              <div className="rounded-lg p-4 bg-[#E5E3FF]">
                <div className="p-2 inline-block rounded-lg bg-[#8C75FF] mb-1">
                  <Icon
                    icon="iconoir:bed-ready"
                    className="text-2xl text-white"
                  />
                </div>
                <div className="text-xs text-gray-400 mb-1">En Planos</div>
                <div className="text-sm">Entrega: 03 de Enero, 2025</div>
              </div>
            </div>
            {/* <form className="mb-6 flex flex-col gap-4">
              <fieldset>
                <label className="inline-block font-semibold text-sm mb-3">
                  Nombres
                </label>
                <Input
                  name="name"
                  size="large"
                  placeholder="Nombres y Apellidos"
                />
              </fieldset>
              <fieldset>
                <label className="inline-block font-semibold text-sm mb-3">
                  Email
                </label>
                <Input name="email" size="large" placeholder="Email" />
              </fieldset>
              <Button size="large" color="default" variant="solid">
                Contactar
              </Button>
            </form> */}
          </section>
        </div>
      </div>
      <h3 className="mt-10 mb-6 text-xl font-semibold">Conoce mas:</h3>
      <p className="leading-relaxed">{property.description}</p>
      <Typologies propertyId={property.id} />
    </>
  );
}
