import { useState } from "react";
import { InputLabel, MenuItem, TextField } from "@mui/material";
import { Field } from "formik";

export default function RisStateInput(props) {
  const [risValue, setRisValue] = useState("");
  const names = "ris";

  return (
    <Field name={names}>
      {({ values, handleChange }) => {
        return (
          <>
            <InputLabel id={names}></InputLabel>
            <TextField
              fullWidth
              select
              id={names}
              sx={{ mb: "12px" }}
              value={values}
              onChange={handleChange}
              autoComplete="off"
            >
              <MenuItem value={10} key={1} InputLabel={1}>
                완료
              </MenuItem>
              <MenuItem value={20} key={2} InputLabel={2}>
                미완
              </MenuItem>
            </TextField>
          </>
        );
      }}
    </Field>
  );
}
