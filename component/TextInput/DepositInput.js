import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import TextInputWrap from "./TextInputWrap";

export default function DepositInput(props) {
  const [data, setData] = useState("");
  useEffect(() => {
    axios
      //
      //
      //  데이터 링크 변경해야함
      //
      //
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
      <TextInputWrap text="입금자 명">
        {data === "" ? (
          "loading"
        ) : (
          <Autocomplete
            options={data}
            fullWidth
            noOptionsText="검색 결과가 없습니다."
            sx={{
              mb: "12px",
            }}
            renderInput={(params) => (
              <TextField {...params} label={props.label} variant="outlined" />
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
      </TextInputWrap>
    </>
  );
}
