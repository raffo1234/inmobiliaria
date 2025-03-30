import hero from "../assets/hero.jpg";

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
          <img src={hero.src} alt="Property" className="w-full" />
        </div>
        <section>
          <p>{property.id}</p>
          <h2>{property.title}</h2>
        </section>
      </div>
    </main>
  );
}
