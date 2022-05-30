import * as React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import CustomBtn from "./Buttons/CustomBtn";
import CustomInput from "./CustomInput";
import CustomFormikInput from "./CustomFormikInput";

export default function PhoneCertify(props) {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(true);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "space-between",
          width: "100%",
        }}
      >
        <CustomFormikInput
          name="phoneNumber"
          label="핸드폰 번호"
          formik={props.props}
          sx={{
            mb: "16px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "4px 0 0 4px",
            },
          }}
        />
        <CustomBtn
          sx={{
            fontSize: "16px",
            width: "50%",
            borderRadius: "0 4px 4px 0",
          }}
          onClick={handleClick}
        >
          인증 코드 발송
        </CustomBtn>
      </Box>
      {click && (
        <CustomInput
          name="code"
          helperText="인증 코드를 입력하세요"
          sx={{ mb: 1.5 }}
        >
          인증 코드
        </CustomInput>
      )}
    </>
  );
}
