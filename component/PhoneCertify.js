import * as React from "react";
import * as yup from "yup";
import { Field } from "formik";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";

let validationSchema2 = {
  phoneNumber: yup
    .number("숫자만 입력하세요")
    .typeError("숫자만 입력하세요")
    .required("서비스 번호를 입력하세요"),
  code: yup
    .number("인증 코드를 입력하세요")
    .typeError("6자리 인증 코드를 입력하세요")
    .required("인증 코드를 입력하세요"),
};

export default function PhoneCertify(props) {
  // props.callback(validationSchema2);

  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(true);
  };
  return (
    <>
      <div>
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
                  marginTop: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "4px 0 0 4px",
                  },
                }}
              >
                서비스 번호
              </TextField>
            );
          }}
        </Field>
        <CustomButton
          sx={{
            marginTop: "16px",
            fontSize: "16px",
            width: "50%",
            borderRadius: "0 4px 4px 0",
          }}
          onClick={handleClick}
        >
          인증 코드 발송
        </CustomButton>
      </div>
      {click && <CustomInput name="code">인증 코드</CustomInput>}
      <style jsx>{`
        div {
          display: flex;
          align-items: space-between;
          width: 100%;
        }
      `}</style>
    </>
  );
}
