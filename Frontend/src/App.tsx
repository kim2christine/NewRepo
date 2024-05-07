import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";

import { Homepage } from "./components/Login/Homepage";

import { Catch } from "./components/Catch/Catch";
import { Register } from "./components/Login/Register";
import { Collection } from "./components/Collection/Collection";
//import all of the other components here!!!!!!!!
//still have to make other components for reimbursement retrieval/status changes

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reimbursement/add" element={<Catch />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/reimbursement" element={<Collection />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
