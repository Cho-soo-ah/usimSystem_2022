import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import TextInputWrap from "./TextInputWrap";

export default function StoreInput(props) {
  const [data, setData] = useState("");
  const [value, setValue] = useState("");
  useEffect(() => {
    axios
      .get("http://192.168.0.52:8080/agencies")
      .then((res) => {
        setData(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  const Placeholder = () => (
    <Autocomplete
      size={props.size}
      options={data}
      fullWidth
      noOptionsText="검색 결과가 없습니다."
      sx={{
        mb: props.placeholder ? props.sx : "12px",
      }}
      onChange={(e, newValue) => {
        props.wrap ? setValue(newValue) : null;
        props.wrap ? props.wrap(newValue) : null;
        setValue(newValue);
        console.log("storeInput", value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          value={value}
          label={props.label}
          variant={props.variant}
          sx={props.sx}
          InputLabelProps={props.InputLabelProps}
        />
      )}
      getOptionLabel={(option) => {
        return option.name ? option.name : "";
      }}
      renderOption={(obj, option, { inputValue }) => {
        const matches = match(option.name, inputValue, {
          insideWords: true,
        });
        const parts = parse(option.name, matches);
        return (
          <li {...obj}>
            {parts.map((part, index) => (
              <span
                key={index}
                style={{
                  fontWeight: part.highlight ? 700 : 400,
                  fontSize: props.wrap ? "14px" : props.sx,
                }}
              >
                {part.text}
              </span>
            ))}
          </li>
        );
      }}
    />
  );
  return (
    <>
      {props.placeholder || props.wrap ? (
        <Placeholder />
      ) : (
        <TextInputWrap text="대리점 명">
          <Placeholder />
        </TextInputWrap>
      )}
    </>
  );
}
