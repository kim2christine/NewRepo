import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Employee() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Clear user session or token here

    // replace "userToken" with the actual key you use to store the user session or token
    navigate("/"); // redirect to login page
  };

  return (
    <div>
      <h1>Employee Homepage</h1>
      <div>
        <p>Welcome to the Employee Homepage!</p>

        <div>
          <button onClick={() => navigate("/reimbursement/add")}>
            Create a New Reimbursement
          </button>
          <button onClick={() => navigate("/register")}>
            View Your Reimbursements
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Employee;
