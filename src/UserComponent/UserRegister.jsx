import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const UserRegister = () => {
  
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
    age:"",
    sex:""
  });

  if(document.URL.indexOf("admin") != -1) {
    user.role = "admin";
  }  else if (document.URL.indexOf("customer") != -1) {
    user.role = "customer";
  }  

  console.log("ROLE FECTHED : "+user.role)


  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [genders, setGenders] = useState([]);

  const retrieveAllGenders = async () => {
    const response = await axios.get("http://localhost:8282/api/user/gender");
    return response.data;
  };

  const [errors, setErrors] = useState({});
    const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!user.firstName) {
      errors.firstName = "First name is required";
      isValid = false;
    }

    if (!user.lastName) {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    if (!user.emailId) {
      errors.emailId = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.emailId)) {
      errors.emailId = "Email address is invalid";
      isValid = false;
    }

    if (!user.contact) {
      errors.contact = "contact is required";
      isValid = false;
    } else if (user.contact.length >10) {
      errors.contact = "Contact must be 10 digit";
      isValid = false;
    }
    else if (user.contact.length <10) {
      errors.contact = "Contact must be 10 digit";
      isValid = false;
    }
    
    if (!user.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (user.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    }
    if (!user.street) {
      errors.street = "Street is required";
      isValid = false;
    }

    if (!user.city) {
      errors.city = "City is required";
      isValid = false;
    }

    if (!user.pincode) {
      errors.pincode = "Pincode is required";
      isValid = false;
    }

    setErrors(errors);

    return isValid;
  };
  
  useEffect(() => {
    const getAllGenders = async () => {
      const allGenders = await retrieveAllGenders();
      if (allGenders) {
          setGenders(allGenders.genders);
      }
    };

    getAllGenders();
  }, []);


  const saveUser = (event) => {
    event.preventDefault();
    if (validateForm()) {
    fetch("http://localhost:8282/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((result) => {
      
      toast.success("Registered Successfully!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      
      });
     
      result
        .json()
        .then((res) => {
          console.log("response", res);
          
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="card form-card border-color text-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Register {user.role}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              
              <div className="mb-3 text-color">
                <label htmlFor="title" className="form-label">
                  <b> First Name</b>
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  onChange={handleUserInput}
                  value={user.firstName}                
                />   {errors.firstName && (
                  <div className="text-danger">{errors.firstName}</div>
                )}
              </div>

              <div className="mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>Last Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  onChange={handleUserInput}
                  value={user.lastName}
                />
                 {errors.lastName && (
                  <div className="text-danger">{errors.lastName}</div>
                )}
              </div>

              <div className="mb-3 text-color">
                <b>
                  <label className="form-label">Email Id</label>
                </b>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  value={user.emailId}
                />
                  {errors.emailId && (
              <div className="text-danger">{errors.emailId}</div>
            )}
              </div>

              <div className="mb-3 mt-1">
                <label htmlFor="quantity" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  value={user.password}
                />
              </div>

              <div className="mb-3 text-color">
                <label htmlFor="sex" className="form-label">
                  <b>User Gender</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="sex"
                >
                  <option value="0">Select Gender</option>

                  {genders.map((gender) => {
                    return (
                      <option value={gender}> {gender} </option>
                    );
                  })}

                </select>
              </div>


              <div className="mb-3">
                <label htmlFor="contact" className="form-label">
                  <b>Contact No</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="contact"
                  name="contact"
                  onChange={handleUserInput}
                  value={user.contact}
                />
                { errors.contact && (
              <div className="text-danger">{ errors.contact}</div>
            )}
              </div>

              <div className="mb-3">
                <label htmlFor="contact" className="form-label">
                  <b>Age</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  onChange={handleUserInput}
                  value={user.age}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  <b>Address</b>
                </label>
                <textarea
                  className="form-control"
                  id="street"
                  name="street"
                  rows="3"
                  onChange={handleUserInput}
                  value={user.street}
                />
                   {errors.street && (
              <div className="text-danger">{errors.street}</div>
            )}
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  <b>City</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  onChange={handleUserInput}
                  value={user.city}
                />
                  {errors.city && (
              <div className="text-danger">{errors.city}</div>
            )}
              </div>

              <div className="mb-3">
                <label htmlFor="pincode" className="form-label">
                  <b>Pincode</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  onChange={handleUserInput}
                  value={user.pincode}
                />
                 {errors.pincode && (
              <div className="text-danger">{errors.pincode}</div>
              )}
              </div>

              <input
                type="submit"
                className="btn bg-color custom-bg-text"
                value="Register User"
              />

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
