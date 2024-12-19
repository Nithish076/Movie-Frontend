import React from "react";
import MCard from "./MCard";
import MoviesData from "./data";

export default function Movies(props) {
  return (
    <div className="container movies">
      <h3 className="text-center p-3">Movies</h3>
      <div className="movies-list">
        <div className="row">
          {MoviesData.map((movie) => {
            return (
              <MCard
                Movie={movie}
                key={movie.id}
                setMovies={props.setMovies}
                loggedIn={props.loggedIn}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
