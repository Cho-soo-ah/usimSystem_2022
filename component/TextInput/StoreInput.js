import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import TextInputWrap from "./TextInputWrap";

export default function StoreInput(props) {
  const [data, setData] = useState("");
  useEffect(() => {
    axios
      .get("http://192.168.0.52:8080/agencies")
      .then((res) => {
        setData(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <TextInputWrap text="대리점 명">
        <Autocomplete
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
              sx={props.sx}
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
      </TextInputWrap>
    </>
  );
}
