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
  const { setEditModalContent, setEditPropertyId, setEditModalOpen } =
    useGlobalState();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "General",
      children: (
        <EditPropertyInformation
          id={id}
          userId={userId}
          hideModal={() => setEditModalOpen(false)}
        />
      ),
    },
    {
      key: "2",
      label: "Tipologias",
      children: <PropertyTypes propertyId={id} />,
    },
  ];

  const openEditView = () => {
    setEditPropertyId(id);
    setEditModalContent(<Tabs items={items}></Tabs>);
    setEditModalOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={openEditView}
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
