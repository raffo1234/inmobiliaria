import hero from "@assets/hero.jpg";
import { useState } from "react";
import { Button, Input } from "antd";

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

type Property = {
  id: string;
  title: string;
};

export default function Property({
  property,
}: {
  property: Property | undefined;
}) {
  if (!property) return null;

  return (
    <main className="relative px-4 lg:px-6 py-[64px]">
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
      <h3 className="mt-10 mb-6 text-xl font-semibold">Details</h3>
      <p className="leading-relaxed">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis unde
        sapiente corrupti voluptates recusandae quos repudiandae soluta
        obcaecati totam qui magnam, libero ducimus atque neque quidem omnis
        voluptate natus aperiam?
      </p>
    </main>
  );
}
