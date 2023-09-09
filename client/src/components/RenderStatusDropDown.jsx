import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

function RenderStatusDropDown({
  options,
  optValue = "Pending",
  handleOptionChange,
  index,
}) {
  const onChangeHandler = (e) => {
    handleOptionChange(e.target.value, index);
  };

  if (index === 0) {
    return <div className="h-16 flex justify-center items-center">Status</div>;
  }
  return (
    <Box sx={{ m: 1, width: "max-content" }}>
      <div>
        <TextField
          select
          label="Status"
          variant="filled"
          InputLabelProps={{
            style: { color: "black" },
          }}
          style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          value={optValue}
          onChange={onChangeHandler}
        >
          {options.map((option) => (
            <MenuItem key={option.label} value={option.label}>
              <span>{option.label}</span>
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}

export default RenderStatusDropDown;
