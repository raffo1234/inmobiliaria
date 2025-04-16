import { useEffect } from "react";
import Property from "./Property";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface Property {
  id: string;
  title: string;
  description: string;
  price: string;
  bathroom_count: string;
  bedroom_count: string;
  state: string;
  size: string;
  delivery_at: string;
  phase: string;
  like?: {
    user_id: string;
  }[];
  user_id?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    image_url: string;
  };
}

export default function PropertyDetail({
  showDetail,
  setPropertyValue,
  setShowDetail,
  propertyValue,
  currentHref,
  userId,
}: {
  showDetail: boolean;
  setShowDetail: (value: boolean) => void;
  setPropertyValue: (property: Property | undefined) => void;
  propertyValue: Property;
  currentHref: string;
  userId: string;
}) {
  const onClose = (event?: React.MouseEvent<HTMLElement>) => {
    if (!showDetail) return;

    if (event) {
      if (event.target === event.currentTarget) {
        handleClose();
      }
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setShowDetail(false);
    setPropertyValue(undefined);
    const app = document.getElementById("app") as HTMLElement;
    app.classList.remove("overflow-hidden");
    window.history.pushState({}, "", currentHref);
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", function (event) {
      if (!showDetail) return;
      handleEscape(event);
    });

    return () => {
      document.removeEventListener("keyup", function (event) {
        if (!showDetail) return;
        handleEscape(event);
      });
    };
  }, [showDetail]);

  return showDetail ? (
    <div
      onClick={(event) => onClose(event)}
      className="bg-black fixed z-30 top-0 cursor-pointer left-0 w-full h-full overflow-auto lg:p-6 bg-opacity-40"
    >
      <div className="max-w-[1816px] py-20 px-4 animate-slideUp cursor-default mx-auto relative delay-50 transform-all lg:rounded-lg bg-white min-h-lvh">
        <div className="mx-auto max-w-[1024px] w-full">
          <Property property={propertyValue} userId={userId} />
        </div>
        <Button
          className="absolute right-6 top-6 rounded-full w-12 h-12"
          onClick={() => onClose()}
        >
          <CloseOutlined className="text-xl" />
        </Button>
      </div>
    </div>
  ) : null;
}
