import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Pagination,
  Stack,
} from "@mui/material";
import ExcelDownloadBtn from "../../component/Buttons/ExcelDownloadBtn";
import UsimListHeader from "../sims/UsimListHeader";
import FileUploadModal from "../../component/Buttons/FileUploadModal";
import SearchBtn from "../../component/Buttons/SearchBtn";

export default function AgencyState() {
  // ----- axios -----
  const [data, setData] = useState();
  const [totalPages, setTotalPages] = useState();
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
  const tableHead = [
    "대리점 명",
    "바코드 번호",
    "서비스 번호",
    "유심 번호",
    "적용일",
    "상태",
  ];

  return (
    <div className="tableInner">
      <h2>대리점 개통 및 충전 내역</h2>
      <Box sx={{ width: "100%", textAlign: "right", mb: 1.5 }}>
        <SearchBtn items={["barcode", "store", "usim"]} />
      </Box>
      <UsimListHeader />
      <TableContainer>
        <Table aria-labelledby="tableTitle">
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
                  <TableRow hover role="checkbox" key={index} id={obj.id}>
                    <TableCell
                      scope="row"
                      padding="none"
                      align="center"
                      sx={{ minWidth: "140px" }}
                    >
                      {obj.store}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "120px" }}>
                      {obj.barcodeNumber}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "120px" }}>
                      {obj.serviceNumber}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "140px" }}>
                      {obj.usimNumber}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "140px" }}>
                      {obj.date}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "80px" }}>
                      {obj.state}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          mt: 1.5,
        }}
      >
        <FileUploadModal />
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
  );
}
