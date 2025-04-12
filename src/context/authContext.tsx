import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/utils/localStorage";

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: {
    zipcode: string;
    address: string;
    number: string;
  };
}

interface AuthContextType {
  isAuth: boolean;
  user: User | null;
  setIsAuth: (isAuth: boolean) => void;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  user: null,
  setIsAuth: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUser(currentUser as User);
        setIsAuth(true);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser as User);
      setIsAuth(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, setIsAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
