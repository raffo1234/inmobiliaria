import { supabase } from "@lib/supabase";
import DeleteUser from "@components//DeleteUser";
import EditUser from "@components/EditUser";
import TableSkeleton from "@components/TableSkeleton";
import useSWR from "swr";
import { Icon } from "@iconify/react";

const fetchUsers = async () => {
  const { data, error } = await supabase
    .from("user")
    .select(
      `
      id,
      image_url,
      name,
      username,
      email,
      role_id,
      role(*)  
      `,
    )
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export default function UsersTable() {
  const { data: users = [], error, isLoading } = useSWR("users", fetchUsers);

  if (error) return null;

  return (
    <div className="max-w-[1200px] mx-auto w-full">
      {isLoading ? (
        <TableSkeleton cols={3} rows={3} />
      ) : (
        <>
          <h1 className="mb-6 font-semibold text-lg block">Usuarios</h1>
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
            }}
          >
            <a
              href="/admin/users/add"
              title="Agregar Usuario"
              className="border-dashed border border-gray-200 hover:bg-gray-50 rounded-2xl p-4 flex hover:text-cyan-500 justify-center items-center"
            >
              <span className="text-center">
                <Icon
                  icon="solar:add-square-broken"
                  fontSize={18}
                  className="mx-auto mb-2"
                />
                <span>Agregar Usuario</span>
              </span>
            </a>
            {users?.map(({ name, id, role, image_url }) => {
              return (
                <div
                  key={id}
                  className="border border-gray-200 hover:bg-gray-50 rounded-2xl p-4"
                >
                  <img
                    src={image_url}
                    className="w-11 h-11 rounded-full mb-3 mx-auto"
                    alt={name}
                    title={name}
                  />
                  <div
                    className="font-semibold w-full mb-1 text-center truncate"
                    title={name}
                  >
                    {name}
                  </div>
                  <div className="text-sm text-gray-500 w-full text-center mb-4">
                    {role.name}
                  </div>
                  <div className="flex gap-2 items-center justify-center">
                    <EditUser userId={id} />
                    <DeleteUser userId={id} />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
