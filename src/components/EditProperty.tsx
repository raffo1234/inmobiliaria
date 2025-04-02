import { Modal } from "antd";
import EditPropertyInformation from "./EditPropertyInformation";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useState } from "react";
import EditPropertyType from "./EditPropertyType";
import PropertyTypes from "./PropertyTypes";

export default function EditUser({ id }: { id: string }) {
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
      children: <PropertyTypes id={id} />,
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={showModal}
        className="inline-block text-500 hover:text-blue-500 py-2 px-5 text-sm"
      >
        Edit
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
