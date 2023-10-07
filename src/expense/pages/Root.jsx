import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./auth/Auth";
import ExpenseTracker from "./expense-tracker/ExpenseTracker";

function Root(props) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/expense-tracker" element={<ExpenseTracker />} />
      </Routes>
    </Router>
  );
}

export default Root;
