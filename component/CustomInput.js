import * as React from "react";
import TextField from "@mui/material/TextField";
import { Field } from "formik";

export default function CustomInput(props) {
  return (
    <>
      <Field name={props.name}>
        {({ field, form: { touched, errors } }) => {
          return (
            <TextField
              fullWidth
              id={props.name}
              name={props.name}
              label={props.children}
              type={props.type}
              value={field.value}
              onChange={field.onChange}
              error={touched[props.name] && Boolean(errors[props.name])}
              helperText={touched[props.name] && errors[props.name]}
              sx={props.sx}
              autoComplete="off"
            />
          );
        }}
      </Field>
    </>
  );
}
