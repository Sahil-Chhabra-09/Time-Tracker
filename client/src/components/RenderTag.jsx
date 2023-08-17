import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

function RenderTag({ tag, setAllTags }) {
  const time = tag.time;
  const hours = time !== 0 ? Math.floor(time / 3600) : 0;
  const minutes = time !== 0 ? Math.floor((time % 3600) / 60) : 0;
  const seconds = time !== 0 ? Math.floor(time % 60) : 0;

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleTagDelete = async () => {
    if (!localStorage.getItem("uid")) {
      toast.info("Please login again", {
        theme: "coloured",
      });
      return;
    }
    await axios
      .delete(`${apiUrl}tag`, {
        params: { tag_id: tag._id, uid: String(localStorage.getItem("uid")) },
        headers: {
          Authorization: `Bearer ${String(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        setAllTags(res.data.tags.tags);
        toast.success("Tagged Removed", {
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
        <div>
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
      <hr />
    </div>
  );
}

export default RenderTag;
