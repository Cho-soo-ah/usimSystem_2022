import * as React from "react";
import axios from "axios";
import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ProductUpload() {
  const [name, setName] = useState();
  const [assignCost, setAssignCost] = useState();
  const [rentalCost, setRentalCost] = useState();
  const [chargeCost, setChargeCost] = useState();
  const [months, setMonths] = useState();

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleAssignCost = (e) => {
    setAssignCost(e.target.value);
  };
  const handleRentalCost = (e) => {
    setRentalCost(e.target.value);
  };
  const handleChargeCost = (e) => {
    setChargeCost(e.target.value);
  };
  const handleMonth = (e) => {
    setMonths(e.target.value);
  };

  const [loading, setLoading] = useState();

  function handleAxios() {
    const url = "http://192.168.0.52:8080/products";
    setLoading(true);
    axios
      .post(url, {
        name: name,
        assignCost: assignCost,
        rentalCost: rentalCost,
        chargeCost: chargeCost,
        freeChargeMonths: months,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert("error");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  // --------- file upload ---------
  const loop = [];

  for (let i = 0; i < 13; i++) {
    loop.push(<MenuItem value={i}>{i}</MenuItem>);
  }
  const [formats, setFormats] = useState();

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };
  return (
    <div className="inner">
      <h2>상품 추가</h2>
      <Box sx={{ marginBottom: "16px" }}>
        <FormLabel
          id="demo-controlled-radio-buttons-group"
          sx={{ fontSize: "13px", top: "-5px" }}
        >
          대리점 타입
        </FormLabel>
        <br />
        <ToggleButtonGroup
          value={formats}
          onChange={handleFormat}
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
          <ToggleButton value="bold" aria-label="normal">
            일반
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic">
            스페셜
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <TextField
        id="productInput"
        variant="outlined"
        label=" 상품명"
        fullWidth
        sx={{ marginBottom: "16px" }}
        onChange={handleName}
      ></TextField>
      <TextField
        id="outlined-basic"
        label="배정 비용"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "16px" }}
        onChange={handleAssignCost}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">&#65510;</InputAdornment>
          ),
        }}
      ></TextField>
      <TextField
        id="outlined-basic"
        label="개통 비용"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "16px" }}
        onChange={handleRentalCost}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">&#65510;</InputAdornment>
          ),
        }}
      ></TextField>
      <TextField
        id="outlined-basic"
        label="충전 비용"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "16px" }}
        onChange={handleChargeCost}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">&#65510;</InputAdornment>
          ),
        }}
      ></TextField>

      <FormControl fullWidth sx={{ marginBottom: "16px" }}>
        <InputLabel id="demo-simple-select-label">무료 충전 개월 수</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={months}
          label="무료 충전 개월 수"
          onChange={handleMonth}
        >
          {loop}
        </Select>
      </FormControl>
      <LoadingButton
        color="primary"
        loading={loading}
        onClick={handleAxios}
        sx={{ height: "56px", color: "#fff", fontSize: "16px" }}
        loadingPosition="start"
        fullWidth
      >
        추가하기
      </LoadingButton>
    </div>
  );
}
