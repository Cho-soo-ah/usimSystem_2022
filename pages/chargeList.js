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
import CustomButton from "../component/CustomButton";
import InputWrap from "../component/InputWrap";
// Table Input
import DateInput from "../component/TextInput/DateInput";
import StoreInput from "../component/TextInput/StoreInput";
import BarcodeInput from "../component/TextInput/BarcodeInput";
import ProductInput from "../component/TextInput/ProductInput";
import RisStateInput from "../component/TextInput/RisStateInput";

const tableHead = [
  "날짜",
  "대리점 명",
  "구분",
  "바코드 번호",
  "핸드폰 번호",
  "상품",
  "상태",
  "RIS 상태",
];

export default function ChargeList() {
  const [totalPages, setTotalPages] = useState();
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
  const [data, setData] = useState();
  return (
    <>
      <div className="tableInner">
        <h2>개통 및 충전 내역</h2>
        <InputWrap>
          <DateInput />
          <StoreInput />
          <BarcodeInput />
          <ProductInput />
          <RisStateInput />
          <CustomButton
            variant="contained"
            type="submit"
            sx={{
              width: "30%",
              mb: "16px",
            }}
          >
            검색
          </CustomButton>
        </InputWrap>

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
                      <TableCell sx={{ minWidth: "170px" }}>
                        {obj.store}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "100px" }}>
                        {obj.division}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "140px" }}>
                        {obj.barcode}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "140px" }}>
                        {obj.phoneNumber}
                      </TableCell>
                      <TableCell sx={{ minWidth: "170px" }}>
                        {obj.product}
                      </TableCell>
                      <TableCell align="center">{obj.state}</TableCell>
                      <TableCell align="center" sx={{ minWidth: "125px" }}>
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
