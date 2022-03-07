import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
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
import { useRouter } from "next/router";
export default function ProductID() {
  const router = useRouter();
  const [type, setType] = useState();
  const [name, setName] = useState("");
  const [assignCost, setAssignCost] = useState(0);
  const [rentalCost, setRentalCost] = useState(0);
  const [chargeCost, setChargeCost] = useState(0);
  const [months, setMonths] = useState(0);

  const handleType = (e, newType) => {
    if (newType !== null) {
      setType(newType);
    }
  };
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

  useEffect(() => {
    axios
      .get(`http://192.168.0.52:8080/products/${router.query.id}`)
      .then((res) => {
        console.log(res);
        setName(res.data.name);
        setAssignCost(res.data.assignCost);
        setRentalCost(res.data.rentalCost);
        setChargeCost(res.data.chargeCost);
        setMonths(res.data.freeChargeMonths);
      })
      .catch((err) => console.log(err));
  }, []);

  const [loading, setLoading] = useState();

  function handleSave() {
    setLoading(true);
    axios
      .patch(`http://192.168.0.52:8080/products/${router.query.id}`, {
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

  const loop = [];

  for (let i = 0; i < 13; i++) {
    loop.push(<MenuItem value={i}>{i}</MenuItem>);
  }

  return (
    <div className="inner">
      <h2>상품 수정</h2>
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
        value={name}
        fullWidth
        sx={{
          marginBottom: "16px",
        }}
        onChange={handleName}
      ></TextField>

      <TextField
        id="outlined-basic"
        label="배정 비용"
        value={assignCost}
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
        value={rentalCost}
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
        value={chargeCost}
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
        onClick={handleSave}
        sx={{ height: "56px", color: "#fff", fontSize: "16px" }}
        loadingPosition="start"
        fullWidth
      >
        수정하기
      </LoadingButton>
    </div>
  );
}
