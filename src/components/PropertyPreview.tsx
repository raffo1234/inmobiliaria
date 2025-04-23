import { useEffect } from "react";
import Property from "./Property";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useGlobalState } from "@lib/globalState";
import useSWR from "swr";
import { PropertyState } from "@types/propertyState";
import { supabase } from "@lib/supabase";

const fetcher = async (propertyId: string) => {
  const { data } = await supabase
    .from("property")
    .select(
      `
      id,
      title,
      description,
      state,
      user_id,
      size,
      delivery_at,
      bathroom_count,
      phase,
      price,
      location,
      bedroom_count,
      company_id,
      user!property_user_id_fkey (
        id,
        email,
        name,
        image_url
      ),
      company!property_company_id_fkey (
        id,
        name,
        logo_url
      ),
      typology (
        id,
        name,
        description,
        price,
        size,
        stock,
        bathroom_count,
        bedroom_count
      )
    `,
    )
    .eq("state", PropertyState.ACTIVE)
    .eq("id", propertyId)
    .order("created_at", { ascending: false })
    .single();

  return data;
};

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
  company: {
    id: string;
    name: string;
  };
  typology: {
    id: string;
    name: string;
  }
}

export default function PropertyPreview({
  currentHref,
  userId,
}: {
  currentHref: string;
  userId: string;
}) {
  const { propertyId, hide, isDisplayed } = useGlobalState();

  const { data: property } = useSWR(propertyId, () =>
    propertyId ? fetcher(propertyId) : null,
  );
  const onClose = (event?: React.MouseEvent<HTMLElement>) => {
    if (!isDisplayed) return;

    if (event) {
      if (event.target === event.currentTarget) {
        handleClose();
      }
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    hide();
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
      if (isDisplayed) {
        handleEscape(event);
      }
    });

    window.addEventListener("popstate", function () {
      if (isDisplayed) {
        handleClose();
      }
    });

    return () => {
      document.removeEventListener("keyup", function (event) {
        if (isDisplayed) {
          handleEscape(event);
        }
      });

      window.removeEventListener("popstate", function () {
        if (isDisplayed) {
          handleClose();
        }
      });
    };
  }, [isDisplayed]);

  return isDisplayed ? (
    <div
      onClick={(event) => onClose(event)}
      className="bg-black fixed z-30 top-0 cursor-pointer left-0 w-full h-full overflow-auto lg:p-6 bg-opacity-40"
    >
      <div className="max-w-[1816px] py-20 px-4 animate-slideUp cursor-default mx-auto relative delay-50 transform-all lg:rounded-lg bg-white min-h-lvh">
        <div className="mx-auto max-w-[1024px] w-full">
          <Property property={property} userId={userId} />
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
