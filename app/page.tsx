"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUsers,
  deleteUser,
  bulkDeleteUsers,
  createUser,
  updateUser,
} from "./lib/api";

import ThemeToggle from "./components/ThemeToggle";
import UserTable from "./components/UserTable";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/Modal";

import { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

type FormErrors = {
  name?: string;
  email?: string;
};

export default function Home() {
  const queryClient = useQueryClient();

  // ✅ GET users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // ✅ CREATE
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User added");
    },
  });

  // ✅ UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated");
    },
  });

  // ✅ DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted");
    },
  });

  // ✅ BULK DELETE
  const bulkDeleteMutation = useMutation({
    mutationFn: bulkDeleteUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Users deleted");
    },
  });

  // ----------------------------

  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);

  // 🔥 항상 빈 문자열 보장 (uncontrolled 방지)
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Set Default value
  useEffect(() => {
    if (editUser) {
      setName(editUser.name || "");
      setEmail(editUser.email || "");
    } else {
      setName("");
      setEmail("");
    }
  }, [editUser]);

  const handleSave = async () => {
    const newErrors: FormErrors = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(email))
      newErrors.email = "Invalid email format.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      if (editUser) {
        await updateMutation.mutateAsync({
          id: editUser.id,
          data: { name, email },
        });
      } else {
        await createMutation.mutateAsync({ name, email });
      }

      setOpen(false);
      setEditUser(null);
      setErrors({});
      setName("");
      setEmail("");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 bg-white dark:bg-gray-900">
        <h1 className="text-lg font-semibold tracking-tight">
          User Management
        </h1>
        <ThemeToggle />
      </header>

      <main className="flex-1 p-10 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* Top Bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="w-[85%]">
              <Input placeholder="Search user..." />
            </div>

            <Button
              variant="soft"
              className="flex items-center gap-2"
              onClick={() => {
                setEditUser(null);
                setErrors({});
                setOpen(true);
              }}
            >
              <Plus size={16} />
              Add User
            </Button>
          </div>

          {/* Table */}
          <UserTable
            users={users}
            deletingId={deleteMutation.variables ?? null}
            onEdit={(user) => {
              setEditUser(user);
              setOpen(true);
            }}
            onDelete={(id) => deleteMutation.mutate(id)}
            onBulkDelete={(ids) => bulkDeleteMutation.mutateAsync(ids)}
          />

          {/* Modal */}
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                {editUser ? "Edit User" : "Add User"}
              </h2>

              {/* Name */}
              <div className="flex flex-col gap-1">
                <Input
                  placeholder="Name"
                  value={name ?? ""}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name)
                      setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  className={
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : ""
                  }
                />
                {errors.name && (
                  <p className="text-xs text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <Input
                  placeholder="Email"
                  value={email ?? ""}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email)
                      setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className={
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : ""
                  }
                />
                {errors.email && (
                  <p className="text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>

                <Button disabled={loading} onClick={handleSave}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={16} />
                      Saving...
                    </span>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </div>
          </Modal>

        </div>
      </main>
    </div>
  );
}