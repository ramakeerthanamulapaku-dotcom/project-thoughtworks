import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function WorkerSimulator() {
  useEffect(() => {
    const workerId = "worker1";

    navigator.geolocation.watchPosition((pos) => {
      socket.emit("worker-location", {
        workerId,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  return <h2>Worker Tracking Active 📍</h2>;
}