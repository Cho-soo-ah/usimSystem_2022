import * as React from "react";
import { Form, Formik } from "formik";
import { Box } from "@mui/material";
import CustomBtn from "../component/Buttons/CustomBtn";
import CustomInput from "../component/CustomInput";
import ImgUpload from "../component/ImgUpload";
import StoreInput from "../component/TextInput/StoreInput";
import BarcodeInput from "../component/TextInput/BarcodeInput";
import ProductInput from "../component/TextInput/ProductInput";

import { useRecoilValue } from "recoil";
import { formikState } from "../src/Recoil/atoms";

export default function ChargeIn() {
  const formik = useRecoilValue(formikState);

  return (
    <>
      <div className="inner">
        <Box>
          <h2 style={{ mb: 1.5 }}>개통 및 충전 처리</h2>
          <Formik
            validationSchema={formik}
            initialValues={{
              passport: null,
              storeName: null,
              barcode: null,
              product: null,
            }}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              setSubmitting(false);
            }}
          >
            {({ handleSubmit, isSubmitting }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <StoreInput
                    placeholder
                    name="storeName"
                    label="대리점 명"
                    sx={{ mb: "16px" }}
                  />
                  <CustomInput
                    name="passport"
                    sx={{ mb: "16px" }}
                    helperText="여권 번호를 입력해주세요"
                  >
                    여권 번호
                  </CustomInput>
                  <BarcodeInput name="barcode" placeholder />
                  <ProductInput name="product" placeholder label="상품" />
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
