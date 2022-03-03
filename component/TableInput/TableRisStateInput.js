import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useState } from "react";

export default function TableRisStateInput() {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <FormControl sx={{ width: "50%", margin: "0 16px 0 0" }} variant="standard">
      <InputLabel id="risState" sx={{ textIndent: "10px", fontSize: "14px" }}>
        RIS 처리 여부
      </InputLabel>
      <Select
        labelId="risState"
        id="risState"
        value={value}
        label="RIS 처리 여부"
        onChange={handleChange}
        sx={{ textIndent: "10px" }}
      >
        <MenuItem value={10}>완료</MenuItem>
        <MenuItem value={20}>미완</MenuItem>
      </Select>
    </FormControl>
  );
}
