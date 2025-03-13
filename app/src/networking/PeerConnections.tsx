import { useEffect } from "react";
import { useHostPeerConnection } from "./HostPeerConnection";
import { useFriendPeerConnection } from "./FriendPeerConnection";
import type { PeerData } from "./HostPeerConnection";

interface PeerConnectionsProps {
  isHost: boolean;
  hostPeerId: string;
  onPeerId: (id: string) => void;
  onData: (data: PeerData) => void;
}

function HostConnection({
  onPeerId,
  onData,
}: {
  onPeerId: (id: string) => void;
  onData: (data: PeerData) => void;
}) {
  const connection = useHostPeerConnection({
    onPeerId,
    onData,
  });
  return connection;
}

function FriendConnection({
  hostPeerId,
  onPeerId,
  onData,
}: {
  hostPeerId: string;
  onPeerId: (id: string) => void;
  onData: (data: PeerData) => void;
}) {
  const connection = useFriendPeerConnection({
    hostPeerId,
    onPeerId,
    onData,
  });
  return connection;
}

export default function PeerConnections({
  isHost,
  hostPeerId,
  onPeerId,
  onData,
}: PeerConnectionsProps) {
  useEffect(() => {
    // This effect is just for cleanup when switching between host and friend
  }, [isHost, hostPeerId]);

  if (isHost) {
    const connection = HostConnection({ onPeerId, onData });
    return { hostConnection: connection, friendConnection: null };
  } else if (hostPeerId) {
    const connection = FriendConnection({ hostPeerId, onPeerId, onData });
    return { hostConnection: null, friendConnection: connection };
  }

  return { hostConnection: null, friendConnection: null };
}
