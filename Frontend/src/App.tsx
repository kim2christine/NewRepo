import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";

import { Homepage } from "./components/Login/Homepage";

import { Catch } from "./components/Catch/Catch";
import { Register } from "./components/Login/Register";
import { Collection } from "./components/Collection/Collection";
import { AddReimbursement } from "./components/Login/AddReimbursement";
import { Manager } from "./components/Login/Manager";
import { Employee } from "./components/Login/Employee";
import FindAll from "./components/Catch/FindAll";
import List from "./components/Reimbursement/List";

//import all of the other components here!!!!!!!!
//still have to make other components for reimbursement retrieval/status changes

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reimbursement/add" element={<AddReimbursement />} />
          <Route path="/reimbursement/view" element={<Catch />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/allreims" element={<List />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/FindAll" element={<FindAll />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
