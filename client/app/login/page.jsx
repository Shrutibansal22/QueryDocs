"use client";
import { useState } from "react";
import styles from "./login.module.css";

const defaultData = { username: "", password: "" };

function Login() {
  const [data, setData] = useState(defaultData);

  const onValueChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onLogin = (e) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      alert("Please fill all mandatory fields");
      return;
    }

    console.log("Registered Data:", data);
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