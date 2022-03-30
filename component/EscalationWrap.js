import { useState } from "react";
import { Box } from "@mui/material";
import StoreInput from "./TextInput/StoreInput";
import CustomBtn from "./Buttons/CustomBtn";

export default function EscalationWrap() {
  const [disabled, setDisabled] = useState(true);
  const wrap = (value) => {
    console.log(value);
    if (value) setDisabled(false);
    else setDisabled(true);
  };
  console.log(disabled);
  return (
    <Box sx={{ display: "flex" }}>
      <StoreInput
        size="small"
        label="대리점을 선택하세요."
        sx={{
          width: "200px",
          "& .MuiInputBase-root": {
            borderRadius: "4px 0 0 4px",
          },
          "& input": { fontSize: "13px" },
          "& span": { fontSize: "10px" },
        }}
        InputLabelProps={{
          style: { fontSize: 13, lineHeight: "18px" },
        }}
        wrap={wrap}
      />
      <CustomBtn
        disabled={disabled}
        sx={{
          m: 0,
          borderRadius: "0 4px 4px 0",
          height: "36px",
          fontSize: "13px",
          "&.Mui-disabled": { bgcolor: "#0000000a" },
        }}
      >
        이관하기
      </CustomBtn>
    </Box>
  );
}
