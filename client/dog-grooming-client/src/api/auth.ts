import type { User } from "../types/User";
import api from "./base";

export interface AuthResponse {
  username: string;
  token: string;
}

const controllerPath = "Auth";

export const login = async (
  username: string,
  password: string
): Promise<AuthResponse | null> => {
  try {
    const res = await api.post<AuthResponse>(`${controllerPath}/login`, {
      username,
      password,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.username);

    return res.data;
  } catch (err: any) {
    console.error(
      "Failed to login:",
      err.response?.data?.message || err.message
    );
    return null;
  }
};

export const register = async (user: User): Promise<AuthResponse | null> => {
  try {
    const res = await api.post<AuthResponse>(
      `${controllerPath}/register`,
      user
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.username);

    return res.data;
  } catch (err: any) {
    console.error(
      "Failed to register:",
      err.response?.data?.message || err.message
    );
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};
