import axios from "axios";
import { ReimbursementInterface } from "../Interfaces/ReimbursementInterface";
import { Reimbursement } from "./Reimbursement";
import { useEffect, useState } from "react";
import { navigate } from "react-router";

const ReimbursementList: React.FC = () => {
  const [listItems, setListItems] = useState<ReimbursementInterface[]>([]);
  const [filter, setFilter] = useState<string>();

  const onFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/reimbursement/all`, {
        withCredentials: true,
      })

      .then((response) => {
        setListItems(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [filter]);

  return (
    <>
      <div>
        <h1>Welcome Manager</h1>
        <button className="login-button" onClick={() => navigate("/manager")}>
          Back
        </button>
      </div>
      <div>
        <select value={filter} onChange={onFilterChange}>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="denied">Denied</option>
          <option value="deleted">Deleted</option>
        </select>

        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th>FormId</th>
            </tr>
          </thead>

          <tbody>
            {listItems.map((reimbursement: ReimbursementInterface) => (
              <Reimbursement
                key={reimbursement.formId}
                reimbursement={reimbursement}
                onStatusChange={(
                  itemWeWantToChangeStatusFor: ReimbursementInterface,
                  changedStatus: string
                ) => {
                  axios
                    .put(
                      `http://localhost:8080/reimbursement/${itemWeWantToChangeStatusFor.formId}`,
                      {
                        ...itemWeWantToChangeStatusFor,
                        status: changedStatus,
                      },
                      { withCredentials: true }
                    )
                    .then(() => {
                      // Update succeeded.
                      // We need to make a copy of the list so we can immutably update our UI.
                      const newListWithAnUpdatedStatusForTheItemWeChanged =
                        listItems.map(
                          (
                            currentItem: ReimbursementInterface
                          ): ReimbursementInterface => {
                            if (
                              currentItem.formId ===
                              itemWeWantToChangeStatusFor.formId
                            ) {
                              return {
                                ...itemWeWantToChangeStatusFor,
                                status: changedStatus,
                              };
                            } else {
                              return currentItem;
                            }
                          }
                        );

                      // Update the UI via React's setState helper.
                      setListItems(
                        newListWithAnUpdatedStatusForTheItemWeChanged
                      );
                    })
                    .catch((error) => {
                      console.error("There was an error!", error);
                    });
                }}
              />
            ))}
            {listItems.length === 0 && (
              <tr>
                <td colSpan={4}>No reimbursements found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReimbursementList;
