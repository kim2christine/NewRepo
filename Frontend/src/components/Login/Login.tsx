import { useNavigate } from "react-router-dom";
import "./Login.css";

import { useState } from "react";
import axios from "axios";

import React from "react";
import { UserInterface } from "../Interfaces/UserInterface";
import { state } from "../globalData/store";

export const Login: React.FC = () => {
  //defining a state object for our user data
  const [user, setUser] = useState<UserInterface>({
    username: "",
    password: "",
  });

  //we need a useNavigate hook to allow us to navigate between components... no more manual URL changes!
  const navigate = useNavigate();

  //function to store input box values
  const storeValues = (input: any) => {
    //if the input that has changed is the "username" input, change the value of username in the user state object

    if (input.target.name === "username") {
      setUser((user) => ({ ...user, username: input.target.value }));
    } else {
      setUser((user) => ({ ...user, password: input.target.value }));
    }
  };

  //this function will (EVENTUALLY) gather username and password, and send a POST to our java server
  const login = async () => {
    //TODO: We could (should) validate user input here as well as backend

    //Send a POST request to the backend for login
    //NOTE: with credentials is what lets us save/send user session info
    const response = await axios
      .post("http://localhost:8080/users/login", user, {
        withCredentials: true,
      })
      .then((response) => {
        //if the login was successful, log the user in and store their info in global state
        state.userSessionData = response.data;

        alert(
          "Welcome, " +
            state.userSessionData.role +
            " " +
            state.userSessionData.username
        );

        //use our useNavigate hook to switch views to the Catch Pokemon Component

        //if they click employee button i want it to take them to localhost:8080/users/employee
        //if they click manager button i want it to take them to localhost:8080/useres/manager

        // if (state.userSessionData.role === "Manager") {
        //   navigate("/manager");
        // } else {
        //   navigate("/reimbursement/add");
        // }

        navigate("/reimbursement/add");
      })
      .catch((error) => {
        alert("Login Failed!");
      }); //If login fails, tell the user that
  };

  return (
    <div className="login">
      <div className="text-container">
        <h1>Welcome to the Employee Login Page</h1>
        <h3>Sign in to handle reimbursements!</h3>

        <div className="input-container">
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={storeValues}
          />
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={storeValues}
          />
        </div>

        <button className="login-button" onClick={login}>
          Login
        </button>

        <button className="login-button" onClick={() => navigate("/register")}>
          Create Account
        </button>
      </div>
    </div>
  );
};
