import * as React from "react";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";

const filter = createFilterOptions();
const option = [
  { label: "01012341234" },
  { label: "01056785678" },
  { label: "01051531503" },
  { label: "01012010102" },
  { label: "01015656162" },
  { label: "51651648981238" },
  { label: "0156804661060650" },
];

export default function BarcodePhoneInput() {
  const [value, setValue] = React.useState(null);
  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setValue({
              label: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              label: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.label
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              label: `"${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={option}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.label;
        }}
        renderOption={(props, option) => <li {...props}>{option.label}</li>}
        sx={{ marginTop: 2 }}
        fullWidth
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="바코드 번호 / 핸드폰 번호" />
        )}
      />
    </>
  );
}
