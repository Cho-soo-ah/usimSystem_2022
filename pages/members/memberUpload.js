import * as React from "react";
import { useState, useEffect } from "react";
import { Form, Formik } from "formik";

import CustomBtn from "../../component/Buttons/CustomBtn";
import axios from "axios";
import CustomAlert from "../../component/CustomAlert";

import { pageType } from "../../src/Recoil/atoms";
import { formikSelector, alertOpen } from "../../src/Recoil/atoms";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import CustomFormikInput from "../../component/CustomFormikInput";
import CustomFormikSelect from "../../component/CustomFormikSelect";
import { MenuItem } from "@mui/material";

export default function MemberUpload() {
  const [data, setData] = useState([]);
  const [multi, setMulti] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [alertOpens, setAlertOpens] = useRecoilState(alertOpen);
  const selector = useRecoilValue(formikSelector);
  const setPageTypes = useSetRecoilState(pageType);
  setPageTypes("memberUpload");

  useEffect(() => {
    axios
      .get("http://192.168.0.52:8080/agencies")
      .then((res) => {
        setData(res.data.content);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          agencyId: [],
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
                  type="password"
                  label="비밀번호"
                  formik={props}
                />
                <CustomFormikInput
                  name="phoneNumber"
                  label="핸드폰 번호"
                  formik={props}
                />
                <CustomFormikSelect
                  name="roleId"
                  label="권한"
                  formik={props}
                  onChange={(e) => {
                    props.setFieldValue("roleId", e.target.value);
                    switch (e.target.value) {
                      case "Administrator":
                      case "User":
                        props.setFieldValue("agencyId", [""]);
                        setDisabled(true);
                        setMulti(false);
                        break;
                      case "Dealer":
                        props.setFieldValue("agencyId", []);
                        setMulti(true);
                        setDisabled(false);
                        break;
                      default:
                        props.setFieldValue("agencyId", []);
                        setDisabled(false);
                        setMulti(false);
                    }
                  }}
                >
                  <MenuItem value="Administrator" key="Administrator">
                    관리자
                  </MenuItem>
                  <MenuItem value="Dealer" key="Dealer">
                    딜러
                  </MenuItem>
                  <MenuItem value="Agent" key="Agent">
                    대리점
                  </MenuItem>
                  <MenuItem value="User" key="User">
                    회원
                  </MenuItem>
                </CustomFormikSelect>
                <CustomFormikSelect
                  name="agencyId"
                  label="대리점 권한"
                  formik={props}
                  multiple={multi}
                  disabled={disabled}
                >
                  {data &&
                    data.map((obj) => {
                      return (
                        <MenuItem value={obj.id} key={obj.id}>
                          {obj.name}
                        </MenuItem>
                      );
                    })}
                </CustomFormikSelect>
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
