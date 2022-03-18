import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Link,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Pagination,
  Stack,
} from "@mui/material";
import AddBtn from "../../component/Buttons/AddBtn";
import DeleteBtn from "../../component/Buttons/DeleteBtn";
import EditBtn from "../../component/Buttons/EditBtn";

const tableHead = [
  "대리점 타입",
  "상품명",
  "배정 비용",
  "개통 비용",
  "충전 비용",
  "무료 충전 개월 수",
  "추가 기능",
];

export default function ProductList() {
  // ------ axios -------
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const handlePagination = (e, value) => {
    setPage(value);
  };
  // ----- axios -----
  useEffect(() => {
    axios
      .get(`http://192.168.0.52:8080/products?page=${page}&size=10`)
      .then((res) => {
        console.log(res);
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  }, [page]);
  // ----- axios -----
  return (
    <div className="tableInner">
      <h2>상품 관리</h2>
      <TableContainer>
        <Table sx={{ minWidth: 750, mb: 1.5 }} aria-labelledby="tableTitle">
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
              },
            }}
          >
            {data &&
              data.map((obj, index) => {
                const replaceRegex = /\B(?=(\d{3})+(?!\d))/g;
                const regex = (value) => value.replace(replaceRegex, ",");
                console.log(regex(obj.assignCost.toString()));
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={index}
                    sx={{ "& .MuiTableCell-root": { padding: "0 20px" } }}
                  >
                    <TableCell
                      component="th"
                      id={obj.id}
                      scope="row"
                      padding="none"
                      align="center"
                      sx={{ minWidth: "120px" }}
                    ></TableCell>
                    <TableCell sx={{ minWidth: "180px" }}>{obj.name}</TableCell>
                    <TableCell align="right" sx={{ minWidth: "130px" }}>
                      &#65510; {regex(obj.assignCost.toString())}
                    </TableCell>
                    <TableCell align="right" sx={{ minWidth: "130px" }}>
                      &#65510; {regex(obj.rentalCost.toString())}
                    </TableCell>
                    <TableCell align="right" sx={{ minWidth: "130px" }}>
                      &#65510; {regex(obj.chargeCost.toString())}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "130px" }}>
                      {obj.freeChargeMonths}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "130px" }}>
                      <Link href={`/products/${obj.id}`}>
                        <EditBtn />
                      </Link>
                      <DeleteBtn />
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
          height: "35px",
          display: "flex",
          justifyContent: "flex-end",
          mb: 1.5,
        }}
      >
        <Link href="/products/productUpload" passhref="true">
          <AddBtn />
        </Link>
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
  );
}
