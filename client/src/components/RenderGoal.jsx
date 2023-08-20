import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

function RenderGoal({ goal, setAllGoals }) {
  const time = goal.time;
  const hours = time !== 0 ? Math.floor(time / 3600) : 0;
  const minutes = time !== 0 ? Math.floor((time % 3600) / 60) : 0;
  const seconds = time !== 0 ? Math.floor(time % 60) : 0;

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleGoalDelete = async () => {
    if (!localStorage.getItem("uid")) {
      toast.info("Please login again", {
        theme: "coloured",
      });
      return;
    }
    await axios
      .delete(`${apiUrl}goal`, {
        params: { goal_id: goal._id, uid: String(localStorage.getItem("uid")) },
        headers: {
          Authorization: `Bearer ${String(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        setAllGoals(res.data.goals.goals);
        toast.success("Goal Removed", {
          theme: "coloured",
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          theme: "coloured",
        });
      });
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-left">{goal.goal}</p>
          <p className="float-left">{`${hours}:${minutes}:${seconds}`}</p>
        </div>
        <div>
          <RemoveCircleOutlineOutlinedIcon
            sx={{
              fill: "inherit",
              cursor: "pointer",
              fill: "white",
              "&:hover": { fill: "red" },
            }}
            onClick={handleGoalDelete}
          />
        </div>
      </div>
      <hr />
    </div>
  );
}

export default RenderGoal;
