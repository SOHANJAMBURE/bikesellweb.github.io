import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const VerifyBooking = () => {
  
  const [booking, setBooking] = useState([]);

  const { bookingId } = useParams();
  const [bookingStatus, setBookingStatus] = useState([]);

  const [updateBookingStatus, setUpdateBookingStatus] = useState({
    bookingId: "",
    status: "",
  });

  updateBookingStatus.bookingId = bookingId;

   const retrieveAllBookingStatus = async () => {
    const response = await axios.get("http://localhost:8282/api/book/bike/fetch/status");
    return response.data;
  };


  useEffect(() => {
    const getBooking = async () => {
      const b= await retrieveBooking();
      if (b) {
        setBooking(b);
      }
    };

    const getAllBookingStatus = async () => {
      const allBookingStatus = await retrieveAllBookingStatus();
      if (allBookingStatus) {
        setBookingStatus(allBookingStatus);
      }
    };

    getAllBookingStatus();
    getBooking();
  }, []);

  const retrieveBooking = async () => {
    const response = await axios.get(
      "http://localhost:8282/api/book/bike/fetch/bookingId?id="+bookingId
    );
    console.log(response.data);
    return response.data;
  };

  const handleBookingInput = (e) => {
    setUpdateBookingStatus({ ...updateBookingStatus, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate();


  const updateBikeBookingStatus = (e) => {

    e.preventDefault();

    console.log(updateBookingStatus);
    
    fetch("http://localhost:8282/api/book/bike/update/status", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBookingStatus),
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);
        navigate("/admin/bike/booking/all");
        console.log(res);
              toast.sucess(res, {
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
    
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Booking</h5>
          </div>
          <div className="card-body text-color">
            <div className="mb-3 mt-1">
                <label htmlFor="quantity" className="form-label">
                  <b>Booking Id</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                 
                  value={booking.bookingId}
                  required
                  readOnly
                />
              </div>
              
             <div className="mb-3 mt-1">

               <form>
                    
              <div class="col">
                
                <select
                  name="status"
                  onChange={handleBookingInput}
                  className="form-control"
                >
                  <option value="">Status</option>

                  {bookingStatus.map((status) => {
                    return (
                      <option value={status}> {status} </option>
                    );
                  })}
                </select>
              </div>
              
              
              <div class="col">
                <button
                  type="submit"
                  class="btn bg-color btn-sm custom-bg-text mt-4"
                  onClick={updateBikeBookingStatus}
                >
                  Update
                </button>
              </div>
            </form>  
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyBooking;
