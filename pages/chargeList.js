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
import SearchBtn from "../component/SearchBtn";

const tableHead = [
  "날짜",
  "대리점 명",
  "구분",
  "바코드 번호",
  "서비스 번호",
  "상품",
  "상태",
  "RIS 상태",
];

export default function ChargeList() {
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const handlePagination = (e, value) => {
    setPage(value);
  };
  // ----- axios -----
  useEffect(() => {
    axios
      .get(`http://192.168.0.52:8080/sims?page=${page}&size=10`)
      .then((res) => {
        console.log(res);
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  }, [page]);
  // ----- axios -----
  return (
    <>
      <div className="tableInner">
        <h2>개통 및 충전 내역</h2>
        <Box sx={{ width: "100%", textAlign: "right", mb: 1.5 }}>
          <SearchBtn items={["date", "barcode", "store", "product", "ris"]} />
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
                      <TableCell align="center" sx={{ minWidth: "130px" }}>
                        {/* {obj.createDate} */}
                        2022-03-10
                      </TableCell>
                      <TableCell sx={{ minWidth: "140px" }}>
                        {obj.store}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "100px" }}>
                        {obj.division}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "120px" }}>
                        {obj.barcodeNumber}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "120px" }}>
                        {obj.serviceNumber}
                      </TableCell>
                      <TableCell sx={{ minWidth: "170px" }}>
                        {obj.serialNumber}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "80px" }}>
                        {obj.state}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "80px" }}>
                        {obj.risState}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
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
