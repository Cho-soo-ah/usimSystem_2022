import { useState } from "react";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import { pageType } from "../src/Recoil/atoms";
import { formikSelector, alertOpen } from "../src/Recoil/atoms";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import StoreInput from "./TextInput/StoreInput";
import CustomBtn from "./Buttons/CustomBtn";
import CustomAlert from "./CustomAlert";

export default function EscalationWrap() {
  const [alertOpens, setAlertOpens] = useRecoilState(alertOpen);
  const selector = useRecoilValue(formikSelector);
  const setPageTypes = useSetRecoilState(pageType);
  // setPageTypes("chargeIn");
  const [disabled, setDisabled] = useState(true);
  const wrap = (value) => {
    if (value) setDisabled(false);
    else setDisabled(true);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Formik
        // validationSchema={selector}
        initialValues={{
          storeName: "",
        }}
        onSubmit={(data, actions) => {
          actions.setSubmitting(true);
          actions.setSubmitting(false);
          axios
            .post("http://192.168.0.52:8080/agencies", {
              storeName: data.storeName.id,
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
                <StoreInput
                  size="small"
                  label="대리점을 선택하세요."
                  sx={{
                    width: "200px",
                    "& .MuiInputBase-root": {
                      borderRadius: "4px 0 0 4px",
                    },
                    "& input": { fontSize: "13px" },
                    "& span": { fontSize: "10px" },
                  }}
                  InputLabelProps={{
                    style: { fontSize: 13, lineHeight: "18px" },
                  }}
                  wrap={wrap}
                />
              </Form>
              <CustomBtn
                disabled={disabled}
                color="primary"
                type="submit"
                sx={{
                  m: 0,
                  borderRadius: "0 4px 4px 0",
                  height: "36px",
                  fontSize: "13px",
                  "&.Mui-disabled": { bgcolor: "#0000000a" },
                }}
              >
                이관하기
              </CustomBtn>
              <CustomAlert
                open={alertOpens}
                callback={() => {
                  router.push("/chargeList");
                }}
                message="개통 처리가 완료되었습니다."
              />
            </>
          );
        }}
      </Formik>
    </Box>
  );
}
