import { supabase } from "@lib/supabase";
import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dni: number;
  message: number;
};

export default function GetInTouch({
  propertyId,
  companyLogo,
  companyName,
  propertyTitle,
}: {
  propertyId: string;
  companyLogo: string;
  companyName: string;
  propertyTitle: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { reset, register, handleSubmit } = useForm<inputs>({
    mode: "onBlur",
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const sendInquiry = () => {
    showModal();
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { data: createdInquiry } = await supabase
        .from("inquiry")
        .insert({ ...data, ...{ property_id: propertyId } })
        .select()
        .single();
      if (createdInquiry) {
        hideModal();
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        onClick={sendInquiry}
        type="button"
        className="block px-6 py-2 bg-black text-white rounded-full transition-colors duration-700 hover:bg-gray-800 active:bg-gray-900"
      >
        Contactar
      </button>
      <Modal footer={null} open={isModalOpen} onCancel={hideModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="py-4 px-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img src={companyLogo} alt={companyName} className="w-20" />
              <div>
                <h3 className="font-bold text-xl mb-2">
                  Ponte en contacto con {companyName}.
                </h3>
                <p>Descubre: {propertyTitle}</p>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="inline-block mb-2 font-semibold"
              >
                Email
              </label>
              <input
                {...register("email")}
                id="email"
                className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="inline-block mb-2 font-semibold"
              >
                Nombres
              </label>
              <input
                {...register("first_name")}
                id="first_name"
                className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="inline-block mb-2 font-semibold"
              >
                Apellidos
              </label>
              <input
                {...register("last_name")}
                id="last_name"
                className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="dni" className="inline-block mb-2 font-semibold">
                DNI
              </label>
              <input
                {...register("dni")}
                id="dni"
                className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="inline-block mb-2 font-semibold"
              >
                Celular
              </label>
              <input
                {...register("phone")}
                id="phone"
                className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="inline-block mb-2 font-semibold"
              >
                Mensaje
              </label>
              <textarea
                {...register("message")}
                id="message"
                className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              shape="round"
              className="py-6 mt-4"
            >
              Enviar Mensaje
            </Button>
          </fieldset>
        </form>
      </Modal>
    </>
  );
}
