import type { NextPage } from "next";
import Link from "next/link";
import styles from "../../styles/Signin.module.css";
import { useRouter } from "next/router";
import { getLanguage } from "../../../public/locales/lang";

const Signin: NextPage = () => {
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div className={styles.wrapper} />
      <div className={styles.content}>
        <div className={styles.cardWrapper}>
          <div className={styles.cardContent}>
            <VerifyContent />
          </div>
        </div>
      </div>
      <img
        src="/login_pattern.svg"
        alt="Pattern Background"
        {...{ layout: "fill" }}
        className={styles.styledPattern}
      />
    </div>
  );
};

export default Signin;

const VerifyContent = () => {
  const { locale } = useRouter();
  const lang = getLanguage(locale);

  return (
    <>
      <div className="page">
        <div className="verify-request">
          <div className="card">
            <h1>{lang.auth.checkEmail}</h1>
            <p>{lang.auth.successLink}</p>

            <Link className={`site ${styles.back}`} href="/">
              {lang.auth.returnSite}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
