import { Link } from "react-router-dom";
import { paths } from "@/common/constants/paths";
import { SignUpForm } from "@/modules/form/components/auth/SignUpForm";
import styles from "./auth.module.scss";

export const SignUp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Sign Up</h2>
        <SignUpForm />
        <div className={styles.link}>
          Got an account?&nbsp;&nbsp;&nbsp;<Link to={paths.login}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};
