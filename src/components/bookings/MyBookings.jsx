import React from "react";
import axios from "axios";

export default function MyBookings(props) {
  const [mybooking, setMyBookings] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`https://backend-hyug.onrender.com/ticket/retrieveAll/${props.user.email}`)
      .then((res) => {
        setMyBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container mt-5">
      <div className="row">
        <h1 className="text-center">My Bookings</h1>
        {mybooking.map((booking) => {
          return (
            <div className="col-4">
              <div className="card mb-3 p-3">
                <h4 className="text-center">{booking.Movie}</h4>
                <p>
                  <b>Date:</b> {booking.Date}
                  <br />
                  <b>No of Tickets:</b>
                  {booking.NT}
                  <br />
                  <b>Cinema Hall:</b>
                  {booking.Cinema_Hall}
                  <br />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
