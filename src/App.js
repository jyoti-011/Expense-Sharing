import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";  
import CreateGroupPage from "./components/CreateGroupPage";
import GroupPage from "./components/GroupPage";
import AddPaymentPage from "./components/AddPaymentPage";
import GroupCreatedPage from "./components/GroupCreatedPage"; 
import DetailsPage from "./components/DetailsPage";  

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {}
        <Route path="/create-group" element={<CreateGroupPage />} />
        <Route path="/group-created" element={<GroupCreatedPage />} />
        <Route path="/group-page" element={<GroupPage />} />
        <Route path="/add-payment" element={<AddPaymentPage />} />
        <Route path="/details" element={<DetailsPage />} /> {}
      
      </Routes>
    </Router>
  );
};

export default App;
