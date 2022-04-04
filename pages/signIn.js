import Box from "@mui/material/Box";
import { Form, Formik } from "formik";
import { formikSelector, alertOpen, pageType } from "../src/Recoil/atoms";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import CustomAlert from "../component/CustomAlert";
import CustomBtn from "../component/Buttons/CustomBtn";
import PhoneCertify from "../component/PhoneCertify";
import CustomFormikInput from "../component/CustomFormikInput";

export default function SignIn() {
  const [alertOpens, setAlertOpens] = useRecoilState(alertOpen);
  const selector = useRecoilValue(formikSelector);
  const setPageTypes = useSetRecoilState(pageType);
  setPageTypes("signIn");

  return (
    <div className="inner">
      <Box>
        <h2>회원가입</h2>
        <Formik
          validationSchema={selector}
          initialValues={{
            name: "",
            email: "",
            password: "",
            passwordValid: "",
            phoneNumber: "",
            code: "",
          }}
          onSubmit={(data, actions) => {
            actions.setSubmitting(true);
            actions.setSubmitting(false);
            axios
              .post("http://192.168.0.52:8080/agencies", {
                name: data.name.id,
                email: data.email,
                password: data.password.id,
                passwordValid: data.passwordValid.id,
                phoneNumber: data.phoneNumber,
                code: data.code.id,
              })
              .then((res) => {
                setAlertOpens(true);
              })
              .catch((err) => console.log(err));
          }}
        >
          {(props) => (
            <>
              <Form>
                <CustomFormikInput name="name" label="이름" formik={props} />
                <CustomFormikInput name="email" label="이메일" formik={props} />
                <CustomFormikInput
                  name="password"
                  label="비밀번호"
                  formik={props}
                />
                <CustomFormikInput
                  name="passwordValid"
                  label="비밀번호 확인"
                  formik={props}
                />
                <PhoneCertify props={props} />
                <CustomBtn fullWidth color="primary" type="submit">
                  로그인
                </CustomBtn>
              </Form>
              <CustomAlert
                open={alertOpens}
                callback={props.resetForm}
                message="대리점 정보가 수정되었습니다."
                // error, success, check,
              />
            </>
          )}
        </Formik>
      </Box>
    </div>
  );
}
