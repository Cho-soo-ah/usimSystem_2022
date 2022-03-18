import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, FormLabel, InputAdornment, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useRouter } from "next/router";
export default function AgencyID() {
  const router = useRouter();
  const [loading, setLoading] = useState();
  // ----- axios -----
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [regNumber, setRegNumber] = useState(0);

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
      .get(`http://192.168.0.52:8080/agencies/${router.query.id}`)
      .then((res) => {
        setType(res.data.type);
        setName(res.data.name);
        setRegNumber(res.data.corporateRegistrationNumber);
        console.log(res);
      })
      .catch((err) => console.log(err));
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
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  // ----- axios -----

  return (
    <div className="inner">
      <h2>회원 수정</h2>
      <TextField
        id="productInput"
        variant="outlined"
        label=" 이름"
        value={name}
        fullWidth
        sx={{
          marginBottom: "16px",
        }}
        onChange={handleName}
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
    </div>
  );
}
