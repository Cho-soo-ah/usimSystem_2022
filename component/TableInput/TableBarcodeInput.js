import * as React from "react";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

export default function TableBarcodeInput() {
  const filter = createFilterOptions();

  const [value, setValue] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("http://192.168.0.52:8080/sims")
      .then((res) => {
        setData(res.data.content);
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
          onChange={(e, newValue) => {
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
            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="free-solo-with-text-demo"
          options={data}
          renderInput={(params) => (
            <TextField
              {...params}
              label="바코드 번호 / 핸드폰 번호"
              variant="standard"
              sx={{ "& .MuiInput-input": { textIndent: "10px" } }}
            />
          )}
          getOptionLabel={(option) =>
            `${option.barcodeNumber} / ${option.serviceNumber}`
          }
          renderOption={(props, option, { inputValue }) => {
            const matches = match(
              `${option.barcodeNumber} / ${option.serviceNumber}`,
              inputValue,
              {
                insideWords: true,
              }
            );
            const parts = parse(
              `${option.barcodeNumber} / ${option.serviceNumber}`,
              matches
            );
            return (
              <li {...props}>
                <div>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              </li>
            );
          }}
          sx={{
            margin: "0 16px 0 0",
            "& .MuiInputLabel-root": { fontSize: "14px", textIndent: "10px" },
          }}
          fullWidth
        />
      )}
    </>
  );
}
