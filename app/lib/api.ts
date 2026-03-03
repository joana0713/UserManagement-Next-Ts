import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

export const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}`);
};

export const bulkDeleteUsers = async (ids: number[]) => {
  await api.delete("/users", { data: { ids } });
};

export const createUser = async (user: { name: string; email: string }) => {
  const { data } = await api.post("/users", user);
  return data;
};

export const updateUser = async (id: number, user: any) => {
  const { data } = await api.put(`/users/${id}`, user);
  return data;
};