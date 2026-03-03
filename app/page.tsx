"use client";

import ThemeToggle from "./components/ThemeToggle";
import UserTable from "./components/UserTable";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/Modal";
import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

type FormErrors = {
  name?: string;
  email?: string;
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [users, setUsers] = useState([
    { id: 1, name: "Joana Kelly", email: "joana@email.com" },
  ]);

  const [editUser, setEditUser] = useState<{
    id: number;
    name: string;
    email: string;
  } | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSave = async () => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      await new Promise((res) => setTimeout(res, 800));

      if (editUser) {
        setUsers(
          users.map((u) =>
            u.id === editUser.id ? { ...u, name, email } : u
          )
        );
        toast.success("User updated");
      } else {
        setUsers([
          ...users,
          { id: Date.now(), name, email },
        ]);
        toast.success("User added");
      }

      setOpen(false);
      setEditUser(null);
      setName("");
      setEmail("");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-gray-200 dark:border-gray-800
                         flex items-center justify-between px-8
                         bg-white dark:bg-gray-900">
        <h1 className="text-lg font-semibold tracking-tight">
          User Management
        </h1>
        <ThemeToggle />
      </header>

      {/* Main */}
      <main className="flex-1 p-10 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* Action Bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="w-[85%]">
              <Input placeholder="Search user..." />
            </div>

            <Button
              variant="soft"
              className="flex items-center gap-2"
              onClick={() => {
                setEditUser(null);
                setName("");
                setEmail("");
                setErrors({});
                setOpen(true);
              }}
            >
              <Plus size={16} strokeWidth={1.8} />
              Add User
            </Button>
          </div>

          {/* Table */}
          <UserTable
            users={users}
            onEdit={(user) => {
              setEditUser(user);
              setName(user.name);
              setEmail(user.email);
              setErrors({});
              setOpen(true);
            }}
            onDelete={(id) => {
              setUsers(users.filter((u) => u.id !== id));
              toast.success("User deleted");
            }}
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
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);

                    // Error handle auto
                    if (errors.name) {
                      setErrors((prev) => ({ ...prev, name: undefined }));
                    }
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);

                    // Error handle auto
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }
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