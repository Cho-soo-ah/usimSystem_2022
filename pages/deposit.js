import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Pagination,
} from "@mui/material";
import ExcelDownloadButton from "../component/ExcelDownloadButton";
import SearchBtn from "../component/SearchBtn";
const tableHead = [
  "날짜",
  "서비스 번호",
  "바코드 번호",
  "대리점 명",
  "가상계좌",
  "입금",
  "차감",
  "잔액",
  "비고",
  "상태",
];

export default function Deposit() {
  // ----- axios -----
  const [data, setData] = useState();
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const handlePagination = (e, value) => {
    setPage(value);
  };
  useEffect(() => {
    axios
      .get(`http://192.168.0.52:8080/sims?page=${page}&size=10`)
      .then((res) => {
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  }, [page]);
  // ----- axios -----
  const replaceRegex = /\B(?=(\d{3})+(?!\d))/g;
  const regex = (value) => value.toString().replace(replaceRegex, ",");

  return (
    <>
      <div className="tableInner">
        <h2>예치금 내역</h2>
        <Box sx={{ width: "100%", height: "35px", textAlign: "right", mb: 2 }}>
          <SearchBtn items={["date", "barcode", "store", "reason"]} />
        </Box>
        <TableContainer sx={{ mb: "16px" }}>
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
              {data &&
                data.map((obj, index) => {
                  return (
                    <TableRow hover key={index}>
                      <TableCell align="center" sx={{ minWidth: "155px" }}>
                        {obj.date}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "120px" }}>
                        {obj.serviceNumber}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "120px" }}>
                        {obj.barcodeNumber}
                      </TableCell>
                      <TableCell align="left" sx={{ minWidth: "140px" }}>
                        {obj.store}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "180px" }}>
                        {obj.account}
                      </TableCell>
                      <TableCell align="right" sx={{ minWidth: "120px" }}>
                        {/* &#65510; {regex(123456)} */}
                      </TableCell>
                      <TableCell align="right" sx={{ minWidth: "120px" }}>
                        {/* &#65510; {regex(obj.deduction)} */}
                      </TableCell>
                      <TableCell align="right" sx={{ minWidth: "120px" }}>
                        {/* &#65510; {regex(obj.balance)} */}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "70px" }}>
                        {obj.note}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "70px" }}>
                        {obj.state}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ width: "100%", textAlign: "right" }}>
          <ExcelDownloadButton />
        </Box>
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            onChange={handlePagination}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </>
  );
}
