import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import "./App.css";
import RegistrationView from "./components/RegistrationView.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="demo" element={<RegistrationView />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
