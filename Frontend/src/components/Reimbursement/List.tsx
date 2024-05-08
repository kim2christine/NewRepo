import axios from "axios";
import { ReimbursementInterface } from "../Interfaces/ReimbursementInterface";
import { Reimbursement } from "./Reimbursement";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { on } from "events";

const ReimbursementList: React.FC = () => {
  const [listItems, setListItems] = useState<ReimbursementInterface[]>([]);
  //const [filteredItems, setFilteredItems] = useState<ReimbursementInterface[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [change, setChange] = useState<boolean>(false);
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("Manager");
  const onFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
    console.log(filter);
    // if (event.target.value === "All") {
    //   setFilteredItems(listItems);
    // } else {
    //   setFilteredItems(listItems.filter((reimbursement) => reimbursement.status === event.target.value));
    // }
  };
  const deleteReimbursement = async (formId: any) => {
    const response = await axios.delete(`http://localhost:8080/reimbursement/${formId}`, {
      withCredentials: true,
    });
    console.log(response);
    setListItems(prevItems => prevItems.filter(reimbursement => reimbursement.formId !== formId));
    setChange(!change);
  }
  const handleStatusChange = async (formId: any, e: any) => {
    console.log(e);
     if (e === "Delete") {
       deleteReimbursement(formId);
     } else {
    const response = await axios.put(`http://localhost:8080/reimbursement/${formId}`, {
      status: e,
    }, {
      withCredentials: true,
    });
    console.log(response);
    }
    setChange(!change);
    //setFilter("All");

  }
  
  useEffect(() => {
    //validateUser();
    axios
      .get(`http://localhost:8080/reimbursement/allreims/${filter}`, {
        withCredentials: true,
      })

      .then((response) => {
        setListItems(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [filter, change]);

  const handleReturn = () => {
    if (role == "Manager") {
      navigate("/manager");
    } else {
      navigate("/employee");
    }
  }

  return (
    <>
    <button onClick={handleReturn}>Back</button>
    <h1>Reimbursement List</h1>
    <div>
      <p>Here are the current reimbursements</p>
      <select onChange={onFilterChange}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Denied">Denied</option>
      </select>
      <table className="table">
        <thead>
          <tr>
            <th><h2>Reimbursement ID</h2></th>
            <th><h2>Description</h2></th>
            <th><h2>Amount</h2></th>
            
            <th><h2>Author</h2></th>
            <th><h2>Status</h2></th>
          </tr>
        </thead>
        <tbody>
          {listItems
            .filter((reimbursement) => {
              if (filter === "All") {
                return true;
              } else {
                return reimbursement.status === filter;
              }
            })
            .map((reimbursement) => (
              <tr key={reimbursement.formId}>
                <td>{reimbursement.formId}</td>
                  <td>{reimbursement.description}</td>
                <td>{reimbursement.amount}</td>
                <td>{reimbursement.username}</td>
                <td>
                <select value={reimbursement.status} onChange={(e) => handleStatusChange(reimbursement.formId, e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Denied">Denied</option>
                  <option value="Delete" >Delete</option>
                </select>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default ReimbursementList;
