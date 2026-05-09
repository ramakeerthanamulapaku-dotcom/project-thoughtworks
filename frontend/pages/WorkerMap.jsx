import { useEffect } from "react";
import { io } from "socket.io-client";
import L from "leaflet";

const socket = io("http://localhost:5000");

export default function WorkerMap() {
  useEffect(() => {
    // 📍 Create map
    const map = L.map("map").setView([17.385, 78.4867], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "OpenStreetMap",
    }).addTo(map);

    // 📍 Initial marker
    const marker = L.marker([17.385, 78.4867]).addTo(map);

    // 👇 Listen for worker updates
    socket.on("track-worker-worker1", (data) => {
      const { lat, lng } = data;

      marker.setLatLng([lat, lng]);
      map.panTo([lat, lng]);
    });

  }, []);

  return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
}