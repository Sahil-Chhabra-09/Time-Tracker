import { useEffect } from "react";
import RenderStatusDropDown from "../../components/RenderStatusDropDown";
import CreateIcon from "@mui/icons-material/Create";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import RenderNavbar from "../../components/RenderNavbar";

function TimeTableComponent({ props }) {
  const { Tasks, setStage, statusArray, setStatusArray, updateStatusInDb } =
    props;

  useEffect(() => {
    updateStatusInDb();
  }, [statusArray]);

  const status = [
    {
      value: 0,
      label: "Pending",
    },
    {
      value: 1,
      label: "In-Progress",
    },
    {
      value: 2,
      label: "Completed",
    },
  ];

  const handleOptionChange = (newVal, index) => {
    const updatedStatus = [...statusArray];
    updatedStatus[index] = deCode(newVal);
    setStatusArray(updatedStatus);
  };

  const deCode = (val) => {
    if (val === "Pending") return 0;
    if (val === "In-Progress") return 1;
    if (val === "Completed") return 2;
  };

  const enCode = (val) => {
    if (val === 0) return "Pending";
    if (val === 1) return "In-Progress";
    if (val === 2) return "Completed";
  };

  const handleRestart = () => {
    setStatusArray(Array.from({ length: Tasks.length }, () => 0));
  };

  return (
    <div id="blur">
      <RenderNavbar />
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col w-4/5">
          <div className="flex justify-end my-2">
            <span onClick={() => setStage("first")}>
              <CreateIcon
                sx={{
                  fill: "white",
                  cursor: "pointer",
                  "&:hover": { fill: "yellowgreen" },
                }}
              />
            </span>
            <span onClick={handleRestart} className="text-white">
              <RestartAltIcon
                sx={{
                  fill: "white",
                  cursor: "pointer",
                  "&:hover": { fill: "yellowgreen" },
                }}
              />
            </span>
          </div>
          {Tasks.map((ele, index) => {
            return (
              <div className="h-full flex" key={ele}>
                <div className="w-1/4 border-2 text-white flex justify-center items-center">
                  {ele.split(",")[0]}
                </div>
                <div className="w-1/4 border-2 text-white flex justify-center items-center">
                  {ele.split(",")[1]}
                </div>
                <div className="w-1/4 border-2 text-white flex justify-center items-center">
                  {ele.split(",")[2]}
                </div>
                <div className="w-1/4 border-2 text-white flex justify-center items-center">
                  <RenderStatusDropDown
                    options={status}
                    handleOptionChange={handleOptionChange}
                    index={index}
                    optValue={enCode(statusArray[index])}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TimeTableComponent;
