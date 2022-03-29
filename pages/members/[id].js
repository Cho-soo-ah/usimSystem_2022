import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { MenuItem } from "@mui/material";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { formikSelector, pageType, alertOpen } from "../../src/Recoil/atoms";
import { Form, Formik } from "formik";
import CustomFormikInput from "../../component/CustomFormikInput";
import CustomFormikSelect from "../../component/CustomFormikSelect";
import CustomAlert from "../../component/CustomAlert";
import CustomBtn from "../../component/Buttons/CustomBtn";

export default function AgencyID() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [multi, setMulti] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [alertOpens, setAlertOpens] = useRecoilState(alertOpen);
  const selector = useRecoilValue(formikSelector);
  const setPageTypes = useSetRecoilState(pageType);
  setPageTypes("memberUpload");
  // ----- axios -----
  const [initialValues, setInitialValues] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    roleId: "",
    agencyId: [],
  });
  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(`http://192.168.0.52:8080/members/${router.query.id}`)
      .then((res) => {
        setInitialValues({
          username: res.data.username,
          email: res.data.email,
          password: res.data.password,
          phoneNumber: res.data.phoneNumber,
        });
      })
      .catch((err) => console.log(err));

    axios
      .get("http://192.168.0.52:8080/agencies")
      .then((res) => {
        setData(res.data.content);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.isReady]);

  // ----- axios -----
  return (
    <div className="inner">
      <h2>회원 수정</h2>
      <Formik
        validationSchema={selector}
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(data, actions) => {
          actions.setSubmitting(true);
          actions.setSubmitting(false);
          axios
            .patch(`http://192.168.0.52:8080/members/${router.query.id}`, {
              username: data.username,
              email: data.email,
              password: data.password,
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
                        props.setFieldValue("agencyId", []);
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
                  label="대리점"
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
                <CustomBtn fullWidth color="primary" type="submit">
                  수정하기
                </CustomBtn>
              </Form>
              <CustomAlert
                open={alertOpens}
                callback={router.back}
                message="상품이 수정되었습니다."
              />
            </>
          );
        }}
      </Formik>
    </div>
  );
}
