import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

export default function TableStoreInput() {
  const [agencies, setAgencies] = useState();
  useEffect(() => {
    axios
      .get("http://192.168.0.52:8080/agencies")
      .then((res) => {
        setAgencies(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {agencies === null ? (
        "loading"
      ) : (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={agencies}
          fullWidth
          sx={{
            margin: "0 16px 0 0",
            "& .MuiInputLabel-root": { fontSize: "14px", textIndent: "10px" },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="대리점 명"
              variant="standard"
              sx={{ "& .MuiInput-input": { textIndent: "10px" } }}
            />
          )}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { inputValue }) => {
            const matches = match(option.name, inputValue, {
              insideWords: true,
            });
            const parts = parse(option.name, matches);
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
        />
      )}
    </>
  );
}
