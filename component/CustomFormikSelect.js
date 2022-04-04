import * as React from "react";
import { Field } from "formik";
import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";

export default function CustomFormikSelect(props) {
  return (
    <Field name={props.name}>
      {({ field, form: { errors, touched, setFieldValue } }) => {
        return (
          <FormControl
            fullWidth
            disabled={props.disabled}
            sx={{ marginBottom: "16px" }}
            error={touched[props.name] && Boolean(errors[props.name])}
          >
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select
              label={props.label}
              value={field.value}
              onChange={
                props.onChange
                  ? props.onChange
                  : (e) => {
                      setFieldValue(props.name, e.target.value);
                    }
              }
              multiple={props.multiple}
            >
              {props.children}
            </Select>
            <FormHelperText sx={{ lineHeight: 2.2, mt: 0 }}>
              {touched[props.name] && errors[props.name]}
            </FormHelperText>
          </FormControl>
        );
      }}
    </Field>
  );
}
