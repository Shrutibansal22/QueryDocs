"use client";
import styles from "./profile.module.css";

function Profile() {

  const onLogout = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.background}>
      <div className={styles.signupContainer}>
        <h2>Welcome to your profile</h2>

        <form onSubmit={onLogout}>
          <button type="submit" className={styles.signupBtn}>
            Logout
          </button>
        </form>

      </div>
    </div>
  );
}


export default Profile;