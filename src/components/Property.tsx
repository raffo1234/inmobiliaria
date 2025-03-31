import hero from "../assets/hero.jpg";
import { useState } from "react";

const Image = ({ src, alt }: { src: string; alt: string }) => {
  const [loading, setLoading] = useState(false);
  return (
    <img
      src={src}
      onLoad={() => setLoading(true)}
      alt={alt}
      loading="lazy"
      className={`w-full transition-opacity duration-700 ease-in-out ${loading ? "opacity-100" : "opacity-0"}`}
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
  const onClick = () => {
    window.history.back();
  };

  if (!property) return null;

  return (
    <main className="relative">
      <button onClick={onClick}>Close</button>
      <div className="flex items-start">
        <div className="w-1/2">
          <Image src={hero.src} alt="Property" />
        </div>
        <section>
          <p>{property.id}</p>
          <h2>{property.title}</h2>
        </section>
      </div>
    </main>
  );
}
