import { useForm } from "@/modules/form/hooks/useForm";
import { signUpValidation } from "@/modules/form/validation/auth/signUp.validation";
import { Input } from "@/common/ui/Input/Input";
import { Button } from "@/common/ui/Button/Button";
import styles from "./auth.form.module.scss";
import { IAuthSighUp } from "@/modules/auth/interfaces/auth";
import { useUserStore } from "@/modules/user/user.store";
import { useState } from "react";
import { Loader } from "@/common/components/Loader/Loader";

export const SignUpForm = () => {
  const signUp = useUserStore((state) => state.signUp);
  const [loading, setLoading] = useState(false);
  const { values, handleChange, handleSubmit, errors } = useForm<IAuthSighUp>({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: signUpValidation,
    onSubmit: (values) => {
      setLoading(true);
      signUp(values).finally(() => setLoading(false));
    },
  });
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        id={"firstname"}
        name={"firstname"}
        placeholder={"Firstname"}
        value={values.firstname}
        onChange={handleChange}
        error={errors?.firstname || ""}
      />
      <Input
        id={"lastname"}
        name={"lastname"}
        placeholder={"Lastname"}
        value={values.lastname}
        onChange={handleChange}
        error={errors?.lastname || ""}
      />
      <Input id={"email"} name={"email"} placeholder={"Email"} value={values.email} onChange={handleChange} error={errors?.email || ""} />
      <Input
        id={"password"}
        name={"password"}
        type={"password"}
        placeholder={"Password"}
        value={values.password}
        onChange={handleChange}
        error={errors?.password || ""}
      />
      <Button disabled={loading} size={"lg"} type={"submit"}>
        Sing Up
      </Button>
      <Loader loading={loading} />
    </form>
  );
};
