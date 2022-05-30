import { InputAdornment, TextField } from "@mui/material";
import { Field } from "formik";

export default function PriceInput(props) {
  const replaceRegex = /\B(?=(\d{3})+(?!\d))/g;
  const deleteRegex = /[^\d]/g;
  const regex = (value) =>
    Number(del(value)).toString().replace(replaceRegex, ",");
  const del = (value) => value.toString().replace(deleteRegex, "");

  return (
    <Field name={props.name}>
      {({ form: { errors, touched, setFieldValue } }) => (
        <TextField
          fullWidth
          label={props.label}
          variant="outlined"
          value={regex(props.formik.values[props.name])}
          onChange={(e) => {
            setFieldValue(props.name, e.target.value);
          }}
          align="right"
          inputProps={{
            maxLength: 10,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">&#65510;</InputAdornment>
            ),
          }}
          sx={{
            marginBottom: "16px",
            "& input": { textAlign: "right" },
          }}
          autoComplete="off"
          error={touched[props.name] && Boolean(errors[props.name])}
          helperText={touched[props.name] && errors[props.name]}
        ></TextField>
      )}
    </Field>
  );
}
