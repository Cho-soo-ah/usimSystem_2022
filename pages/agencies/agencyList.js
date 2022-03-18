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
  const [agencyArr, setAgencyArr] = useState();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const handlePagination = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    axios
      .get(`http://192.168.0.52:8080/agencies?page=${page}&size=10`)
      .then((res) => {
        setAgencyArr(res.data.content);
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
            {agencyArr &&
              agencyArr.map((obj, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
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
        <Link href="/agencies/agencyUpload" passHref>
          <AddBtn />
        </Link>
      </Box>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          variant="outlined"
          shape="rounded"
          onChange={handlePagination}
        />
      </Stack>
    </div>
  );
}
