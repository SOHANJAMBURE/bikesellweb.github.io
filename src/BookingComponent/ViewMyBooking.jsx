import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ViewMyBooking = () => {
  const [allBookings, setAllBookings] = useState([]);
  const navigate = useNavigate();

  const [updateBookingStatus, setUpdateBookingStatus] = useState({
    bookingId: "",
    status: "",
  });

  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  useEffect(() => {
    const getAllBooking = async () => {
      const allBooking = await retrieveAllBooking();
      if (allBooking) {
        setAllBookings(allBooking);
      }
    };

    getAllBooking();
  }, []);

  const retrieveAllBooking = async () => {
    const response = await axios.get(
      "http://localhost:8282/api/book/bike/fetch?userId="+user.id
    );
    console.log(response.data);
    return response.data;
  };

  const updateBikeBookingStatus = (bookingId) => {
    
    fetch("http://localhost:8282/api/book/bike/update/status", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          "bookingId":bookingId,
          "status":"Cancel"
        }
      ),
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);
         navigate("/user/bike/booking/service");
        console.log(res);
              toast.success(res, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
      });
      
    });

    window.location.reload(true);
    
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>My Bookings</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Booking Id</th>
                  <th scope="col">Bike Name</th>
                  <th scope="col">Company</th>
                  <th scope="col">Model No</th>
                  <th scope="col">Registration Number</th>
                  <th scope="col">Customer Number</th>
                  <th scope="col">Customer Contact</th>
                  <th scope="col">Booking Date</th>
                  <th scope="col">Booked Date</th>
                  <th scope="col">Booking Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((booking) => {
                  return (
                    <tr>
                    
                      <td>
                        <b>{booking.bookingId}</b>
                      </td>
                      <td>
                        <b>{booking.bikeName}</b>
                      </td>
                      <td>
                        <b>{booking.company}</b>
                      </td>
                      <td>
                        <b>{booking.modelNo}</b>
                      </td>

                      <td>
                        <b>{booking.registrationNo}</b>
                      </td>
                      <td>
                        <b>{booking.customerName}</b>
                      </td>
                      <td>
                        <b>{booking.customerContact}</b>
                      </td>

                      <td>
                        <b>{booking.bookingDate}</b>
                      </td>

                      <td>
                        <b>{booking.bookDate}</b>
                      </td>

                      <td>
                        <b>{booking.status}</b>
                      </td>

                      <td>
                        <button onClick={() => updateBikeBookingStatus(booking.id)}  className="btn btn-sm bg-color">Cancel Booking</button>
                      </td>
                      
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMyBooking;
