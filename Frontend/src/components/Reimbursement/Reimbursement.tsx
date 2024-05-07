import React from "react";
import { ReimbursementInterface } from "../Interfaces/ReimbursementInterface";

import "./Reimbursement.css";

export const Reimbursement: React.FC<{
  reimbursement: ReimbursementInterface;

  onStatusChange: (
    reimbursement: ReimbursementInterface,
    newStatus: string
  ) => void;
}> = ({ reimbursement, onStatusChange }) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(reimbursement, event.target.value);
  };

  return (
    <tr>
      <td>{reimbursement.description}</td>
      <td>{reimbursement.amount}</td>
      <td>
        <select value={reimbursement.status} onChange={handleStatusChange}>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Denied">Denied</option>
          <option value="Delete">Delete</option>
        </select>
      </td>
      <td>{reimbursement.formId}</td>
    </tr>
  );
};

//THIS FILE IS DONE DON'T TOUCH
