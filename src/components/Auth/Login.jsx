import React, { useState } from "react";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`https://backend-hyug.onrender.com/auth/login`, login)  // Updated API endpoint if necessary
      .then((res) => {
        setAlert(res.data.message);
        if (res.data.message === "Logged In Successfully") {
          props.setUser({
            email: res.data.email,
          });
          props.setIsLoggedIn(true);
          localStorage.setItem("token", res.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setAlert(err.response.data.message || "An error occurred. Please try again.");
      });
  };

  return (
    <main className="form-signin text-center mt-5" style={{ overflow: "hidden" }}>
      <form>
        <img className="mb-4" src={logo} alt="logo" height={50} />
        <h3 className="h3 mb-3 fw-normal">Sign In</h3>
        <div className="row">
          <div className="col-md-4 offset-4">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={login.email}
              className="form-control"
              placeholder="abc@mail.com"
            />
            <br />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={login.password}
              className="form-control"
              placeholder="Password"
            />
            <p className="mt-5" style={{ color: "red" }}>
              {alert}
            </p>
            <button
              onClick={handleSubmit}
              className="w-100 btn btn-primary"
              type="submit"
            >
              Sign in
            </button>
            <button
              type="button"
              className="btn btn-light mt-4"
              onClick={() => navigate("/register")}
            >
              Not yet registered?
            </button>
          </div>
        </div>
        <p className="mt-5 mb-3 text-muted">© Book My Ticket</p>
      </form>
    </main>
  );
};

export default Login;
