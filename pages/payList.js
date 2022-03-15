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
import ExcelDownloadButton from "../component/ExcelDownloadButton";
import SearchBtn from "../component/SearchBtn";

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
        <h2>입금 내역</h2>
        <Box sx={{ width: "100%", textAlign: "right" }}>
          <SearchBtn items={["date", "store", "reason", "deposit"]} />
        </Box>
        <TableContainer sx={{ margin: "12px 0" }}>
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
                        {obj.createDate}
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            height: "35px",
          }}
        >
          <ExcelDownloadButton />
        </Box>
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
