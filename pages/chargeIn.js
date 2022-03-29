import * as React from "react";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { Box } from "@mui/material";
import { pageType } from "../src/Recoil/atoms";
import { formikSelector, alertOpen } from "../src/Recoil/atoms";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import CustomFormikInput from "../component/CustomFormikInput";
import CustomBtn from "../component/Buttons/CustomBtn";
import CustomAlert from "../component/CustomAlert";
import ImgUpload from "../component/ImgUpload";
import StoreInput from "../component/TextInput/StoreInput";
import BarcodeInput from "../component/TextInput/BarcodeInput";
import ProductInput from "../component/TextInput/ProductInput";

export default function ChargeIn() {
  const router = useRouter();
  const [alertOpens, setAlertOpens] = useRecoilState(alertOpen);
  const selector = useRecoilValue(formikSelector);
  const setPageTypes = useSetRecoilState(pageType);
  setPageTypes("chargeIn");
  return (
    <>
      <div className="inner">
        <Box>
          <h2 style={{ mb: 1.5 }}>개통 및 충전 처리</h2>
          <Formik
            validationSchema={selector}
            initialValues={{
              storeName: "",
              registrationNumber: "",
              barcode: "",
              product: "",
            }}
            onSubmit={(data, actions) => {
              actions.setSubmitting(true);
              actions.setSubmitting(false);
              axios
                .post("http://192.168.0.52:8080/agencies", {
                  storeName: data.storeName,
                  registrationNumber: data.registrationNumber,
                  barcode: data.barcode,
                  product: data.product,
                })
                .then((res) => {
                  setAlertOpens(true);
                })
                .catch((err) => console.log(err));
              console.log(data);
            }}
          >
            {(props) => {
              return (
                <>
                  <Form>
                    <StoreInput label="대리점명" />
                    <CustomFormikInput
                      name="registrationNumber"
                      label="여권 번호"
                      formik={props}
                    />
                    <BarcodeInput />
                    <ProductInput label="상품" />
                    <ImgUpload />
                    <CustomBtn fullWidth color="primary" type="submit">
                      개통 처리
                    </CustomBtn>
                  </Form>
                  <CustomAlert
                    open={alertOpens}
                    callback={() => {
                      // router.push("/chargeList");
                    }}
                    message="개통 처리가 완료되었습니다."
                  />
                </>
              );
            }}
          </Formik>
        </Box>
      </div>
    </>
  );
}
