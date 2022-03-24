import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, FormLabel, InputAdornment, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useRouter } from "next/router";
import CustomAlert from "../../component/CustomAlert";
import { alertOpen } from "../../src/Recoil/atoms";
import { useRecoilState } from "recoil";
export default function AgencyID() {
  const router = useRouter();
  const [loading, setLoading] = useState();
  // ----- axios -----
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [regNumber, setRegNumber] = useState(0);
  const [alertOpens, setAlertOpens] = useRecoilState(alertOpen);

  const handleType = (e, newType) => {
    if (newType !== null) {
      setType(newType);
    }
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleRegNumber = (e) => {
    setRegNumber(e.target.value);
  };

  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(`http://192.168.0.52:8080/agencies/${router.query.id}?pages=2`)
      .then((res) => {
        setType(res.data.type);
        setName(res.data.name);
        setRegNumber(res.data.corporateRegistrationNumber);
      })
      .catch((err) => console.log(err));
    router.back;
  }, [router.isReady]);

  function handleSave() {
    setLoading(true);
    axios
      .patch(`http://192.168.0.52:8080/agencies/${router.query.id}`, {
        type: type,
        name: name,
        corporateRegistrationNumber: regNumber,
      })
      .then((res) => {
        console.log(res);
        setAlertOpens(true);
        setTimeout(() => {
          setAlertOpens(false);
          setLoading(false);
          router.back();
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // ----- axios -----

  return (
    <div className="inner">
      <h2>대리점 수정</h2>
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
        id="productInput"
        variant="outlined"
        label=" 상품명"
        value={name}
        fullWidth
        sx={{
          marginBottom: "16px",
        }}
        onChange={handleName}
        autoComplete="off"
      ></TextField>
      <TextField
        id="outlined-basic"
        label="사업자등록번호"
        value={regNumber}
        variant="outlined"
        fullWidth
        sx={{
          marginBottom: "16px",
          "& .MuiOutlinedInput-root": { paddingLeft: "6px" },
        }}
        onChange={handleRegNumber}
        InputProps={{
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
        autoComplete="off"
      ></TextField>
      <LoadingButton
        color="primary"
        loading={loading}
        onClick={handleSave}
        sx={{ height: "56px", color: "#fff", fontSize: "16px" }}
        fullWidth
      >
        수정하기
      </LoadingButton>
      <CustomAlert open={alertOpens} message="대리점이 수정되었습니다." />
    </div>
  );
}
