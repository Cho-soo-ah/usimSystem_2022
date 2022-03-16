import { useState } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import TextInputWrap from "./TextInputWrap";

export default function ReasonInput(props) {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <TextInputWrap text="사유">
      <FormControl fullWidth variant={props.variant}>
        <InputLabel id="risState"></InputLabel>
        <Select
          labelId="reason"
          id="reason"
          value={value}
          label={props.label}
          onChange={handleChange}
          sx={{ mb: "12px" }}
        >
          <MenuItem value={10}>사유</MenuItem>
          <MenuItem value={20}>사유사유</MenuItem>
        </Select>
      </FormControl>
    </TextInputWrap>
  );
}
