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
          options={data}
          noOptionsText="검색 결과가 없습니다."
          renderInput={(params) => (
            <TextField
              {...params}
              label="바코드 번호 / 서비스 번호"
              variant="outlined"
              size="small"
              sx={{ mb: "12px", width: "140px", fontSize: "12px" }}
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
        />
      )}
    </>
  );
}
