import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
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

const tableHead = ["날짜", "대리점 명", "가상계좌", "입금", "입금자"];

export default function PayList() {
  const [data, setData] = useState("");
  const [totalPages, setTotalPages] = useState("");
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
  return (
    <>
      <div className="tableInner">
        <h2>입금 내역</h2>
        <Box sx={{ width: "100%", textAlign: "right", mb: 1.5 }}>
          <SearchBtn items={["date", "store", "reason", "deposit"]} />
        </Box>
        <TableContainer sx={{ mb: "12px" }}>
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
                        {obj.createDate}
                      </TableCell>
                      <TableCell align="left" sx={{ minWidth: "140px" }}>
                        {obj.store}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "180px" }}>
                        {obj.account}
                      </TableCell>
                      <TableCell align="right" sx={{ minWidth: "120px" }}>
                        {obj.deposit}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "120px" }}>
                        {obj.user}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            height: "35px",
          }}
        >
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
