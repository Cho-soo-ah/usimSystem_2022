import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useRouter } from "next/router";
import PriceInput from "../../component/PriceInput";
export default function ProductID() {
  const router = useRouter();
  const [type, setType] = useState();
  const [name, setName] = useState("");
  const [assignCost, setAssignCost] = useState(0);
  const [rentalCost, setRentalCost] = useState(0);
  const [chargeCost, setChargeCost] = useState(0);
  const [months, setMonths] = useState(0);

  const replaceRegex = /\B(?=(\d{3})+(?!\d))/g;
  const deleteRegex = /[^\d]/g;
  const regex = (value) =>
    Number(del(value)).toString().replace(replaceRegex, ",");
  const del = (value) => value.toString().replace(deleteRegex, "");

  const handleType = (e, newType) => {
    if (newType !== null) {
      setType(newType);
    }
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleAssignCost = (e) => {
    setAssignCost(regex(e.target.value));
  };
  const handleRentalCost = (e) => {
    setRentalCost(regex(e.target.value));
  };
  const handleChargeCost = (e) => {
    setChargeCost(regex(e.target.value));
  };
  const handleMonth = (e) => {
    setMonths(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://192.168.0.52:8080/products/${router.query.id}`)
      .then((res) => {
        setName(res.data.name);
        setAssignCost(regex(res.data.assignCost));
        setRentalCost(regex(res.data.rentalCost));
        setChargeCost(regex(res.data.chargeCost));
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
        assignCost: del(assignCost),
        rentalCost: del(rentalCost),
        chargeCost: del(chargeCost),
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
    loop.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
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
      <PriceInput value={assignCost} onChange={handleAssignCost}>
        개통 비용
      </PriceInput>
      <PriceInput value={rentalCost} onChange={handleRentalCost}>
        배정 비용
      </PriceInput>
      <PriceInput value={chargeCost} onChange={handleChargeCost}>
        충전 비용
      </PriceInput>
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
        fullWidth
      >
        수정하기
      </LoadingButton>
    </div>
  );
}
