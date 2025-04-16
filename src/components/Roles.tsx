import { Icon } from "@iconify/react";
import { Switch } from "antd";
import { supabase } from "@lib/supabase";
import { Skeleton } from "antd";
import { useState } from "react";
import useSWR from "swr";

const permissionsFetcher = async () => {
  const { data, error } = await supabase
    .from("permission")
    .select("*")
    .order("name", { ascending: true });
  if (error) throw error;
  return data;
};

const rolePermissionFetcher = async (roleId: string, permissionId: string) => {
  const { count, error } = await supabase
    .from("role_permission")
    .select("role_id", { count: "exact" })
    .eq("role_id", roleId)
    .eq("permission_id", permissionId);
  if (error) throw error;
  return count;
};

export function Permission({
  permission,
  roleId,
}: {
  permission: {
    id: string;
    name: string;
  };
  roleId: string;
}) {
  const { id, name } = permission;

  const {
    data: count,
    error,
    isLoading,
    mutate,
  } = useSWR(`${roleId}-${permission.id}-admin-role-permission`, () =>
    rolePermissionFetcher(roleId, permission.id)
  );

  const onChange = async (checked: boolean) => {
    if (checked) {
      await supabase.from("role_permission").insert([
        {
          role_id: roleId,
          permission_id: id,
        },
      ]);
      await mutate();
    } else {
      await supabase
        .from("role_permission")
        .delete()
        .eq("role_id", roleId)
        .eq("permission_id", id);
      await mutate();
    }
  };

  return (
    <div key={id} className="py-1 flex gap-3 items-center">
      {isLoading ? (
        <div className="w-[44px] h-[22px] rounded-3xl bg-gray-100" />
      ) : (
        <Switch
          loading={isLoading}
          id={id}
          disabled={isLoading}
          defaultChecked={count ? count > 0 : false}
          onChange={onChange}
        />
      )}
      <label htmlFor={id} className="py-2">
        {name}
      </label>
    </div>
  );
}

export function Permissions({ roleId }: { roleId: string }) {
  const {
    data: permissions,
    error,
    isLoading,
  } = useSWR(`${roleId}-admin-permissions`, permissionsFetcher);

  if (error) return null;
  if (isLoading) return <Skeleton />;
  return permissions?.map((permission) => {
    return (
      <Permission key={permission.id} roleId={roleId} permission={permission} />
    );
  });
}

export function Role({
  role,
}: {
  role: {
    id: string;
    name: string;
    description: string;
  };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { id, name } = role;
  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        key={id}
        className={`${isOpen ? "bg-gray-50" : ""} w-full flex gap-1 items-center text-left hover:bg-gray-50 transition-colors duration-300 px-6 py-4 border-t border-gray-200`}
      >
        <Icon icon="stash:chevron-down-light" fontSize={18} />
        <span className="pb-1">{name}</span>
      </button>
      {isOpen ? (
        <div className="border-t border-gray-200 pl-20 pr-4 py-8">
          <Permissions roleId={role.id} />
        </div>
      ) : null}
    </>
  );
}

const rolesFetcher = async () => {
  const { data, error } = await supabase
    .from("role")
    .select("*")
    .order("name", { ascending: true });
  if (error) throw error;
  return data;
};

export default function Roles() {
  const { data: roles, error, isLoading } = useSWR("admin-roles", rolesFetcher);

  if (error) return null;
  if (isLoading)
    return (
      <div className="p-4">
        <Skeleton />
      </div>
    );

  return roles?.map((role) => {
    return <Role key={role.id} role={role} />;
  });
}
