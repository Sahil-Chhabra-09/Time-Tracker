import { Button, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useOnclickOutside from "react-cool-onclickoutside";
import Timeline from "./Timeline";
import axios from "axios";
import { toast } from "react-toastify";
import CurrentTime from "../components/RenderCurrentTime";

function Navbar({ isLoggedIn, handleLogOut, navigateToLogin }) {
  const isDesktop = useMediaQuery("(min-width:700px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [errorStatus, setErrorStatus] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

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

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const ref = useOnclickOutside(() => {
    setIsMenuOpen(false);
  });

  return (
    <div className="flex justify-between shadow-lg p-4 items-center">
      <CurrentTime />
      <Timeline
        showTimeline={showTimeline}
        setShowTimeline={setShowTimeline}
        allTags={allTags}
        setAllTags={setAllTags}
        errorStatus={errorStatus}
        isLoading={isLoading}
      />
      {isDesktop ? (
        <div className="space-x-2">
          <Button
            variant="outlined"
            sx={{ color: "white", border: "1px solid #DEDEDE" }}
            onClick={getMyTags}
          >
            My Timeline
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "white", border: "1px solid #DEDEDE" }}
          >
            <a href="https://github.com/Sahil-Chhabra-09/Time-Tracker#readme">
              About
            </a>
          </Button>
          {isLoggedIn ? (
            <Button
              variant="outlined"
              sx={{ color: "white", border: "1px solid #DEDEDE" }}
              onClick={handleLogOut}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="outlined"
              sx={{ color: "white", border: "1px solid #DEDEDE" }}
              onClick={navigateToLogin}
            >
              Login / SignUp
            </Button>
          )}
        </div>
      ) : (
        <div ref={ref}>
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
          {isMenuOpen && !showTimeline && (
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
                  <a href="https://github.com/Sahil-Chhabra-09/Time-Tracker#readme">
                    About
                  </a>
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
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
