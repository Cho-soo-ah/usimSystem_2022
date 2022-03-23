import * as React from "react";
import { TextField } from "@mui/material";
import { useState } from "react";
import { Field } from "formik";

export default function DepositInput() {
  const [depositValue, setDepositValue] = useState("");
  const names = "deposit";

  return (
    <Field name={names}>
      {({ form: { setFieldValue } }) => {
        return (
          <TextField
            id="outlined-basic"
            fullWidth
            sx={{ mb: "12px" }}
            value={depositValue}
            onChange={(e, newValue) => {
              if (newValue) setFieldValue(names, newValue.name);
              else setFieldValue(names, "");
            }}
            autoComplete="off"
          />
        );
      }}
    </Field>
  );
}
