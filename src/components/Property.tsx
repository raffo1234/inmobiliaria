import hero from "@assets/hero.jpg";
import { useState } from "react";
import { Button, Input } from "antd";
import Typologies from "./Typologies";

const Image = ({ src, alt }: { src: string; alt: string }) => {
  const [loading, setLoading] = useState(false);
  return (
    <img
      src={src}
      onLoad={() => setLoading(true)}
      alt={alt}
      loading="lazy"
      className={`w-full transition-opacity rounded-md duration-700 ease-in-out ${loading ? "opacity-100" : "opacity-0"}`}
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
      <h2 className="text-2xl font-semibold mb-8">{property.title}</h2>
      <div className="flex items-start gap-6">
        <div className="w-3/4">
          <Image src={hero.src} alt="Property" />
        </div>
        <section>
          <form className="mb-6 flex flex-col gap-4">
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
          </form>
        </section>
      </div>
      <h3 className="mt-10 mb-6 text-xl font-semibold">Conoce mas:</h3>
      <p className="leading-relaxed">{property.description}</p>
      <Typologies propertyId={property.id} />
    </>
  );
}
