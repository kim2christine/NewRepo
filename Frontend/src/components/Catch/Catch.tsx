import "./Catch.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import React, { useState } from "react";

import { ReimbursementInterface } from "../Interfaces/ReimbursementInterface";
import { state } from "../globalData/store";

export const Catch: React.FC = () => {
  //A variable to store user input for finding a reimbursement
  const [userInput, setUserInput] = useState(0);

  //we need to store reimbursement state to use when rendering the ReimbursementComponent
  const [reimbursement, setReimbursement] = useState<ReimbursementInterface>({
    description: "",
    amount: 0,
  });

  //we need our useNavigate hook to programmatically switch endpoints (which switches components)
  const navigate = useNavigate();

  //a function that stores the user input (Which we need for our GET request)
  const gatherInput = (input: any) => {
    setUserInput(input.target.value); //set the userInput to what's in the input box
  };

  //a function that sends a GET to reimbursementAPI based on the user's input
  const getReimbursement = async () => {
    //sending our request to reimbursementAPI using the userInput as the reimbursement id to search for
    const response = await axios.get(
      "http://localhost:8080/reimbursement/add " + userInput
    );

    //let's set our reimbursement state with the incoming data
    setReimbursement((reimbursement) => ({
      ...reimbursement,
      description: response.data.description,
    })); //only changing the description
    setReimbursement((reimbursement) => ({
      ...reimbursement,
      amount: response.data.amount,
    })); //only changing the amount

    //what's that?^^ when we have state as entire objects, it's tricky to change just one value...
    //we can use the ...spread operator to say "keep the entire state object as is, but change this one thing"
  };

  //this function will send the existing reimbursement to the Database
  const catchReimbursement = async () => {
    //hardcode userId 1 for the reimbursement's user
    const response = await axios
      .post("http://localhost:8080/reimbursement/add", reimbursement, {
        withCredentials: true,
      })
      .then((response) => {
        alert(
          state.userSessionData.username + " received " + reimbursement.formId
        );
      })
      .then(() => {
        state.lastCaughtReimbursement = reimbursement; //sending our local state to global state
      });

    //just to show the stored data
    console.log(state);
  };

  return (
    <div className="home-page">
      <div className="navbar">
        <br></br>
        <br></br>
        <br></br>
        <button
          className="reim-button"
          onClick={() => {
            navigate("/collection");
          }}
        >
          See All Submissions
        </button>
        <button
          className="reim-button"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Login
        </button>
      </div>

      <div className="home-container">
        <h3>Search For a Reimbursement!</h3>
        <input
          type="number"
          placeholder="Enter Reimbursement ID"
          onChange={gatherInput}
        />
        <button className="reim-button" onClick={getReimbursement}>
          Find Reimbursement
        </button>

        <div className="reim-container">
          {reimbursement.formId ? (
            <button className="reim-button" onClick={catchReimbursement}>
              catch
            </button>
          ) : (
            ""
          )}
          {/* <Reimbursement {...reimbursement}></Reimbursement> */}
        </div>
      </div>
    </div>
  );
};
