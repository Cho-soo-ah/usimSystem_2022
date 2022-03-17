import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import TextInputWrap from "./TextInputWrap";

export default function UsimInput(props) {
  const [data, setData] = useState("");
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
      <TextInputWrap text="유심 정보">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={data}
          fullWidth
          noOptionsText="검색 결과가 없습니다."
          sx={{
            mb: "12px",
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={props.label}
              variant={props.variant}
            />
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
      </TextInputWrap>
    </>
  );
}
