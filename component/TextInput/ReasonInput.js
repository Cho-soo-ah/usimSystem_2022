import { Autocomplete, TextField } from "@mui/material";

const option = [{ label: "aa" }, { label: "bb" }];
export default function ReasonInput(props) {
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={option}
        fullWidth
        noOptionsText="검색 결과가 없습니다."
        sx={{
          mb: "16px",
          mr: "16px",
          minWidth: "130px",
          maxWidth: "130px",
        }}
        renderInput={(params) => (
          <TextField {...params} label="사유" variant={props.variant} />
        )}
      />
    </>
  );
}
