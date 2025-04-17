import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Aside({
  currentPath,
  userName,
  userImage,
}: {
  currentPath: string;
  userName: string;
  userImage: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${isOpen ? "text-cyan-500" : ""} lg:invisible visible absolute right-2 top-[98px] bg-white z-30 w-12 h-12 border border-gray-200 rounded-xl flex justify-center items-center`}
      >
        <Icon icon="solar:hamburger-menu-broken" fontSize={24} />
      </button>
      <section
        className={`${isOpen ? "opacity-100 visible translate-x-0" : "invisible opacity-0 lg:visible lg:opacity-100 lg:translate-x-0 -translate-x-2"} transition-all lg:w-[286px] min-h-lvh w-full absolute left-0 top-[89px] z-20 lg:static py-8 px-5 bg-white`}
      >
        <header className="mb-20">
          <div className="flex gap-4 items-center">
            <img
              src={userImage}
              alt={userName}
              className="w-12 h-12 rounded-full bg-neutral-700"
            />
            <div className="">
              <p className="text-sm leading-3 mb-1 text-gray-500">Bienvenido</p>
              <h3 className="font-semibold text-gray-700 text-lg">
                {userName}
              </h3>
            </div>
          </div>
        </header>
        <nav>
          <ul className="flex flex-col gap-1 text-sm">
            {pages.map(({ href, title, iconName }) => (
              <li key={href}>
                <a
                  href={href}
                  title={title}
                  className={`${href === currentPath ? "bg-gray-100 hover:bg-gray-100" : "hover:bg-gray-100"}  rounded-xl py-2 px-4 gap-3.5 flex items-center`}
                >
                  <Icon icon={iconName} fontSize={17} />
                  <span>{title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </>
  );
}

const pages = [
  {
    href: "/admin/users",
    title: "Usuarios",
    iconName: "solar:user-linear",
  },
  {
    href: "/admin/property",
    title: "Propiedades",
    iconName: "solar:key-square-2-broken",
  },
  {
    href: "/admin/roles",
    title: "Roles",
    iconName: "solar:user-check-broken",
  },
  {
    href: "/admin/permisos",
    title: "Permisos",
    iconName: "solar:lock-keyhole-broken",
  },
];
