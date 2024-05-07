import React from "react";
import { useNavigate } from "react-router-dom";

export function Employee() {
  const getAllUser = async () => {
    //our GET request (remember to send withCredentials to confirm the user is logged in)
    const response = await axios.get(
      "http://localhost:8080/reimbursement/allEmployees",
      {
        withCredentials: true,
      }
    );

    //populate the reimbursement state
    setUser(response.data);

    console.log(response.data);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    // Clear user session or token here

    // replace "userToken" with the actual key you use to store the user session or token
    navigate("/"); // redirect to login page
  };

  return (
    <div>
      <h1>All Employees</h1>
      <div>
        <p>Here are our registered employees!</p>

        <div>
          <button className="login-button" onClick={() => navigate("/manager")}>
            Back
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
