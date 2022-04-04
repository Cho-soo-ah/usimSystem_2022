import * as React from "react";
import TextField from "@mui/material/TextField";
import { Field } from "formik";

export default function CustomFormikInput(props) {
  return (
    <>
      <Field name={props.name}>
        {({ form: { errors, touched, setFieldValue } }) => (
          <TextField
            fullWidth
            autoComplete="off"
            label={props.label}
            type={props.type}
            value={props.formik.values[props.name]}
            onChange={(e) => setFieldValue(props.name, e.target.value)}
            inputProps={props.inputProps}
            sx={props.sx ? props.sx : { marginBottom: "16px" }}
            error={touched[props.name] && Boolean(errors[props.name])}
            helperText={touched[props.name] && errors[props.name]}
          />
        )}
      </Field>
    </>
  );
}
