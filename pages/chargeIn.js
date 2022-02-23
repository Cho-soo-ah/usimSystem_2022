import * as React from "react";
import { useState } from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

import CustomButton from "../component/CustomButton";
import CustomInput from "../component/CustomInput";
import FileUpload from "../component/FileUpload";
import StoreInput from "../component/StoreInput";
import BarcodePhoneInput from "../component/BarcodePhoneInput";

const validationSchema = yup.object({
  passport: yup
    .string("여권번호를 입력하세요")
    .required("여권번호를 입력하세요"),
});

export default function ChargeIn() {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <div className="inner">
        <Box>
          <h2>개통 및 충전 처리</h2>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ passport: "" }}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              // 비동기 동작
              setSubmitting(false);
            }}
          >
            {({ handleSubmit, isSubmitting }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <StoreInput />
                  <CustomInput name="passport">여권 번호</CustomInput>
                  <BarcodePhoneInput></BarcodePhoneInput>
                  <FormControl sx={{ width: "100%", marginTop: 2 }}>
                    <InputLabel id="product">상품</InputLabel>
                    <Select
                      labelId="product"
                      id="product"
                      value={value}
                      label="상품"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>825SIM 330</MenuItem>
                    </Select>
                  </FormControl>
                  <FileUpload />
                  <CustomButton
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                  >
                    개통 처리
                  </CustomButton>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </div>
    </>
  );
}
