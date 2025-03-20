import { useEffect, useRef } from "react";
import Peer from "peerjs";
import type { DataConnection } from "peerjs";
import type { PeerData } from "./HostPeerConnection";

interface UseFriendPeerConnectionProps {
  hostPeerId: string;
  onPeerId: (id: string) => void;
  onData: (data: PeerData) => void;
}

export function useFriendPeerConnection({
  hostPeerId,
  onPeerId,
  onData,
}: UseFriendPeerConnectionProps) {
  const peerRef = useRef<Peer | null>(null);
  const connectionRef = useRef<DataConnection | null>(null);

  useEffect(() => {
    // Only create a new peer if one doesn't exist
    if (!peerRef.current) {
      const peer = new Peer();
      peerRef.current = peer;

      peer.on("open", (id: string) => {
        onPeerId(id);
        console.log("Friend peer ID is: " + id);

        // Connect to host when we get our ID
        const conn = peer.connect(hostPeerId);
        conn.on("open", () => {
          console.log("Connected to host: " + hostPeerId);
          connectionRef.current = conn;

          conn.on("data", (data: unknown) => {
            if (isPeerData(data)) {
              onData(data);
            }
          });
        });
      });
    }

    return () => {
      // Only destroy the peer when the component is unmounted
      if (peerRef.current) {
        peerRef.current.destroy();
        peerRef.current = null;
      }
    };
  }, []);

  const send = (data: PeerData) => {
    if (connectionRef.current) {
      connectionRef.current.send(data);
    }
  };

  return { send };
}

function isPeerData(data: unknown): data is PeerData {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    "text" in data &&
    data.type === "circleText" &&
    typeof data.text === "string"
  );
}
