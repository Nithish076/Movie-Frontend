import React from "react";
import { useNavigate } from "react-router-dom";


export default function User(props) {
  const navigate = useNavigate();
  return (
    <div className="dropdown text-end">
      <button data-bs-toggle="dropdown" aria-expanded="false">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="mdo"
          width={32}
          height={32}
          className="rounded-circle"
        />
      </button>
      <ul className="dropdown-menu text-small">
        <li>
          <button
            onClick={() => navigate("/mybookings")}
            className="dropdown-item"
            href="#"
          >
            My Bookings
          </button>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button onClick={props.logout} className="dropdown-item">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
