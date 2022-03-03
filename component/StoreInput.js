import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";

const option = [
  { label: "(경산)글로벌abc" },
  { label: "(광양매천) 중국식품" },
  { label: "(이천)외국인마트" },
  { label: "(광양매천) 중국식품" },
  { label: "(경산)글로벌abc" },
  { label: "(광양매천) 중국식품" },
  { label: "(경산)글로벌abc" },
  { label: "(광양매천) 중국식품" },
  { label: "(경산)글로벌abc" },
  { label: "(광양매천) 중국식품" },
  { label: "(경산)글로벌abc" },
  { label: "(광양매천) 중국식품" },
  { label: "(경산)글로벌abc" },
  { label: "(광양매천) 중국식품" },
  { label: "(경산)글로벌abc" },
  { label: "(광양매천) 중국식품" },
];
export default function StoreInput() {
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={option}
        fullWidth
        sx={{ marginTop: "16px" }}
        renderInput={(params) => <TextField {...params} label="대리점 대행" />}
      />
    </>
  );
}
