import React from "react";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [alert, setAlert] = React.useState("");
  const [register, setRegister] = React.useState({
    email: "",
    password: "",
    repassword: "",
    name: "",
    mobile: "",
  }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMobile = (e) => {
    const { value } = e.target;
    // Replace String with Regex
    var numbers = value.replace(/\D/g, "")
    if (value.length <= 10) {
      setRegister({ ...register, mobile: numbers });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      register.email !== "" &&
      register.password !== "" &&
      register.name !== ""
    ) {
      if (register.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        if (register.password === register.repassword) {
          if (register.mobile.length === 10) {
            axios
              .post("https://backend-hyug.onrender.com/auth/register", register)
              .then((res) => {
                setAlert(res.data.message);
              })
              .then((err) => {
                setAlert(err.data.message);
                console.log(err);
              });
          } else {
            setAlert("Invalid Mobile Number");
          }
        } else {
          setAlert("Passwords do not match");
        }
      } else {
        setAlert("Invalid Email");
      }
    } else {
      setAlert("Please fill all the fields");
    }
  };

  return (
    <main
      className="form-signin text-center mt-5"
      style={{ overflow: "hidden" }}
    >
      
      <form>
        <img className="mb-4" src={logo} alt="logo" height={50} />
        <h3 className="h3 mb-3 fw-normal">Create New User</h3>
        <div className="row">
          <div className="col-md-4 offset-4">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={register.name}
              className="form-control"
              placeholder="Full Name"
            />
            <br />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={register.email}
              className="form-control"
              placeholder="abc@mail.com"
              required
            />
            <br />
            <input
              type="text"
              name="mobile"
              onChange={handleMobile}
              value={register.mobile}
              className="form-control"
              placeholder="Mobile Number"
            />
            <br />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={register.password}
              className="form-control"
              placeholder="Password"
            />
            <br />
            <input
              type="password"
              name="repassword"
              onChange={handleChange}
              value={register.repassword}
              className="form-control"
              placeholder="Re-enter Password"
            />
            <p className="mt-5" style={{ color: "red" }}>
              {alert}
            </p>
            <button
              onClick={handleSubmit}
              className="w-100 btn btn-primary"
              type="submit"
            >
              Register Now
            </button>
            <button
              type="button"
              className="btn btn-light mt-4"
              onClick={() => navigate("/login")}
            >
              Already registered?
            </button>
          </div>
        </div>
        <p className="mt-5 mb-3 text-muted">© Book My Ticket</p>
      </form>
    </main>
  );
}


//{JSON.stringify(register)}