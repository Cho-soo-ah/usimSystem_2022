import * as React from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import { pageType } from "../../src/Recoil/atoms";
import { formikSelector, alertOpen } from "../../src/Recoil/atoms";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import CustomFormikInput from "../../component/CustomFormikInput";
import CustomAlert from "../../component/CustomAlert";
import CustomBtn from "../../component/Buttons/CustomBtn";

export default function AgencyUpload() {
  const [alertOpens, setAlertOpens] = useRecoilState(alertOpen);
  const selector = useRecoilValue(formikSelector);
  const setPageTypes = useSetRecoilState(pageType);
  setPageTypes("usimUpload");

  return (
    <div className="inner">
      <Box>
        <h2 style={{ marginBottom: "16px" }}>유심 등록</h2>
        <Formik
          validationSchema={selector}
          initialValues={{
            barcodeNumber: "",
            serviceNumber: "",
            usimNumber: "",
            serialNumber: "",
          }}
          onSubmit={(data, actions) => {
            actions.setSubmitting(true);
            actions.setSubmitting(false);
            axios
              .post("http://192.168.0.52:8080/sims", {
                barcodeNumber: data.barcodeNumber,
                serviceNumber: data.serviceNumber,
                usimNumber: data.usimNumber,
                serialNumber: data.serialNumber,
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
                  <CustomFormikInput
                    name="barcodeNumber"
                    label="바코드 번호"
                    formik={props}
                  />
                  <CustomFormikInput
                    name="serviceNumber"
                    label="서비스 번호"
                    formik={props}
                  />
                  <CustomFormikInput
                    name="usimNumber"
                    label="유심 번호"
                    formik={props}
                  />
                  <CustomFormikInput
                    name="serialNumber"
                    label="시리얼 번호"
                    formik={props}
                  />
                  <CustomBtn fullWidth color="primary" type="submit">
                    등록하기
                  </CustomBtn>
                </Form>
                <CustomAlert
                  open={alertOpens}
                  callback={props.resetForm}
                  message="유심이 등록되었습니다."
                />
              </>
            );
          }}
        </Formik>
      </Box>
    </div>
  );
}
