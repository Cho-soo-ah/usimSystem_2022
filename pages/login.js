import * as React from "react";
import Box from "@mui/material/Box";
import { Form, Formik } from "formik";
import CustomBtn from "../component/Buttons/CustomBtn";
import CustomInput from "../component/CustomInput";
import Link from "../component/MuiNextLink";
import { useRecoilValue } from "recoil";
import { formikState } from "../src/Recoil/atoms";

export default function Login() {
  const formik = useRecoilValue(formikState);
  return (
    <div className="inner">
      <Box>
        <h2>로그인</h2>
        <Formik
          validationSchema={formik}
          initialValues={{ email: "", password: "" }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <CustomInput
                name="email"
                helperText="이메일을 입력해주세요"
                sx={{ mb: 1.5 }}
              >
                이메일
              </CustomInput>
              <CustomInput
                name="password"
                type="password"
                helperText="비밀번호를 입력해주세요"
              >
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
