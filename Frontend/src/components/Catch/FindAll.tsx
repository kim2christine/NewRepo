import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserInterface } from "../Interfaces/UserInterface";

export function Employee() {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [message, setMessage] = useState("");
  let handleDelete = async (userId: any) => {
    //our DELETE request (remember to send withCredentials to confirm the user is logged in)
    const response = await axios.delete(
      `http://localhost:8080/users/${userId}`,
      {
        withCredentials: true,
      }
    );
    message === "" ? setMessage("User deleted successfully") : setMessage("");
    setMessage(`User with id ${userId} deleted successfully`);
  }
  useEffect(() => {
    const getAllUser = async () => {
        //our GET request (remember to send withCredentials to confirm the user is logged in)
      
        const response = await axios.get(
          "http://localhost:8080/users/allEmployees",
          {
            withCredentials: true,
          }
        );

        //populate the reimbursement state
        setUsers(response.data);

        console.log(response.data);
      };

    getAllUser();
  }, [message]);
  


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
        <p>{message}</p>
        <table className="table">
          <thead>
            <tr>
              <th><h1>Username</h1></th>
              <th><h1>UserId</h1></th>
              <th><h1>Delete User</h1></th>
            </tr>
          </thead>
          <tbody>
          {users.map((user) => {
            return (
            <tr key={user.userId}>
                <td><h2>{user.username}</h2></td>
                <td><h2>{user.userId}</h2></td>
                <td><button className="delete-button"onClick={() => handleDelete(user.userId)}>Delete User</button></td>
            </tr>
            )
    })}
          </tbody>
        </table>
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
