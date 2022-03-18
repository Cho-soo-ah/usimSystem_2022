import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import TextInputWrap from "./TextInputWrap";
import { useRecoilState } from "recoil";
import { productState } from "../../src/Recoil/atoms";

export default function ProductInput(props) {
  const [data, setData] = useState("");
  const [productValue, setProductValue] = useRecoilState(productState);

  useEffect(() => {
    axios
      .get("http://192.168.0.52:8080/products")
      .then((res) => {
        setData(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  const Placeholder = () => (
    <Autocomplete
      options={data}
      fullWidth
      noOptionsText="검색 결과가 없습니다."
      sx={{
        mb: props.placeholder ? "16px" : "12px",
      }}
      value={productValue}
      onChange={(e, newValue) => {
        setProductValue(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          variant={props.variant}
          sx={props.sx}
        />
      )}
      getOptionLabel={(option) => (option ? option.name : "")}
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
  );
  return (
    <>
      {props.placeholder ? (
        <Placeholder />
      ) : (
        <TextInputWrap text="상품">
          <Placeholder />
        </TextInputWrap>
      )}
    </>
  );
}
