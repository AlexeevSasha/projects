import { useSession } from "next-auth/react";
import JS from "./JS";

export const Me = () => {
  const session = useSession();
  return <JS data={session} />;
};
