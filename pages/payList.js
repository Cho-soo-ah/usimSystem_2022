import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Stack,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Pagination,
} from "@mui/material";
import CustomButton from "../component/CustomButton";
// Table Input
import DateInput from "../component/TextInput/DateInput";
import StoreInput from "../component/TextInput/StoreInput";
import ExcelDownloadButton from "../component/ExcelDownloadButton";

const InputWrap = styled("div")({
  width: "100%",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  marginTop: "20px",
  "@media(minWidth: 780px)": {
    bgcolor: "red",
  },
});

const tableHead = ["날짜", "대리점 명", "가상계좌", "입금", "입금자"];

export default function PayList() {
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const handlePagination = (e, value) => {
    setPage(value);
  };
  // useEffect(() => {
  //   axios
  //     .get(`http://192.168.0.52:8080/sims?page=${page}&size=10`)
  //     .then((res) => {
  //       console.log(res);
  //       setData(res.data.content);
  //       setTotalPages(res.data.totalPages);
  //     })
  //     .catch((err) => console.log(err));
  // }, [page]);
  // ----- axios -----
  const [data, setData] = useState([
    {
      date: 1111111,
      store: 1111111,
      account: 1111111,
      deposit: 1111111,
      user: 1111111,
    },
    {
      date: 1111111,
      store: 1111111,
      account: 1111111,
      deposit: 1111111,
      user: 1111111,
    },
  ]);
  const [user, setUser] = useState("");
  const handleUser = (e) => {
    setUser(e.target.value);
  };
  return (
    <>
      <div className="tableInner">
        <h2>입금 내역</h2>
        <InputWrap>
          <DateInput />
          <StoreInput variant="standard" />
          <TextField
            variant="standard"
            label="입금자"
            onChange={handleUser}
            value={user}
            fullWidth
            sx={{ mr: "16px" }}
          ></TextField>
          <CustomButton
            variant="contained"
            type="submit"
            sx={{
              width: "30%",
              height: "40px",
              marginRight: "16px",
            }}
          >
            검색
          </CustomButton>
          <Box sx={{ width: "35px", height: "35px" }}>
            <ExcelDownloadButton />
          </Box>
        </InputWrap>

        <TableContainer sx={{ margin: "20px 0" }}>
          <Table
            sx={{
              minWidth: 500,
              verticalAlign: "bottom",
              "& .MuiTableRow-hover:hover": {
                bgcolor: "#f1f1f1",
              },
              borderRadius: "5px",
              overflow: "hidden",
            }}
            aria-label="custom pagination table"
          >
            <TableHead
              sx={{
                bgcolor: "#0000000a",
                width: "100%",
                "& .MuiTableCell-head": {
                  border: "1px solid #dbdbdb",
                  textAlign: "center",
                  height: "45px",
                  padding: "0 10px",
                },
                "& .MuiTableSortLabel-root": {
                  marginLeft: "25px",
                },
              }}
            >
              <TableRow>
                {tableHead.map((e, index) => (
                  <TableCell key={index} sx={{ padding: 0 }}>
                    {e}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "& .MuiTableCell-root": {
                  border: "1px solid #e5e5e5",
                  height: "45px",
                  padding: "0 10px",
                },
              }}
            >
              {data.map((obj, index) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell align="center" sx={{ minWidth: "155px" }}>
                      {obj.date}
                    </TableCell>
                    <TableCell align="left" sx={{ minWidth: "120px" }}>
                      {obj.store}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "100px" }}>
                      {obj.account}
                    </TableCell>
                    <TableCell align="right" sx={{ minWidth: "140px" }}>
                      {obj.deposit}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "140px" }}>
                      {obj.user}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2}>
          <Pagination
            count={page}
            onChange={handlePagination}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </>
  );
}
