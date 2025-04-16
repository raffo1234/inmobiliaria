import FormSkeleton from "@components/FormSkeleton";
import { supabase } from "@lib/supabase";
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
  name: string;
  role_id: string;
};

const rolesFetcher = async () => {
  const { data, error } = await supabase
    .from("role")
    .select("*")
    .order("name", { ascending: true });
  if (error) throw error;
  return data;
};

export default function EditUser({ userId }: { userId: string }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);

  const { data: roles, error, isLoading } = useSWR("admin-roles", rolesFetcher);

  const { data: user } = useSWR(userId, () => fetcher(userId));

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
    setIsUpdating(true);
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
    } catch (error) {
      console.error(error);
    } finally {
      hideModal();
      setIsUpdating(false);
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
        className="inline-block py-2 px-6 bg-white text-sm border border-gray-200 rounded-lg transition-colors hover:border-gray-300 active:border-gray-400"
      >
        Edit
      </button>
      {contextHolder}
      <Modal
        open={open}
        onCancel={hideModal}
        destroyOnClose
        okText="Save"
        okButtonProps={{
          disabled: isLoading || isUpdating,
          form: "editUser",
          htmlType: "submit",
        }}
        cancelButtonProps={{ disabled: isLoading || isUpdating }}
      >
        {isLoading ? (
          <FormSkeleton rows={2} />
        ) : (
          <div className="md:py-6 md:px-3">
            <h4 className="mb-6 text-xl">Editar Usuario</h4>
            <form onSubmit={handleSubmit(onSubmit)} id="editUser">
              <fieldset className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="inline-block font-semibold mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    disabled
                    type="text"
                    id="name"
                    {...register("name")}
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="inline-block font-semibold mb-2"
                  >
                    Username
                  </label>
                  <input
                    disabled
                    type="text"
                    id="username"
                    {...register("username")}
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="inline-block mb-2 font-semibold"
                  >
                    Email
                  </label>
                  <input
                    disabled
                    type="email"
                    id="email"
                    {...register("email")}
                    required
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:outline-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="role_id"
                    className="inline-block mb-2 font-semibold"
                  >
                    Role
                  </label>
                  <select
                    id="role_id"
                    {...register("role_id")}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:outline-2 focus:ring focus:ring-blue-500 focus:border-blue-500"
                  >
                    {roles?.map(({ id, name }) => {
                      return (
                        <option value={id} key={id}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </fieldset>
            </form>
          </div>
        )}
      </Modal>
    </>
  );
}
