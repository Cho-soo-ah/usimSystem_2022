import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

import { Field } from "formik";

export default function UsimInput(props) {
  const [data, setData] = useState("");
  const [usimValue, setUsimValue] = useState("");
  const names = "usim";

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
  const Placeholder = (forms) => (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={data}
      fullWidth
      noOptionsText="검색 결과가 없습니다."
      sx={{
        mb: "12px",
      }}
      value={usimValue}
      onChange={(e, newValue) => {
        setUsimValue(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          variant={props.variant}
          autoComplete="off"
        />
      )}
      getOptionLabel={(option) => (option.usimNumber ? option.usimNumber : "")}
      renderOption={(obj, option, { inputValue }) => {
        const matches = match(option.usimNumber, inputValue, {
          insideWords: true,
        });
        const parts = parse(option.usimNumber, matches);
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
  );
}
