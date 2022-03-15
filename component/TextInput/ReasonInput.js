import { Autocomplete, TextField } from "@mui/material";
import TextInputWrap from "./TextInputWrap";

const option = [{ label: "aa" }, { label: "bb" }];
export default function ReasonInput(props) {
  return (
    <>
      <TextInputWrap text="사유">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={option}
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
            />
          )}
        />
      </TextInputWrap>
    </>
  );
}
