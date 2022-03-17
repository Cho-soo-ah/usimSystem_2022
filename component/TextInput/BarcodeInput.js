import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

export default function BarcodeInput(props) {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setLoading(true);
    axios
      .get("http://192.168.0.52:8080/sims")
      .then((res) => {
        setData(res.data.content);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Autocomplete
        options={data}
        open={open}
        onOpen={handleOpen}
        onClose={() => {
          setOpen(false);
          setData([]);
        }}
        loading={loading}
        noOptionsText="검색 결과가 없습니다."
        loadingText="로딩 중 입니다."
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="바코드 번호 / 서비스 번호"
            size={props.search ? "small" : "medium"}
            value={props.value}
            onChange={(e, newValue) => {
              setValue(newValue);
            }}
            sx={
              props.search
                ? {
                    mr: "8px",
                    width: "240px",
                    "& input": { fontSize: "13px" },
                    "& span": { fontSize: "10px" },
                  }
                : {
                    mb: "16px",
                  }
            }
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    params.InputProps.endAdornment
                  )}
                </>
              ),
            }}
            InputLabelProps={{
              style: { fontSize: props.search ? 13 : 16 },
            }}
          />
        )}
        getOptionLabel={(option) =>
          `${option.barcodeNumber} / ${option.serviceNumber}`
        }
        renderOption={(obj, option, { inputValue }) => {
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
            <li {...obj}>
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                      fontSize: props.search ? 14 : props.sx,
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
    </>
  );
}
