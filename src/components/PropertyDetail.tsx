import { useEffect } from "react";
import Property from "./Property";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface Property {
  id: string;
  title: string;
  description: string;
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
}: {
  showDetail: boolean;
  setShowDetail: (value: boolean) => void;
  setPropertyValue: (property: Property | undefined) => void;
  propertyValue: Property;
}) {
  const onClose = (event?: React.MouseEvent<HTMLElement>) => {
    if (event) {
      if (event.target === event.currentTarget) {
        handleClose();
      }
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setPropertyValue(undefined);
    const app = document.getElementById("app") as HTMLElement;
    app.classList.remove("overflow-hidden");
    setShowDetail(false);
    window.history.go(-1);
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", function (event) {
      handleEscape(event);
    });

    return () => {
      document.removeEventListener("keyup", function (event) {
        handleEscape(event);
      });
    };
  }, [showDetail]);

  return showDetail ? (
    <div
      onClick={onClose}
      className="px-4 bg-black fixed z-30 top-0 cursor-pointer left-0 w-full h-full overflow-auto p-6 bg-opacity-40"
    >
      <div className="max-w-[1816px] py-10 pb-20 px-4 animate-slideUp cursor-default mx-auto relative delay-50 transform-all rounded-lg bg-white min-h-lvh">
        <div className="mx-auto max-w-[1024px] w-full">
          <Property property={propertyValue} />
        </div>
        <Button
          className="absolute right-6 top-6 rounded-full w-12 h-12 flex justify-center items-center"
          onClick={() => onClose()}
        >
          <CloseOutlined className="text-xl" />
        </Button>
      </div>
    </div>
  ) : null;
}
