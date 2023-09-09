import React, { useEffect, useState } from "react";
import Navbar from "../pages/Navbar";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setLogout } from "../state";

function RenderNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem("token")]);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    const data = {
      totalTime: { time: 0, hours: 0, minutes: 0, seconds: 0 },
      started: false,
      startTime: 0,
    };
    localStorage.setItem("timerData", JSON.stringify(data));
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    dispatch(setLogout);
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
  };
  return <Navbar isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />;
}

export default RenderNavbar;
