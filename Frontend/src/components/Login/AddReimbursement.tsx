import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ReimbursementInterface } from "../Interfaces/ReimbursementInterface";

import "./Add.css";

export const AddReimbursement: React.FC = () => {
  //set state (UserInterface)
  const [reimbursement, setReimbursement] = useState<ReimbursementInterface>({
    description: "",
    amount: 0,
    status: "",
  });

  //useNavigate to navigate between components
  const navigate = useNavigate();

  //function to store input box values
  const storeValues = (input: any) => {
    //if the input that has changed is the "username" input, change the value of username in the user state object

    if (input.target.name === "description") {
      setReimbursement((reimbursement) => ({
        ...reimbursement,
        description: input.target.value,
      }));
    } else {
      setReimbursement((reimbursement) => ({
        ...reimbursement,
        amount: input.target.value,
      }));
    }
    console.log(reimbursement);
  };

  //function to send a POST with user data to register a user in the backend
  //! Remember, requests to our Java server will only work with @CrossOrigin in our Controllers
  const add = async () => {
    //this will go to the backend
    const response = await axios.post(
      "http://localhost:8080/reimbursement/add",
      reimbursement,
      { withCredentials: true }
    );
    console.log(response);
    navigate("/employee");
  };

  return (
    <div className="add">
      <div className="text-container">
        <h1>Submit a new Reimbursement Form!</h1>

        <div className="input-container">
          <input
            type="text"
            placeholder="description"
            name="description"
            onChange={storeValues}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="amount"
            name="amount"
            onChange={storeValues}
          />
        </div>

        <button className="add-reimbursement" onClick={add}>
          Submit
        </button>
        <button
          className="add-reimbursement"
          onClick={() => navigate("/employee")}
        >
          Back
        </button>
      </div>
    </div>
  );
};
