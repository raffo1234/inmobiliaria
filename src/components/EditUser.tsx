import FormSkeleton from "./FormSkeleton";
import { supabase } from "../lib/supabase";
import useSWR, { mutate } from "swr";
import { useEffect, useMemo, useState } from "react";
import { Modal, message } from "antd";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

async function fetcher(userId: string) {
  const { data, error } = await supabase
    .from("user")
    .select()
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

type Inputs = {
  username: string;
  email: string;
};

export default function EditUser({ userId }: { userId: string }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const {
    data: user,
    error,
    isLoading,
  } = useSWR(userId, () => fetcher(userId));

  const success = () => {
    messageApi.open({
      type: "success",
      content: "User updated successfully!",
    });
  };

  const { reset, register, handleSubmit } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: useMemo(() => {
      return user;
    }, [user]),
  });

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { data: updatedUser } = await supabase
        .from("user")
        .update(data)
        .eq("id", userId)
        .select()
        .single();
      await mutate(userId, updatedUser);
      await mutate("users");
      success();
      hideModal();
    } catch (error) {
      console.error(error);
      hideModal();
    }
  };

  useEffect(() => {
    reset(user);
  }, [user]);

  if (error) return <div>Error loading item details</div>;

  return (
    <>
      <button
        type="button"
        disabled={isLoading}
        onClick={showModal}
        className="inline-block text-500 hover:text-blue-500 py-2 px-5 text-sm"
      >
        Edit
      </button>
      {contextHolder}
      <Modal
        title="Edit User"
        open={open}
        onCancel={hideModal}
        destroyOnClose
        okText="Save"
        okButtonProps={{
          disabled: isLoading,
          form: "editUser",
          htmlType: "submit",
        }}
        cancelButtonProps={{ disabled: isLoading }}
      >
        {isLoading ? (
          <FormSkeleton rows={2} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} id="editUser">
            <div className="flex flex-col gap-4">
              <fieldset>
                <label
                  htmlFor="username"
                  className="block font-bold mb-2 font-manrope"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  {...register("username")}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
              </fieldset>
              <fieldset>
                <label
                  htmlFor="email"
                  className="block mb-2.5 font-manrope font-bold"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:outline-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
                />
              </fieldset>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
