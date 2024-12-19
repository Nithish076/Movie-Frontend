import React from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Slider from "./components/Slider/Slider";
import Movies from "./components/Movies/Movies";
import Footer from "./components/Footer/Footer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import BookTicket from "./components/book/BookTicket";
import axios from "axios";
import MyBookings from "./components/bookings/MyBookings";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setIsLoggedIn] = React.useState(false);

  // Set Movies
  const [movies, setMovies] = React.useState([]);
  const [user, setUser] = React.useState({
    name: "",
    email: "",
  });

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://backend-hyug.onrender.com/auth/validateToken?token=${token}`)
      .then((res) => {
        if (res.data.isLogged) {
          console.log(res.data);
          setIsLoggedIn(true);
          setUser({
            email: res.data.email,
          });
        } else {
          setIsLoggedIn(false);
          console.log("Failed to Authenticate");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  async function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/")
  }

  return (
    <>
      <Navbar loggedIn={loggedIn} user={user} logout={logout} />
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Slider />
              <Movies loggedIn={loggedIn} setMovies={setMovies} />
            </>
          }
        />
        <Route
          path="login"
          element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
        />
        <Route path="register" element={<Register />} />
        <Route path="mybookings" element={<MyBookings user={user} />} />
        <Route
          path="bookTicket"
          element={<BookTicket user={user} Movie={movies} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
