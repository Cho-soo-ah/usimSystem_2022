import axios from "axios";
import { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { Field } from "formik";

export default function ProductInput(props) {
  const [data, setData] = useState([]);
  const names = "product";

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
      size={props.size}
      options={data}
      fullWidth
      noOptionsText="검색 결과가 없습니다."
      sx={{
        mb: props.search ? "12px" : "16px",
      }}
      value={forms.field.value ? forms.field.value : null}
      onChange={(e, newValue) => {
        if (newValue) forms.setFieldValue(names, newValue);
        else forms.setFieldValue(names, null);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          variant={props.variant}
          sx={props.sx}
          error={forms.touched[names] && Boolean(forms.errors[names])}
          helperText={forms.touched[names] && forms.errors[names]}
          autoComplete="off"
        />
      )}
      getOptionLabel={(option) => option.name}
      renderOption={(obj, option, { inputValue }) => {
        const matches = match(option.name, inputValue, {
          insideWords: true,
        });
        const parts = parse(option.name, matches);
        return (
          <li {...obj}>
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
      <Field name={names}>
        {({ field, form: { touched, errors, setFieldValue } }) => {
          return (
            <Placeholder
              field={field}
              touched={touched}
              errors={errors}
              setFieldValue={setFieldValue}
            />
          );
        }}
      </Field>
    </>
  );
}
