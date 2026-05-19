import { useState } from "react";

import API from "../../services/api";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./BookService.css";

import Navbar from "../../components/Common/Navbar";
import Sidebar from "../../components/Common/Sidebar";

const BookService = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const selectedService =
    location.state?.service ||

    {};


  const [formData, setFormData] =
    useState({

      fullName: "",

      phone: "",

      address: "",

      city: "",

      pincode: "",

      landmark: "",

      bookingDate: "",

      bookingTime: "",

      notes: "",

      latitude: "",

      longitude: "",
    });


  const [loading, setLoading] =
    useState(false);


  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };


  // GET CURRENT LOCATION

  const useCurrentLocation = () => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setFormData((prev) => ({

          ...prev,

          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude,
        }));

        alert(
          "Current GPS Location Added"
        );
      },

      (error) => {

        console.log(error);

        alert(
          "Location Permission Denied"
        );
      }
    );
  };


  // BOOK SERVICE

  const handleBooking = async (
    e
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const userInfo = JSON.parse(
        localStorage.getItem(
          "userInfo"
        )
      );

      const bookingData = {

        userId:
          userInfo._id,

        serviceId:selectedService._id,  

        serviceName:
          selectedService.name ,

        fullName:
          formData.fullName,

        phone:
          formData.phone,

        address:
          formData.address,

        city:
          formData.city,

        pincode:
          formData.pincode,

        landmark:
          formData.landmark,

        bookingDate:
          formData.bookingDate,

        bookingTime:
          formData.bookingTime,

        notes:
          formData.notes,

        location: {

          latitude:
            formData.latitude,

          longitude:
            formData.longitude,
        },

        status: "pending",
      };


      const response =
        await API.post("/bookings", bookingData, 

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      console.log(
        response.data
      );

      alert(
        "Booking Request Sent Successfully"
      );

      navigate(
        "/user-my-bookings"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Booking Failed"
      );

    } finally {

      setLoading(false);
    }
  };


  return (

    <>
      <Navbar />

      <Sidebar />

      <div className="book-service-page">

        <h1 className="book-service-title">
          Book Land Service
        </h1>

        <p className="book-service-subtitle">
          Fill your booking details.
        </p>


        {/* SELECTED SERVICE */}

        <div className="selected-service-card">

          <h2>
            Selected Service
          </h2>

          <p>
            {selectedService.name}
          </p>

        </div>


        {/* BOOKING FORM */}

        <form
          onSubmit={handleBooking}
          className="booking-form"
        >

          <input
            type="text"

            name="fullName"

            placeholder="Full Name"

            value={
              formData.fullName
            }

            onChange={handleChange}

            required
          />

          <input
            type="tel"

            name="phone"

            placeholder="Phone Number"

            value={
              formData.phone
            }

            onChange={handleChange}

            required
          />

          <textarea
            name="address"

            placeholder="Full Service Address"

            value={
              formData.address
            }

            onChange={handleChange}

            required
          />

          <input
            type="text"

            name="city"

            placeholder="City"

            value={
              formData.city
            }

            onChange={handleChange}

            required
          />

          <input
            type="text"

            name="pincode"

            placeholder="Pincode"

            value={
              formData.pincode
            }

            onChange={handleChange}

            required
          />

          <input
            type="text"

            name="landmark"

            placeholder="Nearby Landmark"

            value={
              formData.landmark
            }

            onChange={handleChange}
          />

          <input
            type="date"

            name="bookingDate"

            value={
              formData.bookingDate
            }

            onChange={handleChange}

            required
          />

          <input
            type="time"

            name="bookingTime"

            value={
              formData.bookingTime
            }

            onChange={handleChange}

            required
          />

          <textarea
            name="notes"

            placeholder="Additional Notes"

            value={
              formData.notes
            }

            onChange={handleChange}
          />


          {/* GPS BUTTON */}

          <button
            type="button"

            onClick={
              useCurrentLocation
            }

            className="location-btn"
          >
            Use Current GPS Location
          </button>


          {/* SUBMIT BUTTON */}

          <button
            type="submit"

            disabled={loading}

            className="submit-btn"
          >

            {
              loading
                ? "Booking..."
                : "Send Booking Request"
            }

          </button>

        </form>

      </div>
    </>
  );
};

export default BookService;