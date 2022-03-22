import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Link,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Pagination,
  Stack,
  Box,
} from "@mui/material";
import DeleteBtn from "../../component/Buttons/DeleteBtn";
import EditBtn from "../../component/Buttons/EditBtn";
import AddBtn from "../../component/Buttons/AddBtn";

export default function AgencyList() {
  const tableHead = [
    "대리점 타입",
    "사업자등록번호",
    "대리점 명",
    "은행",
    "가상계좌번호",
    "예치금",
    "추가 기능",
  ];
  // ------ axios -------
  const [data, setData] = useState([]);
  const maxSize = 10;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const handlePagination = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    axios
      .get(`http://192.168.0.52:8080/agencies?page=${page}&size=${maxSize}`)
      .then((res) => {
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  // ------ axios -------

  return (
    <div className="tableInner">
      <h2>대리점 관리</h2>

      <TableContainer>
        <Table
          sx={{
            mb: 1.5,
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
          aria-labelledby="tableTitle"
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
                    <TableCell
                      id={obj.id}
                      align="center"
                      sx={{ minWidth: "120px" }}
                    >
                      {obj.type}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "140px" }}>
                      {obj.corporateRegistrationNumber}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "140px" }}>
                      {obj.name}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "80px" }}>
                      {obj.bank}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "180px" }}>
                      {obj.virtualAccountNumber}
                    </TableCell>
                    <TableCell align="right" sx={{ minWidth: "130px" }}>
                      &#65510; {obj.freeChargeMonths}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "130px" }}>
                      <Link href={`/agencies/${obj.id}`} passhref="true">
                        <EditBtn />
                      </Link>
                      <DeleteBtn />
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
        <Link href="/agencies/agencyUpload" passhref="true">
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
