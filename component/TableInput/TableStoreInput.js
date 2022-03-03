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
export default function TableStoreInput() {
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={option}
        fullWidth
        sx={{
          margin: "0 16px 0 0",
          "& .MuiInputLabel-root": { fontSize: "14px", textIndent: "10px" },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="대리점 명"
            variant="standard"
            sx={{ "& .MuiInput-input": { textIndent: "10px" } }}
          />
        )}
      />
    </>
  );
}
