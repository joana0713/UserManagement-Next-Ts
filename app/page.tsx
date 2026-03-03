"use client";

import ThemeToggle from "./components/ThemeToggle";
import UserTable from "./components/UserTable";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/Modal";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [users, setUsers] = useState([
    { id: 1, name: "Joana Kelly", email: "joana@email.com" },
  ]);

  const [editUser, setEditUser] = useState<{
    id: number;
    name: string;
    email: string;
  } | null>(null);

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
              setOpen(true);
            }}
            onDelete={(id) => {
              setUsers(users.filter((u) => u.id !== id));
            }}
          />

          {/* Modal */}
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className="space-y-4">

              <h2 className="text-lg font-semibold">Add User</h2>

              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>

                <Button
                  onClick={() => {
                    if (editUser) {
                      // Update User
                      setUsers(
                        users.map((u) =>
                          u.id === editUser.id
                            ? { ...u, name, email }
                            : u
                        )
                      );
                    } else {
                      // Insert User
                      setUsers([
                        ...users,
                        { id: Date.now(), name, email },
                      ]);
                    }

                    setOpen(false);
                    setEditUser(null);
                    setName("");
                    setEmail("");
                  }}
                >
                  Save
                </Button>
              </div>

            </div>
          </Modal>

        </div>
      </main>
    </div>
  );
}