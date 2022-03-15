import { useState } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import TextInputWrap from "./TextInputWrap";

export default function RisStateInput(props) {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <TextInputWrap text="RIS 처리 여부">
      <FormControl fullWidth variant={props.variant}>
        <InputLabel id="risState"></InputLabel>
        <Select
          labelId="risState"
          id="risState"
          value={value}
          label={props.label}
          onChange={handleChange}
          sx={{ mb: "12px" }}
        >
          <MenuItem value={10} sx={{ minHeight: "38px" }}>
            완료
          </MenuItem>
          <MenuItem value={20} sx={{ minHeight: "38px" }}>
            미완
          </MenuItem>
        </Select>
      </FormControl>
    </TextInputWrap>
  );
}
