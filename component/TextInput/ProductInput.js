import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import TextInputWrap from "./TextInputWrap";
import { useRecoilState } from "recoil";
import { productState } from "../../src/Recoil/atoms";
import { Field } from "formik";

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
  const Placeholder = (forms) => (
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
        props.placeholder && forms.setFieldValue(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          variant={props.variant}
          sx={props.sx}
          error={
            props.placeholder
              ? forms.touched[props.name] && Boolean(forms.errors[props.name])
              : null
          }
          helperText={
            props.placeholder
              ? forms.touched[props.name] && "상품명을 입력해주세요"
              : null
          }
          autoComplete="off"
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
        <Field name={props.name}>
          {({ form: { touched, errors, setFieldValue } }) => {
            return (
              props.placeholder && (
                <Placeholder
                  touched={touched}
                  errors={errors}
                  setFieldValue={setFieldValue}
                />
              )
            );
          }}
        </Field>
      ) : (
        <TextInputWrap text="상품">
          <Placeholder />
        </TextInputWrap>
      )}
    </>
  );
}
