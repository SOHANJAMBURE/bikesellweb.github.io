import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBikeForm = () => {
  
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-customer"));

  const [bike, setBike] = useState({
    name: "",
    userId: "",
    modelNo: "",
    registrationNo: "",
    company: "",
  });

  const handleInput = (e) => {
    setBike({ ...bike, [e.target.name]: e.target.value });
  };

  const saveBike = () => {
    const formData = new FormData();
    formData.append("name", bike.name);
    formData.append("userId", user.id);
    formData.append("modelNo", bike.modelNo);
    formData.append("registrationNo", bike.registrationNo);
    formData.append("company", bike.company);

    axios
      .post("http://localhost:8282/api/bike/add", formData)
      .then((result) => {
        result.json().then((res) => {
          console.log(res);
  
          console.log(res.responseMessage);
             
          navigate("/home");
                
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
            <h5 className="card-title">Add Bike</h5>
          </div>
          <div className="card-body text-color">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Bike Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleInput}
                  value={bike.name}
                  required ="true"
                />
              </div>
              
              <div className="mb-3 mt-1">
                <label htmlFor="company" className="form-label">
                  <b>Company</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  name="company"
                  onChange={handleInput}
                  value={bike.company}
                  required ="true"
                />
              </div>

              <div className="mb-3 mt-1">
                <label htmlFor="quantity" className="form-label">
                  <b>Model Number</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="modelNo"
                  name="modelNo"
                  onChange={handleInput}
                  value={bike.modelNo}
                  required ="true"
                />
              </div>

              <div className="mb-3 mt-1">
                <label htmlFor="registrationNo" className="form-label">
                  <b>Registration Number</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="registrationNo"
                  name="registrationNo"
                  onChange={handleInput}
                  value={bike.registrationNo}
                  required ="true"
                />
              </div>

              
              <button
                type="submit"
                className="btn bg-color custom-bg-text"
                onClick={saveBike}
              >
                Add Bike
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBikeForm;
