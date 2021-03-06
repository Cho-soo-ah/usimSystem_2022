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
      <h2>μν μΆκ°</h2>
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
                  label="λλ¦¬μ  νμ"
                  formik={props}
                  multiple
                >
                  <MenuItem value="GENERAL" key="GENERAL">
                    μΌλ°
                  </MenuItem>
                  <MenuItem value="SPECIAL" key="SPECIAL">
                    μ€νμ
                  </MenuItem>
                </CustomFormikSelect>
                <CustomFormikInput
                  name="productName"
                  label="μνλͺ"
                  formik={props}
                />
                <PriceInput
                  name="assignCost"
                  label="λ°°μ  λΉμ©"
                  formik={props}
                />
                <PriceInput
                  name="rentalCost"
                  label="κ°ν΅ λΉμ©"
                  formik={props}
                />
                <PriceInput
                  name="chargeCost"
                  label="μΆ©μ  λΉμ©"
                  formik={props}
                />
                <CustomFormikSelect
                  name="months"
                  label="λ¬΄λ£ μΆ©μ  κ°μ μ"
                  formik={props}
                >
                  {loop}
                </CustomFormikSelect>
                <CustomBtn fullWidth color="primary" type="submit">
                  μΆκ°νκΈ°
                </CustomBtn>
              </Form>
              <CustomAlert
                open={alertOpens}
                callback={props.resetForm}
                message="μνμ΄ λ±λ‘λμμ΅λλ€."
              />
            </>
          );
        }}
      </Formik>
    </div>
  );
}
