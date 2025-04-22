import { Icon } from "@iconify/react";

export default function HightLightSelect() {
  return (
    <a
      href="/inmuebles/favoritos"
      title="Favoritos"
      className="mb-8 py-1 pt-[5px] group px-6 border inline-block border-gray-300 rounded-lg transition-colors hover:border-cyan-300 active:border-cyan-400"
    >
      <span className="flex items-center gap-2">
        <span className="pb-1">Favoritos</span>
        <Icon
          fontSize={18}
          icon="solar:heart-bold"
          className="group-hover:text-cyan-300 transition-colors "
        />
      </span>
    </a>
  );
}
