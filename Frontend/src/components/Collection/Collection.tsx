import { useEffect, useState } from "react";

import axios from "axios";

import "./Collection.css";
import { ReimbursementInterface } from "../Interfaces/ReimbursementInterface";
import React from "react";

export const Collection: React.FC = () => {
  //We could have stored a base URL here for cleaner requesting
  //const baseUrl = "http://localhost:8080/pokemon"

  //we'll store state that consists of an Array of ReimbursementInterface objects
  const [reimbursement, setReimbursement] = useState<ReimbursementInterface[]>(
    []
  ); //start with empty array

  //I want to get all pokemon when the component renders, so we'll use useEffect
  useEffect(() => {
    getAllReimbursement();
  }, []); //empty array so this triggers on component load and state change

  // //I want to get all pokemon when the component renders, so we'll use useEffect
  // useEffect(() => {
  //   getAllReimbursement();
  // }, []); //empty array so this triggers on component load and state change

  //GET request to server to get all pokemon
  const getAllReimbursement = async () => {
    //our GET request (remember to send withCredentials to confirm the user is logged in)
    const response = await axios.get(
      "http://localhost:8080/reimbursement/all",
      {
        withCredentials: true,
      }
    );

    //populate the reimbursement state
    setReimbursement(response.data);

    console.log(response.data);
  };

  //Delete reimbursement by id
  const deleteReimbursement = async (formId: any) => {
    //TODO: throw some error if formId is typeof undefined

    const response = await axios
      .delete("http://localhost:8080/reimbursement/" + formId, {
        withCredentials: true,
      })
      .then((response) => alert(response.data))
      .then(() => getAllReimbursement())
      .catch
      //TODO: we could have some catches here for the errors that can pop up
      ();
  };

  return (
    <div className="collection-container">
      {/* using map(), for every reimbursement that belongs to the logged in user... 
            Display one Reimbursement component, and a button to delete it*/}
      <table className="table">
        <thead>
          <tr>
            <th>FormId</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {reimbursement.map((reim) => {
            return (
              <tr key={reim.formId}>
                <td>{reim.formId}</td>
                <td>{reim.amount}</td>
                <td>{reim.description}</td>
                <td>{reim.status}</td>
                <td><button onClick={() => deleteReimbursement(reim.formId)}>Delete</button></td>
              </tr>
            );
          })}
        </tbody>
        </table>       
      {reimbursement.map((reim, index) => (
        <div>
          {/* <Reimbursement {...reim}></Reimbursement> */}
          <button
            className="reim-button"
            onClick={() => deleteReimbursement(reim.formId)}
          >
            Delete
          </button>
        </div>
      ))} 

      {/* If you need to render multiple things in map(), they need to be in a <div> */}
    </div>
  );
};
