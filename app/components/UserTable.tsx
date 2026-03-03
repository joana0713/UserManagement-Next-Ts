"use client";

import { useState, useMemo } from "react";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  users: User[];
  deletingId: number | null;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const ITEMS_PER_PAGE = 5;

export default function UserTable({
  users,
  deletingId,
  onEdit,
  onDelete,
}: Props) {
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return users.slice(start, start + ITEMS_PER_PAGE);
  }, [users, page]);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((v) => v !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === paginatedUsers.length) {
      setSelected([]);
    } else {
      setSelected(paginatedUsers.map((u) => u.id));
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">

      {/* Empty State */}
      {users.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
          <div className="text-4xl">👤</div>
          <h3 className="text-lg font-semibold">No users found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add a new user to get started.
          </p>
        </div>
      )}

      {users.length > 0 && (
        <>
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-950">
              <tr>
                <th className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={
                      selected.length === paginatedUsers.length &&
                      paginatedUsers.length > 0
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-600 dark:text-gray-400">
                  User
                </th>
                <th className="text-left px-6 py-4 font-medium text-gray-600 dark:text-gray-400">
                  Email
                </th>
                <th className="px-6 py-4 text-right font-medium text-gray-600 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-gray-100 dark:border-gray-800
                             hover:bg-gray-50/70 dark:hover:bg-gray-800/60
                             transition-colors"
                >
                  <td className="px-6 py-5">
                    <input
                      type="checkbox"
                      checked={selected.includes(user.id)}
                      onChange={() => toggleSelect(user.id)}
                    />
                  </td>

                  {/* Avatar + Name */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center text-xs font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-gray-500 dark:text-gray-400">
                    {user.email}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={() => onEdit(user)}
                        className="h-9 w-9 flex items-center justify-center
                                   rounded-lg text-gray-500
                                   hover:text-blue-600
                                   hover:bg-blue-50 dark:hover:bg-blue-900/30
                                   transition"
                      >
                        <Pencil size={16} strokeWidth={1.6} />
                      </button>

                      <button
                        disabled={deletingId === user.id}
                        onClick={() => onDelete(user.id)}
                        className="h-9 w-9 flex items-center justify-center
                                   rounded-lg text-gray-500
                                   hover:text-red-600
                                   hover:bg-red-50 dark:hover:bg-red-900/30
                                   transition disabled:opacity-50"
                      >
                        {deletingId === user.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} strokeWidth={1.6} />
                        )}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50/60 dark:bg-gray-950">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Page {page} of {totalPages}
            </span>

            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700
                           text-sm hover:bg-gray-100 dark:hover:bg-gray-800
                           disabled:opacity-40"
              >
                Prev
              </button>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700
                           text-sm hover:bg-gray-100 dark:hover:bg-gray-800
                           disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}