import { useEffect } from "react";

import socket from "../../socket/socket";

const WorkerLocationTracker = () => {

  useEffect(() => {

    const worker =
      JSON.parse(
        localStorage.getItem("userInfo")
      );

    const activeBooking =
      JSON.parse(
        localStorage.getItem(
          "activeBooking"
        )
      );

    if (!worker || !activeBooking) {
      return;
    }

    // JOIN ROOM

    socket.emit("join-booking-room", {
      bookingId: activeBooking._id,
    });

    // START TRACKING

    const watchId =
      navigator.geolocation.watchPosition(

        (position) => {

          const liveLocation = {

            bookingId:
              activeBooking._id,

            workerId:
              worker._id,

            latitude:
              position.coords.latitude,

            longitude:
              position.coords.longitude,

            timestamp:
              new Date().toISOString(),
          };

          // SEND LIVE LOCATION

          socket.emit(
            "worker-location-update",
            liveLocation
          );

          // SAVE CURRENT LOCATION

          localStorage.setItem(
            "workerLiveLocation",

            JSON.stringify(
              liveLocation
            )
          );
        },

        (error) => {

          console.log(
            "Location Error:",
            error
          );
        },

        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );

    return () => {

      navigator.geolocation.clearWatch(
        watchId
      );
    };

  }, []);

  return null;
};

export default WorkerLocationTracker;