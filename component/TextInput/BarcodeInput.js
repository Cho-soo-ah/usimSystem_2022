import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

export default function BarcodeInput(props) {
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
      {data === "" ? (
        "loading"
      ) : (
        <Autocomplete
          fullWidth
          options={data}
          noOptionsText="검색 결과가 없습니다."
          renderInput={(params) => (
            <TextField
              {...params}
              label="바코드 번호 / 핸드폰 번호"
              variant={props.variant}
              sx={{ mb: "16px", minHeight: "35px" }}
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
            // "& .MuiInputLabel-root": { fontSize: "14px", textIndent: "10px" },
          }}
        />
      )}
    </>
  );
}
