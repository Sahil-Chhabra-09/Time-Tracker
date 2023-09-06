import TimeTableComponent from "./TimeTableComponent";
function TimeTableContainer() {
  const preProcessTimeTable = () => {
    console.log("Pre-processing Time Table Data");
  };
  return <TimeTableComponent props={{ preProcessTimeTable }} />;
}

export default TimeTableContainer;
