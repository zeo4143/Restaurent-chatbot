import React from "react";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const handleClick = () => {
    localStorage.clear("user");
    window.location.reload();
  };
  return (
    <div className="navbar">
      <h1 className="navHeader">Chatbot</h1>
      <FiLogOut className="logoutIcon" onClick={handleClick} />
    </div>
  );
}
