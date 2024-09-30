import { useEffect } from "react";
import { CreateConnection } from "./Chat.tsx";
import { showNotification } from "./notifications.tsx";

export function useChatRoom({
  serverUrl,
  roomId,
}: {
  serverUrl: string;
  roomId: string;
}) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId,
    };
    const connection = CreateConnection(options);
    connection.connect();
    connection.on("message", (msg) => {
      showNotification("New message: " + msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}
