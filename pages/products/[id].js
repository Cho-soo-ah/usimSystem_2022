import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { MenuItem } from "@mui/material";
import PriceInput from "../../component/PriceInput";
import { Form, Formik } from "formik";
import CustomFormikInput from "../../component/CustomFormikInput";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { formikSelector, pageType, alertOpen } from "../../src/Recoil/atoms";
import CustomAlert from "../../component/CustomAlert";
import CustomBtn from "../../component/Buttons/CustomBtn";
import CustomFormikSelect from "../../component/CustomFormikSelect";

export default function ProductsID() {
  const router = useRouter();
  const [alertOpens, setAlertOpens] = useRecoilState(alertOpen);
  const selector = useRecoilValue(formikSelector);
  const setPageTypes = useSetRecoilState(pageType);
  setPageTypes("productUpload");

  const [initialValues, setInitialValues] = useState({
    storeType: [],
    productName: "",
    assignCost: "",
    rentalCost: "",
    chargeCost: "",
    months: "",
  });

  const deleteRegex = /[^\d]/g;
  const del = (value) => value.toString().replace(deleteRegex, "");

  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(`http://192.168.0.52:8080/products/${router.query.id}`)
      .then((res) => {
        setInitialValues({
          storeType: [],
          productName: res.data.name,
          assignCost: res.data.assignCost,
          rentalCost: res.data.rentalCost,
          chargeCost: res.data.chargeCost,
          months: res.data.freeChargeMonths,
        });
      })
      .catch((err) => console.log(err));
  }, []);

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
      <h2>상품 수정</h2>
      <Formik
        validationSchema={selector}
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(data, actions) => {
          actions.setSubmitting(true);
          actions.setSubmitting(false);
          axios
            .patch(`http://192.168.0.52:8080/products/${router.query.id}`, {
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
          // console.log(data);
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
