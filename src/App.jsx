import React from "react";
import AuthGate from "./components/AuthGate";
import Login from "./components/Login";
import Planner from "./components/Planner";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AuthGate>{(session) => <Planner session={session} />}</AuthGate>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
