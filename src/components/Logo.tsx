import { Icon } from "@iconify/react";

export default function Logo() {
  return (
    <a
      href="/"
      title="Inicio | Inmobiliaria"
      className="flex items-center gap-2 text-sm font-semibold uppercase"
    >
      <span className="p-2 rounded-xl bg-cyan-500 block">
        <Icon icon="solar:home-smile-bold" className="text-3xl text-white" />
      </span>
      <span>Home</span>
    </a>
  );
}
