import { useEffect, useState } from "react";
import { Button, Input } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

function Home() {
  const authToken = useSelector((state) => state.auth.token);
  const uid = useSelector((state) => state.auth.uid);
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();

  const [totalTime, setTotalTime] = useState({
    time: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [started, setStarted] = useState(false);
  const [startTime, setstartTime] = useState(null);
  const [isDataRetrived, setIsDataRetrived] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    authToken || localStorage.getItem("token")
  );
  const [isTaggingDisabled, setIsTaggingDisabled] = useState(true);

  useEffect(() => {
    readTimerDataFromDb();
  }, [uid]);

  useEffect(() => {
    const savedTimerData = localStorage.getItem("timerData");
    if (savedTimerData) {
      const savedData = JSON.parse(savedTimerData);
      setTotalTime(savedData.totalTime);
      setStarted(savedData.started);
      setstartTime(savedData.startTime);
    }
  }, []);

  useEffect(() => {
    const { time } = totalTime;
    const newTime = {
      hours: time !== 0 ? Math.floor(time / 3600) : 0,
      minutes: time !== 0 ? Math.floor((time % 3600) / 60) : 0,
      seconds: time !== 0 ? Math.floor(time % 60) : 0,
    };
    setTotalTime((prevTotalTime) => ({
      ...prevTotalTime,
      ...newTime,
    }));
  }, [totalTime.time]);

  useEffect(() => {
    if (totalTime.time > 0) {
      const data = {
        totalTime: totalTime,
        started: started,
        startTime: startTime,
      };
      localStorage.setItem("timerData", JSON.stringify(data));
    }
  }, [totalTime, startTime]);

  useEffect(() => {
    if (totalTime.time > 0) {
      const data = {
        totalTime: totalTime,
        started: started,
        startTime: startTime,
      };
      localStorage.setItem("timerData", JSON.stringify(data));
    } else if (started === true) {
      const data = {
        totalTime: { time: 0, hours: 0, minutes: 0, seconds: 0 },
        started: true,
        startTime: startTime,
      };
      localStorage.setItem("timerData", JSON.stringify(data));
    }
    updateInDb();
    setIsTaggingDisabled(isTaggingDisabled || started);
  }, [started]);

  useEffect(() => {
    setIsLoggedIn(authToken || localStorage.getItem("token"));
  }, [authToken]);

  const readTimerDataFromDb = async () => {
    if (localStorage.getItem("uid")) {
      setIsDataRetrived(false);
      await axios
        .get(`${apiUrl}time`, {
          params: {
            uid: String(localStorage.getItem("uid")),
          },
        })
        .then((res) => {
          res = res.data;
          setstartTime(res.timeData.startTime);
          setStarted(res.timeData.started);
          setTotalTime((prevTotalTime) => ({
            ...prevTotalTime,
            time: res.timeData.totalTime,
          }));
        })
        .catch((error) =>
          console.log({
            msg: "Error occured while reading from db",
            error: error,
          })
        )
        .finally(() => {
          setIsDataRetrived(true);
        });
    }
  };

  const updateInDb = async (reset = false) => {
    if (isDataRetrived && localStorage.getItem("uid")) {
      let tempTime = totalTime.time;
      if (reset) {
        tempTime = 0;
      }
      await axios
        .patch(`${apiUrl}time`, {
          uid: String(localStorage.getItem("uid")),
          startTime: String(startTime),
          started: started,
          totalTime: tempTime,
        })
        .catch((error) =>
          console.log({
            msg: "Error occured while updating in db",
            error: error,
          })
        );
    }
  };

  const handleStart = () => {
    setstartTime(Date.now());
    setStarted(true);
  };

  const handlePause = () => {
    if (startTime !== null) {
      const currentStopTime = Date.now();
      setTotalTime((prevTotalTime) => ({
        ...prevTotalTime,
        time: prevTotalTime.time + (currentStopTime - startTime) / 1000,
      }));
      setStarted((prev) => !prev);
      setIsTaggingDisabled(false);
    }
  };

  const handleNewStart = () => {
    setTotalTime({ time: 0, hours: 0, minutes: 0, seconds: 0 });
    setstartTime(null);
    setStarted(false);
    setIsTaggingDisabled(true);
    const data = {
      totalTime: { time: 0, hours: 0, minutes: 0, seconds: 0 },
      started: false,
      startTime: 0,
    };
    localStorage.setItem("timerData", JSON.stringify(data));
    updateInDb(true);
  };

  const handleLogOut = () => {
    setTotalTime({ time: 0, hours: 0, minutes: 0, seconds: 0 });
    setstartTime(null);
    setStarted(false);
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

  const handleKeydown = async (event) => {
    if (event.key === "Enter" || event.key === "Done" || event.key === "Go") {
      if (!isLoggedIn) {
        toast.info("Please login to enable tagging", {
          theme: "coloured",
        });
      } else {
        if (!localStorage.getItem("uid") || !localStorage.getItem("token")) {
          toast.info("Please login again", {
            theme: "coloured",
          });
        } else {
          const tag = event.target.value;
          event.target.value = "";
          setIsTaggingDisabled(true);
          await axios
            .post(
              `${apiUrl}tag`,
              {
                tag: tag,
                uid: String(localStorage.getItem("uid")),
                time: totalTime.time,
              },
              {
                headers: {
                  Authorization: `Bearer ${String(
                    localStorage.getItem("token")
                  )}`,
                },
              }
            )
            .then((res) => {
              handleNewStart();
              toast.success("Tagged Successfully", {
                theme: "coloured",
              });
            })
            .catch((err) => {
              event.target.value = tag;
              setIsTaggingDisabled(false);
              toast.info("Some error occured, couldn't tag", {
                theme: "coloured",
              });
            });
        }
      }
    }
  };

  return (
    <div className="w-screen h-screen text-white" id="blur">
      <Navbar isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />
      <div className="flex flex-col justify-center h-full space-y-4">
        <div className="mb-8 text-xl">
          <div>{`Hours : ${totalTime.hours}`}</div>
          <div>{`Minutes : ${totalTime.minutes}`}</div>
          <div>{`Seconds : ${totalTime.seconds}`}</div>
        </div>
        <div>
          <Button variant="contained" disabled={started} onClick={handleStart}>
            Start
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "red",
              "&:hover": { backgroundColor: "brown" },
            }}
            disabled={!started}
            onClick={handlePause}
          >
            Pause
          </Button>
        </div>
        <div>
          <Input
            color="primary"
            disabled={isTaggingDisabled}
            placeholder="Tag It"
            size="sm"
            variant="outlined"
            sx={{
              color: "white",
              borderBottom: isTaggingDisabled
                ? "1px solid gray"
                : "1px solid #DEDEDE",
            }}
            onKeyDown={handleKeydown}
            inputProps={{ maxLength: 20 }}
          />
        </div>
        <div>
          <Button
            variant="outlined"
            sx={{ color: "white", border: "1px solid #DEDEDE" }}
            onClick={handleNewStart}
          >
            Start New
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
