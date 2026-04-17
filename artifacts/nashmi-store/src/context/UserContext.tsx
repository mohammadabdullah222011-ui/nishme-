import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { api, type ApiUser } from "@/lib/api";

export type UserRole = "admin" | "user";

export interface UserProfile {
  id?: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
}

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

function toProfile(u: ApiUser): UserProfile {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    phone: "",
    role: u.role === "admin" ? "admin" : "user",
    avatar: u.name[0].toUpperCase(),
  };
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const token = localStorage.getItem("nashmi_token");
    if (token) {
      api.me()
        .then((u) => setUser(toProfile(u)))
        .catch(() => localStorage.removeItem("nashmi_token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { token, user: u } = await api.login(email, password);
    localStorage.setItem("nashmi_token", token);
    setUser(toProfile(u));
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const { token, user: u } = await api.register(name, email, password);
    localStorage.setItem("nashmi_token", token);
    setUser(toProfile(u));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("nashmi_token");
    setUser(null);
  }, []);

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, login, register, logout, updateProfile, isAdmin: user?.role === "admin" }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
