import { useState } from "react";
import { InputLabel, MenuItem, TextField } from "@mui/material";
import { Field } from "formik";

export default function RisStateInput() {
  const [risValue, setRisValue] = useState("");
  const names = "ris";

  return (
    <Field name={names}>
      {({ form: { setFieldValue } }) => {
        return (
          <>
            <InputLabel id={names}></InputLabel>
            <TextField
              fullWidth
              select
              id={names}
              sx={{ mb: "12px" }}
              value={risValue}
              onChange={(e) => {
                setRisValue(e.target.value);
                setFieldValue(names, e.target.value);
              }}
              autoComplete="off"
            >
              <MenuItem value="완료" key={1} InputLabel={1}>
                완료
              </MenuItem>
              <MenuItem value="미완" key={2} InputLabel={2}>
                미완
              </MenuItem>
            </TextField>
          </>
        );
      }}
    </Field>
  );
}
