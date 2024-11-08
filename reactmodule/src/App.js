import React from "react";
import "./App.css";
import NotFound from "pages/NotFound";
import AppBar from "components/AppBar";
import MasterPage from "pages/MasterPage";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import ObjectPage1 from "pages/ObjectPage1";
import CreatePage from "pages/CreatePage";
import SignPage from "pages/SignPage";
const App = () => {
  return (
    <Router>
      <div className="App full-height">
        <AppBar />
        {/* Define routes */}
        <Routes>
        {/* <Route path="/reactmodule/index.html" element={<MasterPage />} /> */}
        <Route path="/sign" element={<SignPage/>} />
        <Route path="/" element={<MasterPage />} />
          <Route path="/object/:s_id" element={<ObjectPage1 />} />  ObjectPage route
          <Route path="/create" element={<CreatePage />} />
          <Route path="*" element={<NotFound />} />  {/* 404 route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
