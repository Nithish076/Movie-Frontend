import React from "react";
import { useNavigate } from "react-router-dom";

export default function Guest() {
  const navigate = useNavigate();
  return (
    <div className="text-end">
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="btn btn-outline-light me-2"
      >
        Login
      </button>
      <button
        type="button"
        onClick={() => navigate("/register")}
        className="btn btn-warning"
      >
        New User
      </button>
    </div>
  );
}
