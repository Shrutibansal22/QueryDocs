"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserData } from "@/context/UserContext";
import styles from "../../login.module.css";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const { email, verifyUser, btnLoading } = UserData();
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyUser(otp, router); 
  };

  return (
    <div className={styles.background}>
      <div className={styles.signupContainer}>
        <h2>Verify OTP</h2>
        {/* We show the email so the user knows which account is being verified */}
        <p style={{color: 'gray', marginBottom: '10px'}}>Verifying: {email}</p>

        <form onSubmit={submitHandler}>
          <div className={styles.inputGroup}>
            <input
              type="number"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button className={styles.signupBtn} disabled={btnLoading}>
            {btnLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}