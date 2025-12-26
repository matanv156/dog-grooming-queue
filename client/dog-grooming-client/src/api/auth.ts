import type { User } from "../types/User";
import api from "./base";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  username: string;
  token: string;
}

const controllerPath = "Auth";

export const login = async (
  user: LoginRequest
): Promise<AuthResponse | null> => {
  try {
    const res = await api.post<AuthResponse>(`${controllerPath}/login`, user);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.username);

    return res.data;
  } catch (err: any) {
    console.error(
      "Failed to login:",
      err.response?.data?.message || err.message
    );
    return err;
  }
};

export const register = async (user: RegisterRequest) => {
  try {
    const res = await api.post(`${controllerPath}/register`, user);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.username);

    return res;
  } catch (err: any) {
    console.error(
      "Failed to register:",
      err.response?.data?.message || err.message
    );
    return err;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};
