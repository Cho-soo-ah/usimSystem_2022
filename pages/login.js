import * as React from "react";
import * as yup from "yup";
import Box from "@mui/material/Box";
import { Form, Formik } from "formik";
import CustomBtn from "../component/Buttons/CustomBtn";
import CustomInput from "../component/CustomInput";
import Link from "../component/MuiNextLink";

const validationSchema = yup.object({
  email: yup
    .string("이메일을 입력하세요")
    .email("유효한 이메일 주소를 입력해 주세요")
    .required("이메일을 입력하세요"),
  password: yup
    .string("비밀번호를 입력하세요")
    .required("비밀번호를 입력하세요"),
});

export default function Login() {
  return (
    <div className="inner">
      <Box>
        <h2>로그인</h2>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            // 비동기 동작
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <CustomInput name="email">이메일</CustomInput>
              <CustomInput name="password" type="password">
                비밀번호
              </CustomInput>
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
        <Link
          href="/findAccount"
          sx={{
            textDecoration: "none",
            color: "primary",
            fontSize: "14px",
            marginTop: 2,
            paddingLeft: 1,
            display: "block",
            textAlign: "right",
            float: "right",
          }}
        >
          비밀번호 찾기
        </Link>
        <Link
          href="/signIn"
          sx={{
            textDecoration: "none",
            color: "primary",
            fontSize: "14px",
            marginTop: 2,
            paddingRight: 1,
            display: "block",
            textAlign: "right",
            float: "right",
          }}
        >
          회원가입
        </Link>
      </Box>
    </div>
  );
}
