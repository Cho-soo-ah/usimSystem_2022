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
  Link,
} from "@mui/material";
import ExcelDownloadBtn from "../../component/Buttons/ExcelDownloadBtn";
import AddBtn from "../../component/Buttons/AddBtn";
import SearchBtn from "../../component/Buttons/SearchBtn";
import DeleteBtn from "../../component/Buttons/DeleteBtn";
import EditBtn from "../../component/Buttons/EditBtn";

const tableHead = [
  "이름",
  "이메일",
  "핸드폰 번호",
  "권한",
  "대리점",
  "추가 기능",
];

export default function MemberList() {
  // ------ axios -------
  const [data, setData] = useState([]);
  const maxSize = 10;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  // ------ axios -------

  return (
    <>
      <div className="tableInner">
        <h2>회원 관리</h2>
        <Box sx={{ width: "100%", textAlign: "right", mb: 1.5 }}>
          <SearchBtn items={["store", "barcode", "usim"]} />
        </Box>
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
                    <TableRow
                      hover
                      onClick={(e) => handleClick(e, index)}
                      key={index}
                      id={obj.id}
                    >
                      <TableCell align="center" sx={{ minWidth: "80px" }}>
                        김떙떙
                        {/* {obj.store} */}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "180px" }}>
                        sample@email.com
                        {/* {obj.barcodeNumber} */}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "120px" }}>
                        {obj.serviceNumber}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "80px" }}>
                        {obj.usimNumber}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "120px" }}>
                        {obj.serviceNumber}
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
          <Link
            href="/members/memberUpload/"
            passhref="true"
            sx={{ height: "35px" }}
          >
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
    </>
  );
}
