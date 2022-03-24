import * as React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Box,
  TextField,
  FormLabel,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import CustomBtn from "../../component/Buttons/CustomBtn";
import axios from "axios";
import CustomAlert from "../../component/CustomAlert";

import { pageType } from "../../src/Recoil/atoms";
import { formikSelector, alertOpen } from "../../src/Recoil/atoms";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";

export default function AgencyUpload() {
  const [alertOpens, setAlertOpens] = useRecoilState(alertOpen);

  const selector = useRecoilValue(formikSelector);
  const setPageTypes = useSetRecoilState(pageType);
  setPageTypes("agencyUpload");

  const storeName = "storeName";
  const registrationNumber = "registrationNumber";
  const storeType = "storeType";

  return (
    <div className="inner">
      <Box>
        <h2 style={{ marginBottom: "16px" }}>대리점 등록</h2>
        <Formik
          validationSchema={selector}
          initialValues={{
            storeName: "",
            registrationNumber: "",
            storeType: "",
          }}
          onSubmit={(data, actions) => {
            actions.setSubmitting(true);
            actions.setSubmitting(false);
            axios
              .post("http://192.168.0.52:8080/agencies", {
                name: data.storeName,
                type: data.storeType,
                corporateRegistrationNumber: data.registrationNumber,
              })
              .then((res) => {
                setAlertOpens(true);
                setTimeout(() => {
                  setAlertOpens(false);
                  actions.resetForm();
                }, 3000);
              })
              .catch((err) => console.log(err));
          }}
        >
          {(props) => {
            console.log("props", props.values);
            return (
              <Form>
                <Box sx={{ marginBottom: "16px" }}>
                  <FormLabel
                    id="demo-controlled-radio-buttons-group"
                    sx={{ fontSize: "13px", top: "-5px" }}
                  >
                    대리점 타입
                  </FormLabel>
                  <Field name={storeType}>
                    {({ form: { errors, touched, setFieldValue } }) => (
                      <>
                        <ToggleButtonGroup
                          exclusive
                          value={props.values.storeType}
                          onChange={(e) => {
                            setFieldValue(storeType, e.target.value);
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
                            touched[storeType] && Boolean(errors[storeType])
                          }
                          helperText={touched[storeType] && errors[storeType]}
                        >
                          <ToggleButton value="GENERAL" aria-label="GENERAL">
                            일반
                          </ToggleButton>
                          <ToggleButton value="SPECIAL" aria-label="SPECIAL">
                            스페셜
                          </ToggleButton>
                        </ToggleButtonGroup>
                        <ErrorMessage name={storeType}>
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
                <Field name={storeName}>
                  {({ form: { errors, touched, setFieldValue } }) => (
                    <TextField
                      fullWidth
                      label="대리점 명"
                      variant="outlined"
                      value={props.values.storeName}
                      onChange={(e) => {
                        setFieldValue(storeName, e.target.value);
                      }}
                      sx={{ marginBottom: "16px" }}
                      autoComplete="off"
                      error={touched[storeName] && Boolean(errors[storeName])}
                      helperText={touched[storeName] && errors[storeName]}
                    />
                  )}
                </Field>
                <Field name={registrationNumber}>
                  {({ form: { errors, touched, setFieldValue } }) => (
                    <TextField
                      fullWidth
                      label="사업자등록번호"
                      variant="outlined"
                      value={props.values.registrationNumber}
                      onChange={(e) =>
                        setFieldValue(registrationNumber, e.target.value)
                      }
                      sx={{
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                          {
                            appearance: " none",
                            margin: 0,
                          },
                      }}
                      autoComplete="off"
                      inputProps={{ maxLength: 10 }}
                      error={
                        touched[registrationNumber] &&
                        Boolean(errors[registrationNumber])
                      }
                      helperText={
                        touched[registrationNumber] &&
                        errors[registrationNumber]
                      }
                    />
                  )}
                </Field>
                <CustomBtn
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  등록하기
                </CustomBtn>
              </Form>
            );
          }}
        </Formik>
      </Box>
      <CustomAlert open={true} message="대리점이 등록되었습니다." />
    </div>
  );
}
