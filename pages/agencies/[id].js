import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { MenuItem } from "@mui/material";
import { Form, Formik } from "formik";
import CustomFormikInput from "../../component/CustomFormikInput";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { formikSelector, pageType, alertOpen } from "../../src/Recoil/atoms";
import CustomAlert from "../../component/CustomAlert";
import CustomFormikSelect from "../../component/CustomFormikSelect";
import CustomBtn from "../../component/Buttons/CustomBtn";

export default function AgenciesID() {
  const alertOpens = useRecoilValue(alertOpen);
  const router = useRouter();

  const selector = useRecoilValue(formikSelector);
  const setPageTypes = useSetRecoilState(pageType);
  setPageTypes("agencyUpload");

  const [initialValues, setInitialValues] = useState({
    storeType: "",
    storeName: "",
    registrationNumber: "",
  });

  const deleteRegex = /[^\d]/g;
  const del = (value) => value.toString().replace(deleteRegex, "");

  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(`http://192.168.0.52:8080/agencies/${router.query.id}`)
      .then((res) => {
        setInitialValues({
          storeType: res.data.type,
          storeName: res.data.name,
          registrationNumber: res.data.corporateRegistrationNumber,
        });
      })
      .catch((err) => console.log(err));
  });

  const loop = [];

  for (let i = 0; i < 13; i++) {
    loop.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }

  return (
    <div className="inner">
      <h2>대리점 수정</h2>
      <Formik
        validationSchema={selector}
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(data, actions) => {
          actions.setSubmitting(true);
          actions.setSubmitting(false);
          axios
            .patch(`http://192.168.0.52:8080/agencies/${router.query.id}`, {
              name: data.productName,
              assignCost: del(data.assignCost),
              rentalCost: del(data.rentalCost),
              chargeCost: del(data.chargeCost),
              freeChargeMonths: data.months,
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
                <CustomFormikSelect
                  name="storeType"
                  label="대리점 타입"
                  formik={props}
                >
                  <MenuItem value="GENERAL" key="GENERAL">
                    일반
                  </MenuItem>
                  <MenuItem value="SPECIAL" key="SPECIAL">
                    스페셜
                  </MenuItem>
                </CustomFormikSelect>
                <CustomFormikInput
                  name="storeName"
                  label="대리점명"
                  formik={props}
                />
                <CustomFormikInput
                  name="registrationNumber"
                  label="사업자등록번호"
                  formik={props}
                />
                <CustomBtn
                  fullWidth
                  color="primary"
                  type="submit"
                  sx={{ height: "56px", color: "#fff", fontSize: "16px" }}
                >
                  수정하기
                </CustomBtn>
              </Form>
              <CustomAlert
                open={alertOpens}
                callback={props.resetForm}
                message="대리점 정보가 수정되었습니다."
              />
            </>
          );
        }}
      </Formik>
    </div>
  );
}
