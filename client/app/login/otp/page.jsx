"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserData } from "@/context/UserContext"; 
import styles from "../login.module.css"; 

export default function OtpLogin() {
  const [emailInput, setEmailInput] = useState("");
  const { setEmail, loginUser, btnLoading } = UserData(); 
  const router = useRouter();

  const sendOtp = async () => {
    try {
      setEmail(emailInput);
      await loginUser(emailInput);
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Check backend connection"));
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.signupContainer}>
        <h2>Login with OTP</h2>

        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </div>

        <button className={styles.signupBtn} onClick={sendOtp} disabled={btnLoading}>
          {btnLoading ? "Sending..." : "Send OTP"}
        </button>
      </div>
    </div>
  );
}