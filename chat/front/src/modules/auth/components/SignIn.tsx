import { Link } from "react-router-dom";
import { paths } from "@/common/constants/paths";
import { SignInForm } from "@/modules/form/components/auth/SignInForm";

import styles from "./auth.module.scss";

export const SignIn = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Sign In</h2>
        <SignInForm />
        <div className={styles.link}>
          Don`t have an account yet?&nbsp;&nbsp;&nbsp;<Link to={paths.register}>Sign up</Link>
        </div>
      </div>
    </div>
  );
};
