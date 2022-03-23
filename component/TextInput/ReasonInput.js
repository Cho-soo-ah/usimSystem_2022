import { useState } from "react";
import { InputLabel, MenuItem, TextField } from "@mui/material";
import { Field } from "formik";

export default function ReasonInput(props) {
  const [reasonValue, setReasonValue] = useState("");
  const names = "reason";

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
                사유
              </MenuItem>
              <MenuItem value={20} key={2} InputLabel={2}>
                사유사유
              </MenuItem>
            </TextField>
          </>
        );
      }}
    </Field>
  );
}
