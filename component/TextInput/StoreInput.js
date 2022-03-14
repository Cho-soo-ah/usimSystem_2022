import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

export default function StoreInput(props) {
  const [agencies, setAgencies] = useState("");
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
      {agencies === "" ? (
        "loading"
      ) : (
        <Autocomplete
          options={agencies}
          fullWidth
          noOptionsText="검색 결과가 없습니다."
          sx={{
            margin: "0 16px 0 0",
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="대리점 명"
              variant={props.variant}
              sx={{ mb: "16px", minHeight: "35px" }}
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
