import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useState } from "react";

export default function TableProductInput() {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <FormControl
      sx={{ width: "100%", margin: "0 16px 0 0" }}
      variant="standard"
    >
      <InputLabel id="product" sx={{ textIndent: "10px", fontSize: "14px" }}>
        상품
      </InputLabel>
      <Select
        labelId="product"
        id="product"
        value={value}
        label="상품"
        onChange={handleChange}
        sx={{ textIndent: "10px" }}
      >
        <MenuItem value={10}>825SIM 330</MenuItem>
      </Select>
    </FormControl>
  );
}
