"use client";

import { useEffect, useState } from "react";
import { getUsers, createUser } from "./services/userService";
import { User } from "./types/user";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;

    await createUser({ name });
    setName("");
    fetchUsers();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>User Management</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <button onClick={handleCreate}>Add</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        users.map((user) => (
          <div key={user.id}>
            {user.id} - {user.name}
          </div>
        ))
      )}
    </div>
  );
}