import axios from "axios";
import { User, CreateUserRequest } from "../types/user";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data;
};

export const createUser = async (
  data: CreateUserRequest
): Promise<User> => {
  const response = await api.post("/users", data);
  return response.data;
};