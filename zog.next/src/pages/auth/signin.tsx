import { signIn, useSession } from "next-auth/react";
import styles from "../../styles/Signin.module.css";
import { useEffect, useState } from "react";
import { existsUserByEmail } from "../../api/user";
import { useRouter } from "next/router";
import { validateEmail } from "../../common/constants/validateEmail";
import { getLanguage } from "../../../public/locales/lang";

export default function SignIn() {
  const { data } = useSession();
  const { query, push, locale } = useRouter();
  const lang = getLanguage(locale);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (data?.user?.id) push("/");
  }, [data?.user?.id]);

  const handlerClick = async () => {
    if (!validateEmail(email)) return;
    const check = await existsUserByEmail(email);
    const redirect = !check ? { callbackUrl: `/${locale}/lk/profile` } : {};
    const partner = query?.partner ? String(query.partner) : "";
    signIn("email", { email, ...redirect }, { partner });
  };

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div className={styles.wrapper} />
      <div className={styles.content}>
        <div className={styles.cardWrapper}>
          <div className={styles.cardContent}>
            <label>
              Email
              <input
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.currentTarget.value.trim());
                }}
              />
            </label>
            <button onClick={handlerClick}>{lang.auth.sendLink}</button>
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
}
