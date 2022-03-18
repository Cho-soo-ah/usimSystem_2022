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
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
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

  // ------ axios -------

  return (
    <>
      <div className="tableInner">
        <h2>회원 관리</h2>
        <Box sx={{ width: "100%", textAlign: "right", mb: 1.5 }}>
          <SearchBtn items={["store", "barcode", "usim"]} />
        </Box>
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
                  return (
                    <TableRow
                      hover
                      onClick={(e) => handleClick(e, index)}
                      key={index}
                      id={obj.id}
                      sx={{ "& .MuiTableCell-root": { padding: "0 20px" } }}
                    >
                      <TableCell
                        scope="row"
                        padding="none"
                        align="center"
                        sx={{ minWidth: "80px" }}
                      >
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
            onClick={handlePagination}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </>
  );
}
