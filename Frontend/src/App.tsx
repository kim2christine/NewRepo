import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";

import { Homepage } from "./components/Login/Homepage";

import { Catch } from "./components/Catch/Catch";
import { Register } from "./components/Login/Register";
import { Collection } from "./components/Collection/Collection";
import { AddReimbursement } from "./components/Login/AddReimbursement";
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
          <Route path="/reimbursement" element={<Collection />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
