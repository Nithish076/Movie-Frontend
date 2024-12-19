import axios from "axios";
import { useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";
import React from "react";
import logo from "../../assets/img/logo.svg";

export default function BookTicket(props) {
  const navigate = useNavigate();
  const [ticketNo, setTicketNo] = React.useState("");
  const [Ticket, setTicket] = React.useState({
    Movie: props.Movie.Series_Title,
    Date: "",
    Cinema_Hall: "",
    NT: "",
    Email: props.user.email,
  });
  const [showTiming, setShowTiming] = React.useState('');
  const showTimings = ['10:00 AM', '2:00 PM', '6:00 PM', '9:00 PM'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  React.useEffect(() => {
    if (!props.Movie.Series_Title) {
      navigate("/");
    }
  }, [props]);

  const handleSubmit = (e) => {
    if (
      Ticket.Date !== "" &&
      Ticket.Cinema_Hall !== "" &&
      Ticket.NT !== ""
    ) {
      axios
        .post("https://backend-hyug.onrender.com/ticket/issueTicket", Ticket)
        .then((res) => {
          if (res.data.status === "success") {
            setTicketNo(res.data.id);
            console.log(res.data);
            handlePayment(res.data.id, Ticket.NT);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please fill all the fields");
    }
  };

  const Razorpay = useRazorpay();

  const handlePayment = React.useCallback(async (no, nt) => {
    const id = ticketNo;
    const amount = nt + "50" + "00";

    console.log(id, amount);

    const options = {
      key: "rzp_test_vUctIod2Pv1rt1",
      amount: amount,
      currency: "INR",
      name: "Book My Ticket",
      description: "Movie Ticket Booking",
      order_id: id,
      image: logo,
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: props.user.name,
        email: props.user.email,
        contact: "9999999999",
      },
      notes: {
        address: "Book My Ticket Office",
        movie_name: Ticket.Movie,
        date: Ticket.Date,
      },
      theme: {
        color: "black",
      },
    };


    const rzpay = new Razorpay(options);
    rzpay.open();

    // Dismiss handler on pay button click
    document.getElementById("redesign-v15-cta").onclick = () => {
      rzpay.close();
    }

  }, [Razorpay]);

  return (
    <div className="container mt-5">
      <h4 className="text-center">Online Movie Ticket Booking</h4>
      <h6 className="text-center">{props.Movie.Series_Title}</h6>
      <div className="row">
        <div className="card">
          <div className="row">
            <div className="col-2 text-center">
              <img
                className="card-img-top"
                src={props.Movie.Poster_Link}
                alt="Card"
              />
            </div>
            <div className="col-10 p-3">
              <h5 className="card-title">{props.Movie.Series_Title}</h5>
              <div>
                <span class="badge text-bg-warning">
                  {props.Movie.Released_Year}
                </span>
                <span class="badge text-bg-primary">{props.Movie.Runtime}</span>
                <span class="badge text-bg-success">
                  {props.Movie.Meta_score}
                </span>
              </div>
              <div>
                <span class="badge text-bg-dark">
                  {props.Movie.IMDB_Rating} ⭐
                </span>
                <span class="badge text-bg-dark">
                  {props.Movie.No_of_Votes} Votes
                </span>
              </div>
              <div>
                <span class="badge text-bg-dark">{props.Movie.Genre}</span>
              </div>
              <p className="card-text mt-1" style={{ fontSize: "small" }}>
                {props.Movie.Overview}
              </p>
              <div className="row">
                <div className="col-3">
                  <select
                    class="form-select"
                    name="Cinema_Hall"
                    aria-label="Default select example"
                    onChange={handleChange}
                    value={Ticket.Cinema_Hall}
                  >
                    <option selected>Choose Cinema Hall</option>
                    <option value="PVR">
                      PVR
                    </option>
                    <option value="IMAX">IMAX</option>
                    <option value="INOX">INOX</option>
                    <option value="WS">WS</option>
                  </select>
                </div>
                <div className="col-3">
              <select
                className="form-select"
                name="ShowTiming"
                aria-label="Default select example"
                onChange={(e) => setShowTiming(e.target.value)}
                value={showTiming}
              >
                <option selected>Choose Show Timing</option>
                {showTimings.map((timing) => (
                  <option key={timing} value={timing}>{timing}</option>
                ))}
              </select>
            </div>
                <div className="col-3">
                  <select
                    class="form-select"
                    name="NT"
                    aria-label="Default select example"
                    onChange={handleChange}
                    value={Ticket.NT}
                  >
                    <option selected>Choose No of Tickets</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="3">4</option>
                  </select>
                </div>
                <div className="col-3">
                  <input
                    type="date"
                    name="Date"
                    onChange={handleChange}
                    value={Ticket.Date}
                    className="form-control"
                    placeholder="Date"
                  />
                </div>
                <div className="col-2">
                  <button
                    onClick={handleSubmit}
                    className="btn btn-sm btn-primary m-1"
                  >
                    Book Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {ticketNo && (
          <p className="text-center mt-5">
            Thanks for Booking
            <br />
            Your Ticket ID : {ticketNo}
          </p>
        )}
      </div>
    </div>
  );
}
