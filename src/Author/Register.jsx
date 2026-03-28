import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const changeData = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios.post("https://quillhub-backend-latest-2.onrender.com/users/register", {
      ...details,
      role: "author" 
    })
    .then(() => {
      alert("Registered Successfully ");
      navigate("/login");
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        alert(err.response.data);
      } else {
        alert("Registration failed ");
      }

    });
  };

  return (
    <section className="container p-5 shadow col-lg-6">

      <h2 className="text-center text-primary">
        Register as Author
      </h2>

      <form onSubmit={submitHandler}>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="form-control mb-3"
          onChange={changeData}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="form-control mb-3"
          onChange={changeData}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={changeData}
          required
        />

        <input
          type="submit"
          value="Register"
          className="form-control text-bg-primary"
        />

      </form>

    </section>
  );
};

export default Register;