import * as React from "react";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";

export default function TableDepositInput() {
  const filter = createFilterOptions();

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(null);
  useEffect(() => {
    axios
      .get("http://192.168.0.52:8080/sims")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {data === null ? (
        "loading"
      ) : (
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              setValue({
                label: newValue,
              });
            } else if (newValue && newValue.inputValue) {
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
            const isExisting = options.some(
              (option) => inputValue === option.label
            );

            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="free-solo-with-text-demo"
          options={data}
          getOptionLabel={(option) => {
            console.log("option", option);
            if (typeof option === "string") {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            return option.serviceNumber;
          }}
          renderOption={(props, option) => (
            <li {...props}>{option.serviceNumber}</li>
          )}
          sx={{
            margin: "0 16px 0 0",
            "& .MuiInputLabel-root": { fontSize: "14px", textIndent: "10px" },
          }}
          fullWidth
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              label="입금자"
              variant="standard"
              sx={{ "& .MuiInput-input": { textIndent: "10px" } }}
            />
          )}
        />
      )}
    </>
  );
}
