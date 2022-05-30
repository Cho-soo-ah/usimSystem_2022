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

const tableHead = ["날짜", "대리점명", "가상계좌", "입금", "입금자"];

export default function PayList() {
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
  return (
    <>
      <div className="tableInner">
        <h2>입금 내역</h2>
        <Box sx={{ width: "100%", textAlign: "right", mb: 1.5 }}>
          <SearchBtn items={["date", "store", "reason", "deposit"]} />
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
