import React from "react";
import { useNavigate } from "react-router-dom";

export default function MCard({setMovies,loggedIn, Movie }) {
  const navigate = useNavigate();
  const handleBook = () => {
    setMovies(Movie);
    navigate("/bookTicket");
  }
  return (
    <div className="col-md-4 p-1">
      <div className="card">
        <div className="row">
          <div className="col-4 text-center">
            <img
              className="card-img-top"
              src={Movie.Poster_Link}
              alt="Card"
            />
            {loggedIn ? (
              <button
                onClick={handleBook}
                className="btn btn-sm btn-primary m-1"
              >
                Book Ticket
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="btn btn-sm btn-primary m-1"
              >
                Book Ticket
              </button>
            )}
          </div>
          <div className="col-8 p-3">
            <h5 className="card-title">{Movie.Series_Title}</h5>
            <span class="badge text-bg-warning m-1">{Movie.Released_Year}</span>
            <span class="badge text-bg-primary m-1">{Movie.Runtime}</span>
            <p className="card-text" style={{ fontSize: "small" }}>
              {Movie.Overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
