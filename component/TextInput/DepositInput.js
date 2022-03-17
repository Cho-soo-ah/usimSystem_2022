import * as React from "react";
import { TextField } from "@mui/material";
import TextInputWrap from "./TextInputWrap";

export default function DepositInput() {
  return (
    <>
      <TextInputWrap text="입금자 명">
        <TextField id="outlined-basic" sx={{ mb: "16px" }} value={value} />
      </TextInputWrap>
    </>
  );
}
