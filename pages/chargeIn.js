import * as React from "react";
import { useState } from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { Box } from "@mui/material";

import CustomBtn from "../component/Buttons/CustomBtn";
import CustomInput from "../component/CustomInput";
import ImgUpload from "../component/ImgUpload";
import StoreInput from "../component/TextInput/StoreInput";
import BarcodeInput from "../component/TextInput/BarcodeInput";
import ProductInput from "../component/TextInput/ProductInput";

const validationSchema = yup.object({
  passport: yup
    .string("여권번호를 입력하세요")
    .required("여권번호를 입력하세요"),
});

export default function ChargeIn() {
  // const [value, setValue] = useState("");
  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };
  return (
    <>
      <div className="inner">
        <Box>
          <h2 style={{ marginBottom: "16px" }}>개통 및 충전 처리</h2>
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
                  <StoreInput
                    placeholder
                    label="대리점 명"
                    sx={{ mb: "16px" }}
                  />
                  <CustomInput name="passport" sx={{ mb: "16px" }}>
                    여권 번호
                  </CustomInput>
                  <BarcodeInput placeholder />
                  <ProductInput placeholder label="상품" />
                  <ImgUpload />
                  <CustomBtn
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                  >
                    개통 처리
                  </CustomBtn>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </div>
    </>
  );
}
