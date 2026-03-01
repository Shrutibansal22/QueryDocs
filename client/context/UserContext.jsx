"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const server = process.env.NEXT_PUBLIC_SERVER;
console.log("Backend URL is:", server);
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  
  const router = useRouter();

  async function loginUser(email) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, { email });

      toast.success(data.message);
      localStorage.setItem("verifyToken", data.verifyToken);
      router.push("/login/otp/verify"); 
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      setBtnLoading(false);
    }
  }

  const verifyUser = async (otp, router) => {
  setBtnLoading(true);
  try {
    const verifyToken = localStorage.getItem("verifyToken");
    console.log("Verifying OTP with verifyToken:", verifyToken ? "EXISTS" : "MISSING");

    if (!verifyToken) {
      throw new Error("Verify token not found. Please login again.");
    }

    console.log("Calling verify endpoint with OTP:", otp);
    const { data } = await axios.post(`${server}/api/user/verify`, {
      otp,
      verifyToken,
    });

    console.log("Verify response:", data);

    if (!data.token) {
      throw new Error("No token received from server");
    }

    localStorage.setItem("token", data.token);
    console.log("Token saved to localStorage:", data.token);
    
    localStorage.removeItem("verifyToken");
    setIsAuth(true);
    setUser(data.user);
    
    toast.success(data.message || "Login successful!");
    router.push("/chat");
  } catch (error) {
    console.error("Verify error:", error);
    const errorMsg = error.response?.data?.message || error.message || "Verification failed";
    toast.error(errorMsg);
  } finally {
    setBtnLoading(false);
  }
};

  async function fetchUser() {
    if (typeof window === "undefined") return;
    
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: { token },
      });

      setIsAuth(true);
      setUser(data);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  const logoutHandler = () => {
    localStorage.clear();
    toast.success("Logged out");
    setIsAuth(false);
    setUser([]);
    router.push("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loginUser,
        btnLoading,
        isAuth,
        setIsAuth,
        user,
        verifyUser,
        loading,
        logoutHandler,
        email,
        setEmail,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);