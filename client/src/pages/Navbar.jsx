import { Button } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useOnclickOutside from "react-cool-onclickoutside";
import Timeline from "./Timeline";
import MyGoals from "./MyGoals";
import axios from "axios";
import { toast } from "react-toastify";
import CurrentTime from "../components/RenderCurrentTime";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar({ isLoggedIn = false, handleLogOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [allGoals, setAllGoals] = useState([]);
  const [errorStatus, setErrorStatus] = useState(null);
  const location = useLocation();
  const apiUrl = process.env.REACT_APP_API_URL;

  const navigateToLogin = () => {
    window.location.href = "/auth";
  };

  const getMyTags = async () => {
    if (!localStorage.getItem("uid") || !localStorage.getItem("token")) {
      if (!isLoggedIn) {
        toast.info("Please login to enable tagging", {
          theme: "coloured",
        });
        return;
      }
      toast.info("Please login again", {
        theme: "coloured",
      });
    } else {
      setShowTimeline(true);
      setIsLoading(true);
      await axios
        .get(`${apiUrl}tag`, {
          params: { uid: String(localStorage.getItem("uid")) },
          headers: {
            Authorization: `Bearer ${String(localStorage.getItem("token"))}`,
          },
        })
        .then((res) => {
          setAllTags(res.data.tags);
        })
        .catch((error) => {
          setErrorStatus(error.response.status);
          console.error({ msg: "Couldn't get tags", error: error });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const getMyGoals = async () => {
    if (!localStorage.getItem("uid") || !localStorage.getItem("token")) {
      if (!isLoggedIn) {
        toast.info("Please login to enable this feature", {
          theme: "coloured",
        });
        return;
      }
      toast.info("Please login again", {
        theme: "coloured",
      });
    } else {
      setShowGoals(true);
      await axios
        .get(`${apiUrl}goal`, {
          params: { uid: String(localStorage.getItem("uid")) },
          headers: {
            Authorization: `Bearer ${String(localStorage.getItem("token"))}`,
          },
        })
        .then((res) => {
          setAllGoals(res.data.goals);
        })
        .catch((error) => {
          setErrorStatus(error.response.status);
          console.error({ msg: "Couldn't get goals", error: error });
        });
    }
  };

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
    setShowTimeline(false);
    setShowGoals(false);
  };

  const handleNewFeatures = () => {
    toast.success("Feature coming soon!", {
      theme: "coloured",
    });
  };

  const ref = useOnclickOutside(() => {
    setIsMenuOpen(false);
    setShowTimeline(false);
    setShowGoals(false);
  });

  return (
    <div
      className="flex justify-between shadow-lg p-4 items-center text-white bg-cyan-900  absolute top-0 w-full"
      ref={ref}
    >
      <CurrentTime />
      <Timeline
        showTimeline={showTimeline}
        allTags={allTags}
        setAllTags={setAllTags}
        errorStatus={errorStatus}
        isLoading={isLoading}
      />
      <MyGoals
        showGoals={showGoals}
        setShowGoals={setShowGoals}
        allGoals={allGoals}
        setAllGoals={setAllGoals}
        errorStatus={errorStatus}
        isLoading={isLoading}
      />
      <div>
        <Button
          sx={{
            color: "white",
            "&:hover": {
              border: "none",
              backgroundColor: "none",
            },
          }}
          onClick={handleMenuOpen}
        >
          <MoreVertIcon />
        </Button>
        {isMenuOpen && !showTimeline && !showGoals && (
          <div className=" w-52 h-max absolute right-0 z-10">
            <div
              className="space-x-2 border-slate-800 border-2 p-2 mt-2"
              style={{ backgroundColor: "rgba(32,88,109,0.8)" }}
            >
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  border: "none",
                  "&:hover": {
                    border: "none",
                    backgroundColor: "rgb(32,88,109)",
                  },
                }}
              >
                {location.pathname === "/about" ? (
                  <Link to="/">Home</Link>
                ) : (
                  <Link to="/about">About</Link>
                )}
              </Button>
              <hr />
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  border: "none",
                  "&:hover": {
                    border: "none",
                    backgroundColor: "rgb(32,88,109)",
                  },
                }}
                onClick={getMyGoals}
              >
                My Goals
              </Button>
              <hr />
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  border: "none",
                  "&:hover": {
                    border: "none",
                    backgroundColor: "rgb(32,88,109)",
                  },
                }}
                onClick={getMyTags}
              >
                My Timeline
              </Button>
              <hr />
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  border: "none",
                  "&:hover": {
                    border: "none",
                    backgroundColor: "rgb(32,88,109)",
                  },
                }}
                onClick={handleNewFeatures}
              >
                Pomodoro
              </Button>
              <hr />
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  border: "none",
                  "&:hover": {
                    border: "none",
                    backgroundColor: "rgb(32,88,109)",
                  },
                }}
                onClick={handleNewFeatures}
              >
                My Time Table
              </Button>
              <hr />
              {isLoggedIn ? (
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    border: "none",
                    "&:hover": {
                      border: "none",
                      backgroundColor: "rgb(32,88,109)",
                    },
                  }}
                  onClick={handleLogOut}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  sx={{
                    color: "white",
                    border: "none",
                    "&:hover": {
                      border: "none",
                      backgroundColor: "rgb(32,88,109)",
                    },
                  }}
                  onClick={navigateToLogin}
                >
                  Login / SignUp
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
