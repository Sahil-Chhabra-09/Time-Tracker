import { useEffect, useState } from "react";
import TimeTableComponent from "./TimeTableComponent";
import { markDownTimeTable } from "./staticTimeTable";
import { Button, Input } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import RenderNavbar from "../../components/RenderNavbar";

function TimeTableContainer() {
  const [stage, setStage] = useState("first");
  // const [showInstruction, setShowInstruction] = useState(false);
  const [timeTableData, setTimeTableData] = useState(markDownTimeTable);
  const [statusArray, setStatusArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  const getTimeTable = async () => {
    try {
      setIsLoading(true);
      await axios
        .get(`${apiUrl}tt`, {
          params: { uid: String(localStorage.getItem("uid")) },
          headers: {
            Authorization: `Bearer ${String(localStorage.getItem("token"))}`,
          },
        })
        .then((res) => {
          setTimeTableData(res.data.timeTable.tt);
          setStatusArray(res.data.timeTable.status);
          setStage("second");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.log("error occured while getting time table");
    }
  };

  useEffect(() => {
    getTimeTable();
  }, []);

  const isValidTimeTable = async () => {
    let isValid = true;
    timeTableData.split(";").forEach((ele) => {
      if (ele.trim().split(",").length !== 3) {
        isValid = false;
        toast.warn(`Invalid line ${ele}`);
      }
    });
    return isValid;
  };

  const handleSubmit = async () => {
    const isValid = await isValidTimeTable();
    if (!isValid) {
      return;
    }
    try {
      await axios
        .post(
          `${apiUrl}tt`,
          {
            uid: localStorage.getItem("uid"),
            timeTable: timeTableData,
          },
          {
            headers: {
              Authorization: `Bearer ${String(localStorage.getItem("token"))}`,
            },
          }
        )
        .then((res) => {
          setStage("second");
        });
    } catch (error) {
      console.log("error occured while uploading time table");
    }
  };

  const updateStatusInDb = async () => {
    try {
      await axios
        .patch(
          `${apiUrl}tt`,
          {
            uid: localStorage.getItem("uid"),
            statusArray: statusArray,
          },
          {
            headers: {
              Authorization: `Bearer ${String(localStorage.getItem("token"))}`,
            },
          }
        )
        .then((res) => {
          setStage("second");
        });
    } catch (error) {
      console.log("error occured while uploading time table");
    }
  };

  if (isLoading) {
    return <div id="blur"></div>;
  }

  if (stage === "second") {
    return (
      <TimeTableComponent
        props={{
          Tasks: timeTableData.split(";"),
          setStage,
          statusArray,
          setStatusArray,
          updateStatusInDb,
        }}
      />
    );
  }

  return (
    <div id="blur">
      <RenderNavbar />
      <div className="h-full flex justify-center items-center flex-col">
        <Input
          multiline
          sx={{ color: "white", minHeight: "20vh", padding: "10px" }}
          className="border-2 border-white rounded-md w-4/5 md:w-2/4"
          // onFocus={() => {
          //   setShowInstruction(true);
          // }}
          // onBlur={() => {
          //   setShowInstruction(false);
          // }}
          value={`${timeTableData}`}
          onChange={(e) => setTimeTableData(e.target.value)}
        />
        <div className="mt-4 w-4/5 md:w-2/4">
          <div className="border-2 w-max float-right rounded-2xl">
            <Button
              sx={{
                color: "white",
                "&:hover": { color: "white" },
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
          {true && (
            <span className="float-left text-white opacity-50 ml-2 w-3/5 md:w-3/4">
              <span className="float-left text-left">
                Enter your time table in the same format as shown :
              </span>
              <br />
              <span className="float-left text-left">
                Tag, Start Time, End Time;
              </span>
              <br />
              <span className="float-left text-left">
                (,) denotes column seperation and (;) denotes row seperation
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default TimeTableContainer;
