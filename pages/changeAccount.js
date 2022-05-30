import * as React from "react";
import Box from "@mui/material/Box";
import { Form, Formik } from "formik";
import CustomBtn from "../component/Buttons/CustomBtn";
import CustomInput from "../component/CustomInput";
import PhoneCertify from "../component/PhoneCertify";
import { useRecoilValue } from "recoil";
import { formikState } from "../src/Recoil/atoms";

export default function Login() {
  const formik = useRecoilValue(formikState);
  return (
    <>
      <div className="inner">
        <Box>
          <h2>비밀번호 변경</h2>
          <Formik
            validationSchema={formik}
            initialValues={{
              passwordCurrent: "",
              password: "",
              passwordValid: "",
              phoneNumber: "",
              code: "",
            }}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              setSubmitting(false);
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <CustomInput
                  name="passwordCurrent"
                  sx={{ mb: 1.5 }}
                  helperText="현재 비밀번호를 입력하세요"
                >
                  현재 비밀번호
                </CustomInput>
                <CustomInput
                  name="password"
                  sx={{ mb: 1.5 }}
                  helperText="변경할 비밀번호를 입력하세요"
                >
                  변경할 비밀번호
                </CustomInput>
                <CustomInput
                  name="passwordValid"
                  helperText="변경할 비밀번호를 입력하세요"
                >
                  비밀번호 확인
                </CustomInput>
                <PhoneCertify />
                <CustomBtn
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                >
                  로그인
                </CustomBtn>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
    </>
  );
}
