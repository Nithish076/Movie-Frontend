import React from "react";

export default function Slider() {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active" style={{ height: "400px" }}>
          <img
            src="https://images3.alphacoders.com/124/1241167.png"
            className="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h2>Thor: Love and Thunder</h2>
          </div>
        </div>
        <div className="carousel-item" style={{ height: "400px" }}>
          <img
            src="https://inreview52838412.files.wordpress.com/2022/06/277466930_5428881863791250_5434462979725729051_n-scaled-1.jpg"
            className="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h2>Top Gun: Maverick</h2>
          </div>
        </div>
        <div className="carousel-item" style={{ height: "400px" }}>
          <img
            src="https://static.toiimg.com/photo/90518208.cms?resizemode=4"
            className="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h2>KGF: Chapter 2</h2>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
