import * as React from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import CircularProgress from "@mui/material/CircularProgress";

import styled from "@emotion/styled";

const CustomLi = styled.li`
  min-height: 10px !important;
  font-size: 14px;
`;

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
    <Autocomplete
      options={data}
      noOptionsText="검색 결과가 없습니다."
      sx={props.placeholder ? null : { height: "35px" }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="바코드 번호 / 서비스 번호"
          variant="outlined"
          size={props.placeholder ? "medium" : "small"}
          sx={
            props.placeholder
              ? {
                  mb: "16px",
                }
              : {
                  mr: "8px",
                  width: "240px",
                  "& input": { fontSize: "13px" },
                }
          }
          InputLabelProps={{ style: { fontSize: props.placeholder ? 16 : 13 } }}
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
          <CustomLi {...props}>
            {parts.map((part, index) => (
              <Box key={index}>{part.text}</Box>
            ))}
          </CustomLi>
        );
      }}
    />
  );
}
