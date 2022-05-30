import * as React from "react";
import { TextField } from "@mui/material";
import { Field } from "formik";

export default function DepositInput() {
  const names = "deposit";

  return (
    <Field name={names}>
      {({ field, form: { setFieldValue } }) => {
        return (
          <TextField
            id="outlined-basic"
            fullWidth
            sx={{ mb: "12px" }}
            value={field.value}
            onChange={(e) => {
              setFieldValue(names, e.target.value);
            }}
            autoComplete="off"
          />
        );
      }}
    </Field>
  );
}
