import * as React from "react";
import axios from "axios";
import { MenuItem } from "@mui/material";
import CustomAlert from "../../component/CustomAlert";
import PriceInput from "../../component/PriceInput";
import CustomBtn from "../../component/Buttons/CustomBtn";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { formikSelector, alertOpen, pageType } from "../../src/Recoil/atoms";
import { Form, Formik } from "formik";
import CustomFormikInput from "../../component/CustomFormikInput";
import CustomFormikSelect from "../../component/CustomFormikSelect";
export default function ProductUpload() {
  const [alertOpens, setAlertOpens] = useRecoilState(alertOpen);
  const selector = useRecoilValue(formikSelector);
  const setPageTypes = useSetRecoilState(pageType);
  setPageTypes("productUpload");

  const deleteRegex = /[^\d]/g;
  const del = (value) => value.toString().replace(deleteRegex, "");
  // ----- Months -----
  const loop = [];

  for (let i = 0; i < 13; i++) {
    loop.push(
      <MenuItem value={i} key={i}>
        {i}
      </MenuItem>
    );
  }
  // ----- Months -----

  let initialValues = {
    storeType: [],
    productName: "",
    assignCost: "",
    rentalCost: "",
    chargeCost: "",
    months: "",
  };
  return (
    <div className="inner">
      <h2>상품 추가</h2>
      <Formik
        validationSchema={selector}
        initialValues={initialValues}
        onSubmit={(data, actions) => {
          actions.setSubmitting(true);
          actions.setSubmitting(false);
          axios
            .post("http://192.168.0.52:8080/products", {
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
                  multiple
                >
                  <MenuItem value="GENERAL" key="GENERAL">
                    일반
                  </MenuItem>
                  <MenuItem value="SPECIAL" key="SPECIAL">
                    스페셜
                  </MenuItem>
                </CustomFormikSelect>
                <CustomFormikInput
                  name="productName"
                  label="상품명"
                  formik={props}
                />
                <PriceInput
                  name="assignCost"
                  label="배정 비용"
                  formik={props}
                />
                <PriceInput
                  name="rentalCost"
                  label="개통 비용"
                  formik={props}
                />
                <PriceInput
                  name="chargeCost"
                  label="충전 비용"
                  formik={props}
                />
                <CustomFormikSelect
                  name="months"
                  label="무료 충전 개월 수"
                  formik={props}
                >
                  {loop}
                </CustomFormikSelect>
                <CustomBtn fullWidth color="primary" type="submit">
                  추가하기
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
