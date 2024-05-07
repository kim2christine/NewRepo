import React from "react";
import { useNavigate } from "react-router-dom";

export function Manager() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Clear user session or token here

    // replace "userToken" with the actual key you use to store the user session or token
    navigate("/"); // redirect to login page
  };

  return (
    <div>
      <h1>Manager Homepage</h1>
      <p>Welcome to the Manager Homepage!</p>
      <div>
        <button onClick={() => navigate("/FindAll")}>
          View All Employees
        </button>
        <button onClick={() => navigate("/reimbursement")}>
          View All Reimbursements
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Manager;
