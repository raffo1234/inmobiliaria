import { Modal } from "antd";
import EditPropertyInformation from "./EditPropertyInformation";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useState } from "react";
import PropertyTypes from "./PropertyTypologies";
import { Icon } from "@iconify/react";

export default function EditProperty({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "General",
      children: <EditPropertyInformation id={id} hideModal={hideModal} />,
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
        onClick={showModal}
        className="w-12 h-12 flex items-center justify-center"
      >
        <Icon
          icon="material-symbols-light:edit-square-outline-rounded"
          className="text-3xl"
        />
      </button>
      <Modal
        title="Edit Property"
        open={open}
        onCancel={hideModal}
        width="1000px"
        destroyOnClose
        footer={null}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Modal>
    </>
  );
}
