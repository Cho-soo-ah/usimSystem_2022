import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import { pageType } from "../../src/Recoil/atoms";
import { formikSelector, alertOpen } from "../../src/Recoil/atoms";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import CustomFormikInput from "../../component/CustomFormikInput";
import CustomBtn from "../../component/Buttons/CustomBtn";
import CustomAlert from "../../component/CustomAlert";

export default function Mypage() {
  const [alertOpens, setAlertOpens] = useRecoilState(alertOpen);
  const selector = useRecoilValue(formikSelector);
  const setPageTypes = useSetRecoilState(pageType);
  setPageTypes("myPage");
  return (
    <div className="inner">
      <Box>
        <h2 style={{ mb: 1.5 }}>내 정보</h2>
        <Formik
          validationSchema={selector}
          initialValues={{
            name: "",
            email: "",
            currentPassword: "",
            changePassword: "",
            passwordValid: "",
            phoneNumber: "",
          }}
          onSubmit={(data, actions) => {
            actions.setSubmitting(true);
            actions.setSubmitting(false);
            axios
              .post("http://192.168.0.52:8080/members", {
                name: data.storeName.name,
                email: data.email,
                currentPassword: data.currentPassword,
                changePassword: data.changePassword,
                passwordValid: data.passwordValid,
                phoneNumber: data.phoneNumber,
              })
              .then((res) => {
                setAlertOpens(true);
              })
              .catch((err) => console.log(err));
          }}
        >
          {(props) => {
            return (
              <>
                <Form>
                  <CustomFormikInput name="name" label="이름" formik={props} />
                  <CustomFormikInput
                    name="email"
                    label="이메일"
                    formik={props}
                  />
                  <CustomFormikInput
                    name="currentPassword"
                    label="현재 비밀번호"
                    formik={props}
                  />
                  <CustomFormikInput
                    name="changePassword"
                    label="변경하는 비밀번호"
                    formik={props}
                  />
                  <CustomFormikInput
                    name="passwordValid"
                    label="비밀번호 재확인"
                    formik={props}
                  />
                  <CustomFormikInput
                    name="phoneNumber"
                    label="핸드폰 번호 변경"
                    formik={props}
                  />
                  <CustomBtn
                    fullWidth
                    color="primary"
                    type="submit"
                    sx={{ mt: 1.5 }}
                  >
                    수정하기
                  </CustomBtn>
                </Form>
                <CustomAlert
                  open={alertOpens}
                  callback={props.resetForm}
                  message="내 정보가 수정되었습니다."
                />
              </>
            );
          }}
        </Formik>
      </Box>
    </div>
  );
}
