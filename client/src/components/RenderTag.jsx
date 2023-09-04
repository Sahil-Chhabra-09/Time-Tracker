import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function RenderTag({ tag, setAllTags, isGoals = false }) {
  let time;
  let completedTime;
  let progressPercentage;
  if (isGoals) {
    time = tag.reqTime;
    completedTime = tag.time;
    if (completedTime >= time) {
      progressPercentage = 100;
    } else {
      progressPercentage = (completedTime / time) * 100;
    }
  } else {
    time = tag.time;
  }
  const hours = time !== 0 ? Math.floor(time / 3600) : 0;
  const minutes = time !== 0 ? Math.floor((time % 3600) / 60) : 0;
  const seconds = time !== 0 ? Math.floor(time % 60) : 0;

  const apiUrl = process.env.REACT_APP_API_URL;

  const progressBarStyle = {
    width: `${progressPercentage}%`,
    height: "5px", // Adjust height as needed
    backgroundColor: "greenyellow", // Change color as needed
    transition: "width 0.5s ease-in-out", // Add a smooth transition
  };

  const handleTagDelete = async (event) => {
    event.stopPropagation();
    if (!localStorage.getItem("uid")) {
      toast.info("Please login again", {
        theme: "coloured",
      });
      return;
    }
    await axios
      .delete(`${apiUrl}${isGoals ? "goal" : "tag"}`, {
        params: { tag_id: tag._id, uid: String(localStorage.getItem("uid")) },
        headers: {
          Authorization: `Bearer ${String(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (isGoals) {
          setAllTags(res.data.goals.goals);
        } else {
          setAllTags(res.data.tags.tags);
        }
        toast.success(`${isGoals ? "Goal" : "Tag"} Removed`, {
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
          <p className="text-left">{tag.tag}</p>
          <p className="float-left">{`${hours}:${minutes}:${seconds}`}</p>
        </div>
        <div className="space-x-2">
          {isGoals && completedTime >= time && (
            <TaskAltIcon
              sx={{
                fill: "inherit",
                fill: "greenyellow",
              }}
            />
          )}
          <RemoveCircleOutlineOutlinedIcon
            sx={{
              fill: "inherit",
              cursor: "pointer",
              fill: "white",
              "&:hover": { fill: "red" },
            }}
            onClick={handleTagDelete}
          />
        </div>
      </div>
      <div className="space-y-1">
        {isGoals && <hr style={progressBarStyle} />}
        <hr />
      </div>
    </div>
  );
}

export default RenderTag;
