import { Icon } from "@iconify/react";

export default function HightLightSelect() {
  return (
    <a
      href="/inmuebles/favoritos"
      title="Favoritos"
      className="mb-8  py-2 text-sm px-4 border inline-block border-gray-300 rounded-lg transition-colors hover:border-gray-400 active:border-gray-600"
    >
      <span className="flex items-center gap-1">
        <span>Favoritos</span>
        <Icon
          fontSize={24}
          icon="stash:chevron-down-light"
          className="-rotate-90"
        />
      </span>
    </a>
  );
}
