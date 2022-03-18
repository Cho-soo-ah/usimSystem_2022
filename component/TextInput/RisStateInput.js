import { useState } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import TextInputWrap from "./TextInputWrap";
import { useRecoilState } from "recoil";
import { risState } from "../../src/Recoil/atoms";

export default function RisStateInput(props) {
  const [risValue, setRisValue] = useRecoilState(risState);

  return (
    <TextInputWrap text="RIS 처리 여부">
      <FormControl fullWidth variant={props.variant}>
        <InputLabel id="risState"></InputLabel>
        <Select
          labelId="risState"
          id="risState"
          label={props.label}
          value={risValue}
          onChange={(e) => setRisValue(e.target.value)}
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
