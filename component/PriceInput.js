import { InputAdornment, TextField } from "@mui/material";

export default function PriceInput(props) {
  return (
    <TextField
      variant="outlined"
      label={props.children}
      value={props.value}
      onChange={props.onChange}
      align="right"
      fullWidth
      inputProps={{
        maxLength: 10,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">&#65510;</InputAdornment>
        ),
      }}
      sx={{ marginBottom: "16px", "& input": { textAlign: "right" } }}
      autoComplete="off"
    ></TextField>
  );
}
