import EditPropertyInformation from "./EditPropertyInformation";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import PropertyTypes from "./PropertyTypologies";
import { Icon } from "@iconify/react";
import { useGlobalState } from "@lib/globalState";

export default function EditProperty({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  const { setModalContent, setModalOpen } = useGlobalState();

  const showGlobalModal = () => {
    setModalContent(<Tabs defaultActiveKey="1" items={items} />);
    setModalOpen(true);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "General",
      children: (
        <EditPropertyInformation
          id={id}
          userId={userId}
          hideModal={() => setModalOpen(false)}
        />
      ),
    },
    {
      key: "2",
      label: "Tipologias",
      children: <PropertyTypes propertyId={id} />,
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={showGlobalModal}
        className="w-12 h-12 flex items-center justify-center"
      >
        <Icon
          icon="material-symbols-light:edit-square-outline-rounded"
          className="text-3xl"
        />
      </button>
    </>
  );
}
