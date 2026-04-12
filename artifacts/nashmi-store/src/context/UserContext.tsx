import { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "admin" | "user";

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
}

interface UserContextType {
  user: UserProfile | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = useCallback((email: string, name?: string) => {
    const isAdmin = email.toLowerCase().includes("admin") || email === "admin@nashmi.com";
    setUser({
      name: name || (isAdmin ? "Admin نشمي" : "مستخدم نشمي"),
      email,
      phone: "",
      role: isAdmin ? "admin" : "user",
      avatar: (name || email)[0].toUpperCase(),
    });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, updateProfile, isAdmin: user?.role === "admin" }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
