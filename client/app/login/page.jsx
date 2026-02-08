"use client";
import { useState } from "react";
import styles from "./login.module.css";
import axios from 'axios';
import {useRouter} from "next/navigation";
const defaultData = { username: "", password: "" };

function Login() {
  const [data, setData] = useState(defaultData);
  const router = useRouter();
  const onValueChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onLogin = async(e) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      alert("Please fill all mandatory fields");
      return;
    }

    // Api Call
    try{
      const response = await axios.post("api/users/login", data);
      setData(defaultData);

      if(response.status === 200){
        router.push("/profile");
      }
    }
    catch (error){
      console.log(error);
      
      if (error.response) {
        const errorMessage = error.response.data;
        
        if (errorMessage.includes("Username does not exist")) {
          alert("Username does not exist");
        } else if (errorMessage.includes("Incorrect Password")) {
          alert("Incorrect Password");
        } else {
          alert(errorMessage || "An error occurred. Please try again.");
        }
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.signupContainer}>
        <h2>Login</h2>

        <form onSubmit={onLogin}>

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
            Submit
          </button>
        </form>

        <p className={styles.loginText}>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}


export default Login;