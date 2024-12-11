import React, { useContext } from "react";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Messenger from "./pages/Messenger";
import VerifyCode from "./components/VerifyCode";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {

  // Using the useContext()
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Homepage /> : <Register />} />

        <Route path="/verify" element={<VerifyCode />} />

        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

        <Route path="/messenger" element={!user ? <Navigate to="/" /> : <Messenger />} />

        <Route path="/profile/:username" element={<Profile />} />

        {/* Optional redirect for undefined routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
