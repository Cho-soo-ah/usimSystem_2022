import * as React from "react";
import axios from "axios";
import { Box, MenuItem } from "@mui/material";
import { Form, Formik } from "formik";
import { pageType } from "../../src/Recoil/atoms";
import { formikSelector, alertOpen } from "../../src/Recoil/atoms";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import CustomFormikInput from "../../component/CustomFormikInput";
import CustomFormikSelect from "../../component/CustomFormikSelect";
import CustomAlert from "../../component/CustomAlert";
import CustomBtn from "../../component/Buttons/CustomBtn";

export default function AgencyUpload() {
  const [alertOpens, setAlertOpens] = useRecoilState(alertOpen);

  const selector = useRecoilValue(formikSelector);
  const setPageTypes = useSetRecoilState(pageType);
  setPageTypes("agencyUpload");

  const storeType = "storeType";

  return (
    <div className="inner">
      <Box>
        <h2 style={{ marginBottom: "16px" }}>대리점 등록</h2>
        <Formik
          validationSchema={selector}
          initialValues={{
            storeType: "",
            storeName: "",
            registrationNumber: "",
          }}
          onSubmit={(data, actions) => {
            actions.setSubmitting(true);
            actions.setSubmitting(false);
            axios
              .post("http://192.168.0.52:8080/agencies", {
                type: data.storeType,
                name: data.storeName,
                corporateRegistrationNumber: data.registrationNumber,
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
                    label="대리점 타입"
                    formik={props}
                  >
                    <MenuItem value="GENERAL" key="GENERAL">
                      일반
                    </MenuItem>
                    <MenuItem value="SPECIAL" key="SPECIAL">
                      스페셜
                    </MenuItem>
                  </CustomFormikSelect>

                  <CustomFormikInput
                    name="storeName"
                    label="대리점명"
                    formik={props}
                  />
                  <CustomFormikInput
                    name="registrationNumber"
                    label="사업자등록번호"
                    formik={props}
                  />
                  <CustomBtn
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    등록하기
                  </CustomBtn>
                </Form>
                <CustomAlert
                  open={alertOpens}
                  callback={props.resetForm}
                  message="대리점이 등록되었습니다."
                />
              </>
            );
          }}
        </Formik>
      </Box>
    </div>
  );
}
