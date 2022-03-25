import * as React from "react";
import { Form, Formik } from "formik";

import CustomBtn from "../../component/Buttons/CustomBtn";
import axios from "axios";
import CustomAlert from "../../component/CustomAlert";

import { pageType } from "../../src/Recoil/atoms";
import { formikSelector, alertOpen } from "../../src/Recoil/atoms";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import CustomFormikInput from "../../component/CustomFormikInput";

export default function MemberUpload() {
  const [alertOpens, setAlertOpens] = useRecoilState(alertOpen);

  const selector = useRecoilValue(formikSelector);
  const setPageTypes = useSetRecoilState(pageType);
  setPageTypes("memberUpload");

  return (
    <div className="inner">
      <h2 style={{ marginBottom: "16px" }}>회원 등록</h2>
      <Formik
        validationSchema={selector}
        initialValues={{
          username: "",
          email: "",
          password: "",
          phoneNumber: "",
          roleId: "",
          agencyId: "",
        }}
        onSubmit={(data, actions) => {
          actions.setSubmitting(true);
          actions.setSubmitting(false);
          axios
            .post("http://192.168.0.52:8080/members", {
              username: data.username,
              email: data.email,
              password: data.password,
              phoneNumber: data.phoneNumber,
              roleId: data.roleId,
              agencyId: data.agencyId,
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
                <CustomFormikInput
                  name="username"
                  label="이름"
                  formik={props}
                />
                <CustomFormikInput name="email" label="이메일" formik={props} />
                <CustomFormikInput
                  name="password"
                  label="비밀번호"
                  formik={props}
                />
                <CustomFormikInput
                  name="phoneNumber"
                  label="핸드폰 번호"
                  formik={props}
                />
                {/* 
                  
                  권한 selector
                  대리점 selector 추가
                  
                  */}
                <CustomBtn
                  fullWidth
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  등록하기
                </CustomBtn>
              </Form>
              <CustomAlert
                open={alertOpens}
                callback={props.resetForm}
                message="상품이 등록되었습니다."
              />
            </>
          );
        }}
      </Formik>
    </div>
  );
}
