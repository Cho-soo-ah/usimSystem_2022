import * as React from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import {
  Box,
  TextField,
  FormLabel,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import CustomBtn from "../../component/Buttons/CustomBtn";
import axios from "axios";
import { useState } from "react";
const validationSchema = yup.object({
  companyNumber: yup
    .string("사업자등록번호을 입력하세요")
    .required("사업자등록번호를 입력하세요"),
  storeName: yup
    .string("대리점 명을 입력하세요")
    .required("대리점 명을 입력하세요"),
});

export default function AgencyUpload() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleType = (e) => {
    setType(e.target.value);
  };
  const deleteRegex = /[\.]*[^\d]/g;
  const regex = (value) => value.toString().replace(deleteRegex, "");
  const handleNumber = (e) => {
    if (e.target.value.length > 10) return false;
    setRegNumber(regex(e.target.value));
  };
  function handleAxios() {
    axios
      .post("http://192.168.0.52:8080/agencies", {
        name: name,
        type: type,
        corporateRegistrationNumber: regNumber,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div className="inner">
      <Box>
        <h2 style={{ marginBottom: "16px" }}>대리점 등록</h2>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Box sx={{ marginBottom: "16px" }}>
                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  sx={{ fontSize: "13px", top: "-5px" }}
                >
                  대리점 타입
                </FormLabel>
                <br />
                <ToggleButtonGroup
                  exclusive
                  value={type}
                  onChange={handleType}
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
                >
                  <ToggleButton value="GENERAL" aria-label="GENERAL">
                    일반
                  </ToggleButton>
                  <ToggleButton value="SPECIAL" aria-label="SPECIAL">
                    스페셜
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <TextField
                id="outlined-basic"
                label="대리점 명"
                value={name}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: "16px" }}
                onChange={handleName}
              ></TextField>
              <TextField
                id="outlined-basic"
                label="사업자등록번호"
                value={regNumber}
                variant="outlined"
                fullWidth
                onChange={handleNumber}
                sx={{
                  "& input::-webkit-outer-spin-button": {
                    appearance: " none",
                    margin: 0,
                  },
                  "& input::-webkit-inner-spin-button": {
                    appearance: " none",
                    margin: 0,
                  },
                }}
              ></TextField>
              <CustomBtn
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                onClick={handleAxios}
              >
                등록하기
              </CustomBtn>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
}
