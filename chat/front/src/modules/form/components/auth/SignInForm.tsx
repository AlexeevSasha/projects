import styles from "./auth.form.module.scss";
import { useForm } from "@/modules/form/hooks/useForm";
import { signInValidation } from "@/modules/form/validation/auth/signIn.validation";
import { Input } from "@/common/ui/Input/Input";
import { Button } from "@/common/ui/Button/Button";
import { IAuthSighIn } from "@/modules/auth/interfaces/auth";
import { useUserStore } from "@/modules/user/user.store";
import { Loader } from "@/common/components/Loader/Loader";
import { useState } from "react";

export const SignInForm = () => {
  const signIn = useUserStore((state) => state.signIn);
  const [loading, setLoading] = useState(false);
  const { values, handleChange, handleSubmit, errors } = useForm<IAuthSighIn>({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: signInValidation,
    onSubmit: (values) => {
      setLoading(true);
      signIn(values).finally(() => setLoading(false));
    },
  });
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input error={errors?.email || ""} onChange={handleChange} value={values.email} id={"email"} name={"email"} placeholder={"Email"} />
      <Input
        error={errors?.password || ""}
        value={values.password}
        onChange={handleChange}
        id={"password"}
        name={"password"}
        type={"password"}
        placeholder={"Password"}
      />
      <Button disabled={loading} size={"lg"} type={"submit"}>
        Send
      </Button>
      <Loader loading={loading} />
    </form>
  );
};
