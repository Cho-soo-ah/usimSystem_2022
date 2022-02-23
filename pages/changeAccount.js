import * as React from "react";
import * as yup from "yup";
import Box from "@mui/material/Box";
import { Form, Formik } from "formik";
import CustomButton from "../component/CustomButton";
import CustomInput from "../component/CustomInput";
import PhoneCertify from "../component/PhoneCertify";

export default function Login() {
  let schema = {
    passwordCurrent: yup
      .string("현재 비밀번호를 입력하세요")
      .required("현재 비밀번호를 입력하세요"),
    password: yup
      .string("변경할 비밀번호를 입력하세요")
      .required("변경할 비밀번호를 입력하세요"),
    passwordValid: yup
      .string("변경할 비밀번호를 한번 더 입력하세요")
      .required("변경할 비밀번호를 한번 더 입력하세요"),
  };

  const [state, setState] = React.useState();
  const callback = (validSchema2) => {
    var combimed = Object.assign(schema, validSchema2);
    // setState(yup.object(combimed));
    var aa = yup.object(combimed);
    // console.log("combine", aa);
  };

  return (
    <>
      <div className="inner">
        <Box>
          <h2>비밀번호 변경</h2>
          <Formik
            validationSchema={state}
            // validateOnChange ={false}
            //   validateOnBlur={false}
            initialValues={{
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
                <CustomInput name="passwordCurrent">현재 비밀번호</CustomInput>
                <CustomInput name="password">변경할 비밀번호</CustomInput>
                <CustomInput name="passwordValid">비밀번호 확인</CustomInput>
                <PhoneCertify callback={callback} />
                <CustomButton
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                >
                  로그인
                </CustomButton>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
    </>
  );
}
