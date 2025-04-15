import { Icon } from "@iconify/react";
import { Button } from "antd";

export default function HightLightSelect() {
  return (
    <div className="mb-8">
      <Button href="/inmuebles/favoritos" size="large" title="Favoritos">
        <span>Favoritos</span>
        <Icon
          fontSize={24}
          icon="stash:chevron-down-light"
          className="-rotate-90"
        />
      </Button>
    </div>
  );
}
