import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/About";
import "./customStyles/Blob.css";
import NotFound from "./pages/NotFound";

function App() {
  const authToken = useSelector((state) => state.auth.token);
  const [isLoggedIn, setIsLoggedIn] = useState(
    authToken || localStorage.getItem("token")
  );
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/auth" Component={isLoggedIn ? Home : Login} />
          <Route path="/about" Component={About} />
          <Route path="*" Component={NotFound} />
        </Routes>
        <ToastContainer position="bottom-left" autoClose={3000} limit={4} />
      </BrowserRouter>
    </div>
  );
}

export default App;
