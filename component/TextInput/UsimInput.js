import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

export default function UsimInput(props) {
  const [data, setData] = useState("");
  useEffect(() => {
    axios
      .get("http://192.168.0.52:8080/sims")
      .then((res) => {
        setData(res.data.content);
        console.log(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {data === "" ? (
        "loading"
      ) : (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={data}
          fullWidth
          noOptionsText="검색 결과가 없습니다."
          sx={{
            margin: "0 16px 0 0",
          }}
          renderInput={(params) => (
            <TextField {...params} label="유심 번호" variant={props.variant} />
          )}
          getOptionLabel={(option) => option.usimNumber}
          renderOption={(props, option, { inputValue }) => {
            const matches = match(option.usimNumber, inputValue, {
              insideWords: true,
            });
            const parts = parse(option.usimNumber, matches);
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
