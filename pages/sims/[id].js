import * as React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import { pageType } from "../../src/Recoil/atoms";
import { formikSelector, alertOpen } from "../../src/Recoil/atoms";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import CustomFormikInput from "../../component/CustomFormikInput";
import CustomAlert from "../../component/CustomAlert";
import CustomBtn from "../../component/Buttons/CustomBtn";

export default function ProductID() {
  const router = useRouter();
  const [alertOpens, setAlertOpens] = useRecoilState(alertOpen);
  const selector = useRecoilValue(formikSelector);
  const setPageTypes = useSetRecoilState(pageType);
  setPageTypes("usimUpload");

  const [initialValues, setInitialValues] = useState({
    barcodeNumber: "",
    serviceNumber: "",
    usimNumber: "",
    serialNumber: "",
  });

  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(`http://192.168.0.52:8080/sims/${router.query.id}`)
      .then((res) => {
        console.log(res);
        setInitialValues({
          barcodeNumber: res.data.barcodeNumber,
          serviceNumber: res.data.serviceNumber,
          usimNumber: res.data.usimNumber,
          serialNumber: res.data.serialNumber,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="inner">
      <h2 style={{ marginBottom: "16px" }}>유심 수정</h2>
      <Formik
        validationSchema={selector}
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(data, actions) => {
          actions.setSubmitting(true);
          actions.setSubmitting(false);
          axios
            .patch(`http://192.168.0.52:8080/sims/${router.query.id}`, {
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
                  수정하기
                </CustomBtn>
              </Form>
              <CustomAlert
                open={alertOpens}
                callback={router.back}
                message="유심이 수정되었습니다."
              />
            </>
          );
        }}
      </Formik>
    </div>
  );
}
