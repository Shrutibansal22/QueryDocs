"use client";
import styles from "./profile.module.css";
import axios from 'axios';
import { useRouter } from "next/navigation";
function Profile() {

  const router = useRouter();

    const OnLogout = async (e) => { 
        e.preventDefault();
        const response = await axios.get('/api/users/logout');

        if (response.status === 200) {
            router.push('/login');
        }
    }

  return (
    <div className={styles.background}>
      <div className={styles.signupContainer}>
        <h2>Welcome to your profile</h2>

        <form onSubmit={OnLogout}>
          <button type="submit" className={styles.signupBtn}>
            Logout
          </button>
        </form>

      </div>
    </div>
  );
}


export default Profile;