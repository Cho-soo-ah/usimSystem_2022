import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useRouter } from "next/router";
import PriceInput from "../../component/PriceInput";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CustomFormikInput from "../../component/CustomFormikInput";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { formikSelector, pageType, alertOpen } from "../../src/Recoil/atoms";
import CustomAlert from "../../component/CustomAlert";
import CustomBtn from "../../component/Buttons/CustomBtn";

export default function ProductsID() {
  const alertOpens = useRecoilValue(alertOpen);
  const router = useRouter();

  const selector = useRecoilValue(formikSelector);
  const setPageTypes = useSetRecoilState(pageType);
  setPageTypes("productUpload");

  const productType = "productType";
  const months = "months";
  const [initialValues, setInitialValues] = useState({
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
          productName: res.data.name,
          assignCost: res.data.assignCost,
          rentalCost: res.data.rentalCost,
          chargeCost: res.data.chargeCost,
          months: res.data.freeChargeMonths,
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
        }}
      >
        {(props) => {
          return (
            <>
              <Form>
                <Box sx={{ marginBottom: "16px" }}>
                  <FormLabel
                    id="demo-controlled-radio-buttons-group"
                    sx={{ fontSize: "13px", top: "-5px" }}
                  >
                    대리점 타입
                  </FormLabel>
                  <Field name={productType}>
                    {({ form: { errors, touched, setFieldValue } }) => (
                      <>
                        <ToggleButtonGroup
                          value={props.values.productType}
                          onChange={(e) => {
                            setFieldValue(productType, e.target.value);
                            console.log(e.target.value);
                          }}
                          aria-label="text formatting"
                          sx={{
                            display: "flex",
                            "& .MuiButtonBase-root": {
                              width: "50%",
                              height: 56,
                              border: "1px solid #85858585",
                              fontSize: "16px",
                            },
                          }}
                          error={
                            touched[productType] && Boolean(errors[productType])
                          }
                          helperText={
                            touched[productType] && errors[productType]
                          }
                        >
                          <ToggleButton value="GENERAL" aria-label="GENERAL">
                            일반
                          </ToggleButton>
                          <ToggleButton value="SPECIAL" aria-label="SPECIAL">
                            스페셜
                          </ToggleButton>
                        </ToggleButtonGroup>
                        <ErrorMessage name={productType}>
                          {(msg) => (
                            <div
                              style={{
                                color: "#d32f2f",
                                fontSize: "0.75rem",
                                margin: "3px 14px",
                              }}
                            >
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </>
                    )}
                  </Field>
                </Box>
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
                <Field name={months}>
                  {({ form: { setFieldValue } }) => (
                    <FormControl fullWidth sx={{ marginBottom: "16px" }}>
                      <InputLabel id="demo-simple-select-label">
                        무료 충전 개월 수
                      </InputLabel>
                      <Select
                        label="무료 충전 개월 수"
                        value={props.values.months}
                        onChange={(e) => {
                          setFieldValue(months, e.target.value);
                        }}
                      >
                        {loop}
                      </Select>

                      <ErrorMessage name={months}>
                        {(msg) => (
                          <div
                            style={{
                              color: "#d32f2f",
                              fontSize: "0.75rem",
                              margin: "3px 14px",
                            }}
                          >
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </FormControl>
                  )}
                </Field>
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
                message="상품이 수정되었습니다."
              />
            </>
          );
        }}
      </Formik>
    </div>
  );
}
