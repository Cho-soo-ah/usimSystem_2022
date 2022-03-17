import * as React from "react";
import Box from "@mui/material/Box";
import { Form, Formik } from "formik";
import CustomBtn from "../component/Buttons/CustomBtn";
import CustomInput from "../component/CustomInput";
import PhoneCertify from "../component/PhoneCertify";
import YupData from "../src/YupData";

export default function Login() {
  return (
    <div className="inner">
      <Box>
        <h2>비밀번호 찾기</h2>
        <Formik
          validationSchema={YupData}
          // validateOnChange={false}
          //   validateOnBlur={false}
          initialValues={{
            email: "",
            passwordCurrent: "",
            password: "",
            passwordValid: "",
            phoneNumber: "",
            code: "",
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            // 비동기 동작
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <CustomInput name="email">이메일</CustomInput>
              <PhoneCertify></PhoneCertify>
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
  );
}
