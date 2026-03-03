"use client";

import { Pencil, Trash2 } from "lucide-react";
import Button from "./ui/Button";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserTable({ users, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <table className="w-full text-sm">
        <thead className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
          <tr>
            <th className="text-left px-6 py-3 font-medium">Name</th>
            <th className="text-left px-6 py-3 font-medium">Email</th>
            <th className="px-6 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {user.email}
                </td>
                <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                        <Pencil
                            size={16}
                            strokeWidth={1.6}
                            onClick={() => onEdit(user)}
                            className="cursor-pointer text-gray-500 hover:text-blue-600 transition"
                            />
                        <Trash2
                            size={16}
                            strokeWidth={1.6}
                            onClick={() => {
                                if (confirm("Delete this user?")) {
                                onDelete(user.id);
                                }
                            }}
                            className="cursor-pointer text-gray-500 hover:text-red-600 transition"
                        />
                    </div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}