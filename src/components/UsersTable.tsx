import { supabase } from "@lib/supabase";
import DeleteUser from "@components//DeleteUser";
import EditUser from "@components/EditUser";
import TableSkeleton from "@components/TableSkeleton";
import useSWR from "swr";

const fetchUsers = async () => {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export default function UsersTable() {
  const {
    data: users = [],
    error,
    isLoading,
    mutate,
  } = useSWR("users", fetchUsers);

  const onDelete = async (id: string | undefined) => {
    const confirmationMessage = confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmationMessage) return;

    try {
      await supabase.from("user").delete().eq("id", id);
      const updatedUsers = users.filter((user) => user.id !== id);
      mutate(updatedUsers, false);
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  if (error) return null;

  return (
    <div className="max-w-[1200px] mx-auto w-full">
      {isLoading ? (
        <TableSkeleton cols={3} rows={3} />
      ) : (
        <>
          <div className="flex justify-end mb-2">
            <a
              href="/admin/users/add"
              className="inline-block py-2 px-6 text-sm bg-cyan-100 border border-cyan-500 rounded-md"
            >
              Agregar
            </a>
          </div>
          <div className="rounded-lg border border-gray-200">
            <table className="w-full text-left rounded-lg">
              <thead>
                <tr>
                  <th className="px-6 py-4 font-normal">Nombre</th>
                  <th className="px-6 py-4 font-normal">Email</th>
                  <th className="px-6 py-4 font-normal w-50">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users?.map(({ name, email, id }) => {
                  return (
                    <tr
                      key={id}
                      className="transition-colors duration-300 hover:bg-gray-50 border-t border-gray-200"
                    >
                      <td className="px-6 py-4">{name}</td>
                      <td className="px-6 py-4">{email}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-4 items-center">
                          <EditUser userId={id} />
                          <DeleteUser userId={id} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
