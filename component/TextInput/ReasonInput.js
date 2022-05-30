import { InputLabel, MenuItem, TextField } from "@mui/material";
import { Field } from "formik";

export default function ReasonInput(props) {
  const names = "reason";

  return (
    <Field name={names}>
      {({ field, form: { setFieldValue } }) => {
        return (
          <>
            <InputLabel id={names}></InputLabel>
            <TextField
              fullWidth
              select
              id={names}
              sx={{ mb: "12px" }}
              value={field.value}
              onChange={(e) => {
                setFieldValue(names, e.target.value);
              }}
              autoComplete="off"
            >
              <MenuItem value="사유1" key={1} InputLabel={1}>
                사유1
              </MenuItem>
              <MenuItem value="사유2" key={2} InputLabel={2}>
                사유2
              </MenuItem>
            </TextField>
          </>
        );
      }}
    </Field>
  );
}
