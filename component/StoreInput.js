import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";

const option = [
  { label: "(경산)글로벌abc" },
  { label: "(광양매천) 중국식품" },
  { label: "(이천)외국인마트" },
  { label: "(광양매천) 중국식품" },
  { label: "(경산)글로벌abc" },
  { label: "(광양매천) 중국식품" },
  { label: "(경산)글로벌abc" },
  { label: "(광양매천) 중국식품" },
  { label: "(경산)글로벌abc" },
  { label: "(광양매천) 중국식품" },
  { label: "(경산)글로벌abc" },
  { label: "(광양매천) 중국식품" },
  { label: "(경산)글로벌abc" },
  { label: "(광양매천) 중국식품" },
  { label: "(경산)글로벌abc" },
  { label: "(광양매천) 중국식품" },
];
export default function StoreInput() {
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={option}
        fullWidth
        sx={{ marginTop: "16px" }}
        renderInput={(params) => <TextField {...params} label="대리점 대행" />}
      />
      {/* <FormControl sx={{ width: "100%", marginTop: 2 }}>
        <InputLabel id="agency">대리점 대행</InputLabel>
        <Select
          labelId="agency"
          id="agency"
          value={value}
          label="대리점 대행"
          onChange={handleChange}
        >
          <MenuItem value={10}>(경산)글로벌abc</MenuItem>
          <MenuItem value={20}>(광양매천) 중국식품</MenuItem>
          <MenuItem value={30}>(이천)외국인마트</MenuItem>
          <MenuItem value={40}>(청주)타이반</MenuItem>
          <MenuItem value={50}>경주(외동) 월드폰</MenuItem>
          <MenuItem value={60}>경주(외동) 히어로</MenuItem>
          <MenuItem value={70}>구주통신</MenuItem>
          <MenuItem value={80}>돔돔</MenuItem>
          <MenuItem value={90}>동아레코드</MenuItem>
          <MenuItem value={100}>마린쉬핑</MenuItem>
          <MenuItem value={110}>베트남모바일</MenuItem>
          <MenuItem value={120}>베트남쌀국수(자유시장)</MenuItem>
          <MenuItem value={130}>앙산아시아마트</MenuItem>
          <MenuItem value={140}>오피피에이</MenuItem>
          <MenuItem value={150}>조이낀쭈</MenuItem>
          <MenuItem value={160}>지엔케이모바일</MenuItem>
          <MenuItem value={170}>진주아시아마트</MenuItem>
          <MenuItem value={180}>테스트대리점</MenuItem>
        </Select>
      </FormControl> */}
    </>
  );
}
