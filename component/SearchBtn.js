import * as React from "react";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import BarcodeInput from "./TextInput/BarcodeInput";
import DateInput from "./TextInput/DateInput";
import DepositInput from "./TextInput/DepositInput";
import ProductInput from "./TextInput/ProductInput";
import ReasonInput from "./TextInput/ReasonInput";
import RisStateInput from "./TextInput/RisStateInput";
import StoreInput from "./TextInput/StoreInput";
import UsimInput from "./TextInput/UsimInput";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "514px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
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

export default function SearchBtn(props) {
  const [open, setOpen] = useState(false);

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
  // --------------- //
  const [date, setDate] = useState(false);
  const [barcode, setBarcode] = useState(false);
  const [deposit, setDeposit] = useState(false);
  const [product, setProduct] = useState(false);
  const [reason, setReason] = useState(false);
  const [ris, setRis] = useState(false);
  const [store, setStore] = useState(false);
  const [usim, setUsim] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {barcode && <BarcodeInput />}
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
      <BootstrapDialog
        keepMounted
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          "& .MuiPaper-root": { overflow: "visible" },
          "& .MuiDialogContent-root": { overflow: "visible" },
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          검색하기
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {date && <DateInput />}
          {store && <StoreInput />}
          {product && <ProductInput />}
          {usim && <UsimInput />}
          {deposit && <DepositInput />}
          {reason && <ReasonInput />}
          {ris && <RisStateInput />}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ background: "none", "&:hover": { background: "#efefef" } }}
          >
            초기화
          </Button>
          <Button
            onClick={handleClose}
            sx={{ background: "none", "&:hover": { background: "#efefef" } }}
          >
            검색
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}
