import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { Spin } from "antd";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      console.log({ user });
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        setIsLoading(false);
        navigate("/");
      }

      navigate("/login");
    });

    // clear function
    return () => {
      unsubscribed();
    };
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
}
