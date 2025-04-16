import { supabase } from "@lib/supabase";
import useSWR from "swr";

const permissionFetcher = async (slug: string) => {
  const { data, error } = await supabase
    .from("permission")
    .select("id")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data;
};

// const permissionsFetcher = async () => {
//   const { data, error } = await supabase
//     .from("permission")
//     .select("*")
//     .order("name", { ascending: true });
//   if (error) throw error;
//   return data;
// };

const rolePermissionFetcher = async (roleId: string, permissionId: string) => {
  const { count, error } = await supabase
    .from("role_permission")
    .select("*", { count: "exact" })
    .eq("role_id", roleId)
    .eq("permission_id", permissionId);
  if (error) throw error;
  return count;
};

export default function CheckPermission({
  userRoleId,
  requiredPermission,
  children,
  fallback = null,
}: {
  userRoleId: string;
  requiredPermission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { data: permission } = useSWR(`permission-${requiredPermission}`, () =>
    permissionFetcher(requiredPermission)
  );

  const { data: permissionsCount } = useSWR(
    `role-permission-${userRoleId}-${permission?.id}`,
    () => (permission ? rolePermissionFetcher(userRoleId, permission.id) : null)
  );

  if (permissionsCount === 0) return fallback;
  if (permissionsCount === 1) return children;
}
