import * as React from "react";
import { useState } from "react";
import { Form, Formik } from "formik";
import { Box } from "@mui/material";
import CustomBtn from "../component/Buttons/CustomBtn";
import CustomInput from "../component/CustomInput";
import CustomAlert from "../component/CustomAlert";
import ImgUpload from "../component/ImgUpload";
import StoreInput from "../component/TextInput/StoreInput";
import BarcodeInput from "../component/TextInput/BarcodeInput";
import ProductInput from "../component/TextInput/ProductInput";

import { useRecoilValue } from "recoil";
import { formikState } from "../src/Recoil/atoms";

export default function ChargeIn() {
  const formik = useRecoilValue(formikState);
  const [open, setOpen] = useState(false);
  const handleAlert = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  return (
    <>
      <div className="inner">
        <Box>
          <h2 style={{ mb: 1.5 }}>개통 및 충전 처리</h2>
          <Formik
            // validationSchema={formik}
            initialValues={{
              passport: null,
              storeName: null,
              barcode: null,
              product: null,
            }}
            onSubmit={(data, { setSubmitting }) => {
              console.log("data", data);
              setSubmitting(true);
              setSubmitting(false);
            }}
          >
            {({ handleSubmit, isSubmitting }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <StoreInput label="대리점 명" />
                  <CustomInput
                    name="passport"
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    sx={{
                      mb: "16px",
                      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                        {
                          appearance: " none",
                          margin: 0,
                        },
                    }}
                  >
                    여권 번호
                  </CustomInput>
                  <BarcodeInput />
                  <ProductInput label="상품" />
                  <ImgUpload />
                  <CustomBtn
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleAlert}
                  >
                    개통 처리
                  </CustomBtn>
                </Form>
              );
            }}
          </Formik>
        </Box>
        <CustomAlert open={open} message="개통 처리가 완료되었습니다." />
      </div>
    </>
  );
}
