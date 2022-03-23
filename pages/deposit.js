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
import ExcelDownloadBtn from "../component/Buttons/ExcelDownloadBtn";
import SearchBtn from "../component/Buttons/SearchBtn";
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
  const [data, setData] = useState([]);
  const maxSize = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const handlePagination = (e, value) => {
    setPage(value);
  };
  useEffect(() => {
    axios
      .get(`http://192.168.0.52:8080/sims?page=${page}&size=${maxSize}`)
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
        <Box
          sx={{ width: "100%", height: "35px", textAlign: "right", mb: 1.5 }}
        >
          {/* <SearchBtn items={["date", "barcode", "store", "reason"]} /> */}
          <SearchBtn
            items={[
              "date",
              "barcode",
              "store",
              "reason",
              "product",
              "usim",
              "ris",
              "deposit",
            ]}
          />
        </Box>
        <TableContainer sx={{ mb: 1.5 }}>
          <Table
            sx={{
              borderRadius: "5px",
              overflow: "hidden",
              "& .MuiTableHead-root": {
                bgcolor: "#0000000a",
              },
              "& .MuiTableCell-head": {
                textAlign: "center",
              },
              "& .MuiTableCell-root": {
                border: "1px solid #dbdbdb",
                height: 40,
                padding: "0 10px",
              },
            }}
            aria-label="custom pagination table"
          >
            <TableHead>
              <TableRow>
                {tableHead.map((e, index) => (
                  <TableCell key={index} sx={{ padding: 0 }}>
                    {e}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
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
                        &#65510;{/*  {regex(123456)} */}
                      </TableCell>
                      <TableCell align="right" sx={{ minWidth: "120px" }}>
                        &#65510;{/*  {regex(obj.deduction)} */}
                      </TableCell>
                      <TableCell align="right" sx={{ minWidth: "120px" }}>
                        &#65510;{/*  {regex(sobj.balance)} */}
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
              {data &&
                Array.from(Array(maxSize - data.length), (e, index) => {
                  return (
                    <TableRow
                      sx={{ "& .MuiTableCell-root": { height: 40 } }}
                      key={index}
                    >
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ width: "100%", textAlign: "right" }}>
          <ExcelDownloadBtn />
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
