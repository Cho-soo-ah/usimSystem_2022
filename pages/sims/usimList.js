import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Checkbox,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Pagination,
  Stack,
  Link,
} from "@mui/material";
import UsimListHeader from "./UsimListHeader";
import EscalationWrap from "../../component/EscalationWrap";
import ExcelDownloadBtn from "../../component/Buttons/ExcelDownloadBtn";
import FileUploadModal from "../../component/Buttons/FileUploadModal";
import SearchBtn from "../../component/Buttons/SearchBtn";
import AddBtn from "../../component/Buttons/AddBtn";
import DeleteBtn from "../../component/Buttons/DeleteBtn";
import EditBtn from "../../component/Buttons/EditBtn";

export default function UsimList() {
  // ----- axios -----
  const [data, setData] = useState("");
  const maxSize = 10;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
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
  const tableHead = [
    <Checkbox key="usimCheckAll" color="primary"></Checkbox>,
    "대리점명",
    "바코드 번호",
    "서비스 번호",
    "유심 번호",
    "적용일",
    "추가 기능",
  ];
  // ----- CLICK -----
  const [selectedArr, setSelectedArr] = useState([]);
  const handleClick = (e, selectedId) => {
    console.log(e, selectedId);
    // if (e.ctrlKey) {
    //   if (selectedArr.includes(selectedId)) {
    //     let arr = selectedArr.filter((item) => {
    //       return item !== selectedId;
    //     });
    //     setSelectedArr(arr);
    //   } else {
    //     setSelectedArr((arr) => [...arr, selectedId]);
    //   }
    // } else if (e.shiftKey) {
    //   if (selectedId > selectedArr[selectedArr.length - 1]) {
    //     for (
    //       let i = selectedArr[selectedArr.length - 1];
    //       i <= selectedId;
    //       i++
    //     ) {
    //       if (selectedArr.includes(i)) continue;
    //       setSelectedArr((arr) => [...arr, i]);
    //     }
    //   } else {
    //     for (
    //       let i = selectedArr[selectedArr.length - 1];
    //       i >= selectedId;
    //       i--
    //     ) {
    //       if (selectedArr.includes(i)) continue;
    //       setSelectedArr((arr) => [...arr, i]);
    //     }
    //   }
    // } else {
    //   setSelectedArr(() => [selectedId]);
    // }
  };
  // ----- CLICK -----
  const isSelected = (id) =>
    selectedArr.some((selectedId) => {
      return selectedId == id;
    });
  return (
    <div className="tableInner">
      <h2>유심 관리</h2>
      <Box
        sx={{
          width: "100%",
          height: "35px",
          mb: 1.5,
          display: "flex",
          justifyContent:
            selectedArr.length === 0 ? "flex-end" : "space-between",
        }}
      >
        {selectedArr.length === 0 ? null : <EscalationWrap />}
        <SearchBtn items={["barcode", "store", "usim"]} />
      </Box>
      <UsimListHeader />
      <TableContainer>
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
                console.log("data", data);
                return (
                  <TableRow
                    hover
                    key={index}
                    id={obj.id}
                    selected={isSelected(index)}
                    onClick={handleClick}
                  >
                    <TableCell
                      align="center"
                      sx={{ width: "10px", padding: 0 }}
                    >
                      <Checkbox
                        color="primary"
                        id={obj.id}
                        checked={isSelected(index)}
                        sx={{ p: 0 }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "140px" }}>
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
                    <TableCell align="center" sx={{ minWidth: "130px" }}>
                      {obj.createDate}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "130px" }}>
                      <Link href={`/sims/${obj.id}`} passhref="true">
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
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          mt: 1.5,
        }}
      >
        <FileUploadModal />
        <ExcelDownloadBtn />
        <Link href="/sims/usimUpload" passhref="true">
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
