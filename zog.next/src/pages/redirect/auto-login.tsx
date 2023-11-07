import { useRouter } from "next/router";
import LoadingScreen from "../../components/AppAccess/LoadingScreen";
import { useEffect } from "react";
import { autoLogin } from "../../api/user";

export default function AutoLoginPage() {
  const { query, push } = useRouter();

  const login = async (email: string, isManual: string) => {
    const url = await autoLogin(email, isManual);
    url && push(url).then();
  };

  useEffect(() => {
    if (query.email) {
      login(query.email as string, (query?.manual as string) || "").then();
    }
  }, [query]);
  return <LoadingScreen />;
}
