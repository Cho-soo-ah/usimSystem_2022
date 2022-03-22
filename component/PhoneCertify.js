import * as React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import CustomBtn from "./Buttons/CustomBtn";
import CustomInput from "./CustomInput";
import { Field } from "formik";

export default function PhoneCertify() {
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
        <Field name="phoneNumber">
          {({ field, form: { touched, errors } }) => {
            return (
              <TextField
                fullWidth
                color="primary"
                id="phoneNumber"
                name="phoneNumber"
                label="서비스 번호"
                type="text"
                value={field.value}
                onChange={field.onChange}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{
                  mt: 1.5,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px 0 0 4px",
                  },
                }}
                autoComplete="off"
              >
                서비스 번호
              </TextField>
            );
          }}
        </Field>
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
          sx={{ mt: 1.5 }}
        >
          인증 코드
        </CustomInput>
      )}
    </>
  );
}
