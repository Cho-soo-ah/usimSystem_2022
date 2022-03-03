import { Autocomplete, TextField } from "@mui/material";

const option = [{ label: "aa" }, { label: "bb" }];
export default function TableReasonInput() {
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
            label="사유"
            variant="standard"
            sx={{ "& .MuiInput-input": { textIndent: "10px" } }}
          />
        )}
      />
    </>
  );
}
