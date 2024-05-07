import { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import { UserInterface } from "../Interfaces/UserInterface";

export const Register: React.FC = () => {
  //set state (UserInterface)
  const [user, setUser] = useState<UserInterface>({
    username: "",
    password: "",
    role: "Employee",
  });

  //useNavigate to navigate between components
  const navigate = useNavigate();

  //function to store input box values
  const storeValues = (input: any) => {
    //if the input that has changed is the "username" input, change the value of username in the user state object

    if (input.target.name === "username") {
      setUser((user) => ({ ...user, username: input.target.value }));
    } else if (input.target.name === "password") {
      setUser((user) => ({ ...user, password: input.target.value }));
    } else if (input.target.name === "role") {
      setUser((user) => ({
        ...user,
        role: input.target.checked ? "Manager" : "Employee",
      }));
    }
  };

  //function to send a POST with user data to register a user in the backend
  //! Remember, requests to our Java server will only work with @CrossOrigin in our Controllers
  const register = async () => {
    //TODO: We still need to implement the backend... this request goes nowhere
    const response = await axios.post("http://localhost:8080/users", user);

    alert(response.data); //"{user} was created!"

    //after registration, send the user back to login page
    navigate("/login");
  };

  //"{user} was created!"

  //after registration, send the user back to login page

  return (
    <div className="login">
      <div className="text-container">
        <h1>New here? Create an Account for free!</h1>

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

        <div>
          <div>
            <label>
              <input type="checkbox" onChange={storeValues} name="role" />
              Manager
            </label>
          </div>

          <button className="login-button" onClick={register}>
            Submit
          </button>
          <button
            className="login-button"
            onClick={() => navigate("/reimbursement")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
