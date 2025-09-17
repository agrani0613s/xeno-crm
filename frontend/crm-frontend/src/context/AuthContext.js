import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Set axios defaults once (baseURL + credentials)
  axios.defaults.baseURL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";
  axios.defaults.withCredentials = true;

  // ✅ Fetch current user on load
  useEffect(() => {
    axios
      .get("/auth/user")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  // ✅ Login (redirect to Google OAuth)
  const login = () => {
    window.open(`${axios.defaults.baseURL}/auth/google`, "_self");
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await axios.post("/auth/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
