import * as React from "react";
import { TextField } from "@mui/material";
import TextInputWrap from "./TextInputWrap";
import { useRecoilState } from "recoil";
import { depositState } from "../../src/Recoil/atoms";

export default function DepositInput() {
  const [depositValue, setDepositValue] = useRecoilState(depositState);

  return (
    <>
      <TextInputWrap text="입금자 명">
        <TextField
          id="outlined-basic"
          sx={{ mb: "16px" }}
          onChange={(e) => setDepositValue(e.target.value)}
          value={depositValue}
        />
      </TextInputWrap>
    </>
  );
}
