import { Button, Input } from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

function GoalFlow({ setShowGoalModal }) {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [tag, setTag] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);

  const handleHoursChange = (event) => {
    if (event.target.value === "") {
      setHours("");
    } else {
      let hh = parseInt(event.target.value);
      if (hh > 23) {
        hh = 23;
      }
      setHours(hh);
    }
  };

  const handleMinutesChange = (event) => {
    if (event.target.value === "") {
      setMinutes("");
    } else {
      let mm = parseInt(event.target.value);
      if (mm > 59) {
        mm = 59;
      }
      setMinutes(mm);
    }
  };

  const handleSecondsChange = (event) => {
    if (event.target.value === "") {
      setSeconds("");
    } else {
      let ss = parseInt(event.target.value);
      if (ss > 59) {
        ss = 59;
      }
      setSeconds(ss);
    }
  };

  const handleKeyDown = (e, nextRef, prevRef) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      nextRef.current.focus();
    } else if (e.key === "Backspace" && e.target.value === "") {
      e.preventDefault();
      prevRef.current.focus();
    }
  };

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const handleCancel = () => {
    setShowGoalModal(false);
  };

  const handleSubmit = async () => {
    if (hours === "" || minutes === "" || seconds === "" || tag === "") {
      toast.info("Please complete the form");
    } else {
      let totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
      if (!localStorage.getItem("uid") || !localStorage.getItem("token")) {
        toast.info("Please login to add goals", {
          theme: "coloured",
        });
      } else {
        await axios
          .post(
            `${apiUrl}goal`,
            {
              tag: tag,
              uid: String(localStorage.getItem("uid")),
              time: totalTimeInSeconds,
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
            toast.success("Goal added", {
              theme: "coloured",
            });
            setShowGoalModal(false);
          })
          .catch((err) => {
            toast.info("Some error occured, couldn't tag", {
              theme: "coloured",
            });
          });
      }
    }
  };

  return (
    <div className="bg-ocean w-3/4 md:w-1/3 h-1/2 flex flex-col relative p-2 rounded-md">
      <div className="text-white shadow-lg p-2 text-center">Add Goal</div>
      <Input
        placeholder="Goal Tag"
        className="bg-mint p-2 mt-12 rounded-md md:w-3/4 mx-auto"
        value={tag}
        onChange={handleTagChange}
      />
      <div className="flex justify-center space-x-2">
        <Input
          inputRef={hoursRef}
          placeholder="HH"
          className="bg-mint p-2 mt-12 rounded-md w-12"
          onChange={handleHoursChange}
          onKeyDown={(e) => handleKeyDown(e, minutesRef, hoursRef)}
          value={hours}
        />
        <Input
          inputRef={minutesRef}
          placeholder="MM"
          className="bg-mint p-2 mt-12 rounded-md w-12"
          onChange={handleMinutesChange}
          onKeyDown={(e) => handleKeyDown(e, secondsRef, hoursRef)}
          value={minutes}
        />
        <Input
          inputRef={secondsRef}
          placeholder="SS"
          className="bg-mint p-2 mt-12 rounded-md w-12"
          onChange={handleSecondsChange}
          onKeyDown={(e) => handleKeyDown(e, secondsRef, minutesRef)}
          value={seconds}
        />
      </div>
      <div className="flex justify-around absolute bottom-2 w-full ">
        <Button
          sx={{ border: "1px solid red", color: "white" }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          sx={{ border: "1px solid white", color: "white" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default GoalFlow;
