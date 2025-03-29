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
  // const [showDetail, setShowDetail] = useState(false);
  // const currentState = window.history.state;

  // const newUrl = "/new-page";

  // const newState = { page: "new-page" };

  // const newTitle = "New Page Title";

  // const toggleShowDetail = () => setShowDetail((prev) => !prev);

  // const onClick = () => {
  //   const app = document.getElementById("app");
  //   app?.classList.add("overflow-hidden");
  //   toggleShowDetail();
  //   console.log("URL pushed to:", window.location.pathname);
  //   window.history.pushState(newState, newTitle, newUrl);
  // };

  if (!property) return null;

  return (
    <>
      <div className="flex items-start">
        <div className="w-1/2">
          <img src={hero.src} alt="Property" className="w-full" />
        </div>
        <section>
          <p>{property.id}</p>
          <h2>{property.title}</h2>
        </section>
      </div>
    </>
  );
}
