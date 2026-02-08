"use client";
import { useState } from "react";
import styles from "./register.module.css";
import axios from 'axios';
import {useRouter} from "next/navigation";

const defaultData = { name: "", username: "", password: "" };

function Register() {
  const [data, setData] = useState(defaultData);
  const router = useRouter();

  const onValueChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onRegister = async(e) => {
    e.preventDefault();

    if (!data.name || !data.username || !data.password) {
      alert("Please fill all mandatory fields");
      return;
    }

    // Api Call
    try{
      const response = await axios.post("api/users/register", data);
      setData(defaultData);

      if(response.status === 200){
        router.push("/login");
      }
    }
    catch (error){
      console.log(error);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.signupContainer}>
        <h2>Create Account</h2>

        <form onSubmit={onRegister}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={data.name}
              onChange={onValueChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={onValueChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={onValueChange}
            />
          </div>

          <button type="submit" className={styles.signupBtn}>
            Sign Up
          </button>
        </form>

        <p className={styles.loginText}>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}
export default Register;