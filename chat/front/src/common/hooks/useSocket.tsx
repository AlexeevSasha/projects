import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useUserStore } from "@/modules/user/user.store";

const getSocket = (id: string) =>
  io(process.env.BASE_URL, {
    auth: { id },
  });

export const useSocket = () => {
  const user = useUserStore((state) => state.user);
  const [socket, setSocket] = useState<Socket>(null);

  useEffect(() => {
    if (!user?.id) {
      socket?.disconnect();
      setSocket(null);
    } else {
      const socketIo = getSocket(user.id);
      socketIo.connect();
      setSocket(socketIo);
    }
  }, [user?.id]);

  return { socket };
};
