import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const authToken = useSelector((state) => state.auth.token);
  const uid = useSelector((state) => state.auth.uid);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentTime, setCurrentTime] = useState(Date.now());
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
    setInterval(() => {
      setCurrentTime(Date.now());
    }, [900]);
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
    updateInDb();
  }, [started]);

  useEffect(() => {
    if (totalTime.time > 0) {
      const data = {
        totalTime: totalTime,
        started: started,
        startTime: startTime,
      };
      localStorage.setItem("timerData", JSON.stringify(data));
    }
  }, [totalTime, started, startTime]);

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
        .then((res) => {
          console.log("Updated data", res);
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
    setStarted((prev) => !prev);
  };

  const handleStop = () => {
    if (startTime !== null) {
      const currentStopTime = Date.now();
      setTotalTime((prevTotalTime) => ({
        ...prevTotalTime,
        time: prevTotalTime.time + (currentStopTime - startTime) / 1000,
      }));
      setStarted((prev) => !prev);
    }
  };

  const handleNewStart = () => {
    setTotalTime({ time: 0, hours: 0, minutes: 0, seconds: 0 });
    setstartTime(null);
    setStarted(false);
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
    toast.success("Logged out successfully!", { position: "bottom-left" });
  };

  const navigateToLogin = () => {
    navigate("/auth");
  };

  return (
    <div className="bg-cyan-900 w-screen h-screen text-white">
      <div className="flex justify-between">
        <div className="w-max p-2">
          {new Date(currentTime).toString().split("(")[0]}
        </div>
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
      <div className="flex flex-col h-3/5 justify-center space-y-4">
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
            onClick={handleStop}
          >
            Stop
          </Button>
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
