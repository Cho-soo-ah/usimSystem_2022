import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Tooltip,
} from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import { Form, Formik } from "formik";
import BarcodeInput from "../TextInput/BarcodeInput";
import DateInput from "../TextInput/DateInput";
import DepositInput from "../TextInput/DepositInput";
import ProductInput from "../TextInput/ProductInput";
import ReasonInput from "../TextInput/ReasonInput";
import RisStateInput from "../TextInput/RisStateInput";
import StoreInput from "../TextInput/StoreInput";
import UsimInput from "../TextInput/UsimInput";
import { Box } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "514px",
    maxHeight: "700px",
    overflowY: "visible",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    overflowY: "visible",
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
const Title = styled("div")({
  fontSize: "14px",
  color: "#787878",
  marginBottom: "5px",
  textIndent: "8px",
});
export default function SearchBtn(props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(false);
  const [barcode, setBarcode] = useState(false);
  const [deposit, setDeposit] = useState(false);
  const [product, setProduct] = useState(false);
  const [reason, setReason] = useState(false);
  const [ris, setRis] = useState(false);
  const [store, setStore] = useState(false);
  const [usim, setUsim] = useState(false);

  useEffect(() => {
    if (props.items.includes("barcode")) {
      setBarcode(true);
    }
  }, []);

  const handleOpen = () => {
    props.items.map((item) => {
      switch (item) {
        case "date":
          setDate(true);
          break;
        case "deposit":
          setDeposit(true);
          break;
        case "product":
          setProduct(true);
          break;
        case "reason":
          setReason(true);
          break;
        case "ris":
          setRis(true);
          break;
        case "store":
          setStore(true);
          break;
        case "usim":
          setUsim(true);
          break;
      }
    });

    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const initialValues = {
    barcode: "",
    date: "",
    storeName: "",
    product: "",
    usim: "",
    deposit: "",
    reason: "",
    ris: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, isSubmitting, resetForm }) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {barcode && <BarcodeInput search />}
            <Tooltip
              title="상세검색"
              arrow
              disableInteractive
              placement="top-end"
              componentsProps={{
                tooltip: { sx: { top: 5 } },
              }}
            >
              <Search
                fontSize="large"
                onClick={handleOpen}
                sx={{
                  cursor: "pointer",
                  border: "1px solid #0000003b",
                  borderRadius: "4px",
                  padding: "5px",
                  color: "#5a5a5a",
                }}
              ></Search>
            </Tooltip>
            <BootstrapDialog
              keepMounted
              TransitionComponent={Transition}
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleClose}
              >
                검색하기
              </BootstrapDialogTitle>
              <Form onSubmit={handleSubmit}>
                <DialogContent dividers>
                  {date && (
                    <>
                      <Title>날짜</Title>
                      <DateInput />
                    </>
                  )}
                  {store && (
                    <>
                      <Title>대리점명</Title>
                      <StoreInput search />
                    </>
                  )}
                  {product && (
                    <>
                      <Title>상품명</Title>
                      <ProductInput search />
                    </>
                  )}
                  {usim && (
                    <>
                      <Title>유심 정보</Title>
                      <UsimInput />
                    </>
                  )}
                  {deposit && (
                    <>
                      <Title>입금자 명</Title>
                      <DepositInput />
                    </>
                  )}
                  {reason && (
                    <>
                      <Title>사유</Title>
                      <ReasonInput />
                    </>
                  )}
                  {ris && (
                    <>
                      <Title>RIS 처리 여부</Title>
                      <RisStateInput />
                    </>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button
                    type="reset"
                    onClick={resetForm}
                    sx={{
                      background: "none",
                      "&:hover": { background: "#efefef" },
                    }}
                  >
                    초기화
                  </Button>
                  <Button
                    sx={{
                      background: "none",
                      "&:hover": { background: "#efefef" },
                    }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    검색
                  </Button>
                </DialogActions>
              </Form>
            </BootstrapDialog>
          </Box>
        );
      }}
    </Formik>
  );
}
