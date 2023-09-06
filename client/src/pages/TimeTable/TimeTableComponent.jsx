import { timeTable } from "./staticTimeTable";

function TimeTableComponent({ props }) {
  // const { preProcessRow } = props;
  return (
    <div className="w-full h-full flex justify-center items-center mt-12">
      <div className="flex flex-col w-4/5">
        {timeTable.split(";").map((ele) => {
          return (
            <div className="h-full flex">
              <div className="w-1/4 border-2 ">{ele.split(",")[0]}</div>
              <div className="w-1/4 border-2 ">{ele.split(",")[1]}</div>
              <div className="w-1/4 border-2 ">{ele.split(",")[2]}</div>
              <div className="w-1/4 border-2 ">Status</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TimeTableComponent;
