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
} from "@mui/material";
import StoreInput from "../../component/TextInput/StoreInput";
import CustomButton from "../../component/CustomButton";
import ExcelDownloadButton from "../../component/ExcelDownloadButton";
import UsimListHeader from "../sims/UsimListHeader";
import FileUploadModal from "../../component/FileUploadModal";
import SearchBtn from "../../component/SearchBtn";

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
    <Checkbox key="usimCheckAll" color="primary"></Checkbox>,
    "대리점 명",
    "바코드 번호",
    "서비스 번호",
    "유심 번호",
    "적용일",
    "상태",
  ];
  // ----- CLICK -----
  const [selectedArr, setSelectedArr] = useState([]);
  const handleClick = (e, selectedId) => {
    if (e.ctrlKey) {
      if (selectedArr.includes(selectedId)) {
        let arr = selectedArr.filter((item) => {
          return item !== selectedId;
        });
        setSelectedArr(arr);
      } else {
        setSelectedArr((arr) => [...arr, selectedId]);
      }
    } else if (e.shiftKey) {
      if (selectedId > selectedArr[selectedArr.length - 1]) {
        for (
          let i = selectedArr[selectedArr.length - 1];
          i <= selectedId;
          i++
        ) {
          if (selectedArr.includes(i)) continue;
          setSelectedArr((arr) => [...arr, i]);
        }
      } else {
        for (
          let i = selectedArr[selectedArr.length - 1];
          i >= selectedId;
          i--
        ) {
          if (selectedArr.includes(i)) continue;
          setSelectedArr((arr) => [...arr, i]);
        }
      }
    } else {
      setSelectedArr(() => [selectedId]);
    }
  };

  // ----- CLICK -----
  const isSelected = (id) =>
    selectedArr.some((selectedId) => {
      return selectedId == id;
    });

  return (
    <div className="tableInner">
      <h2>대리점 개통 및 충전 내역</h2>
      <Box sx={{ width: "100%", textAlign: "right" }}>
        <SearchBtn items={["barcode", "store", "usim"]} />
      </Box>
      <UsimListHeader />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
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
                    role="checkbox"
                    key={index}
                    id={obj.id}
                    selected={isSelected(index)}
                  >
                    <TableCell
                      align="center"
                      sx={{ width: "20px", padding: 0 }}
                    >
                      <Checkbox
                        color="primary"
                        id={obj.id}
                        checked={isSelected(index)}
                      />
                    </TableCell>
                    <TableCell scope="row" padding="none" align="center">
                      {obj.store}
                    </TableCell>
                    <TableCell align="center">{obj.barcodeNumber}</TableCell>
                    <TableCell align="center">{obj.serviceNumber}</TableCell>
                    <TableCell align="center">{obj.usimNumber}</TableCell>
                    <TableCell align="center">{obj.date}</TableCell>
                    <TableCell align="center">{obj.state}</TableCell>
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
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "20%",
            marginTop: "16px",
          }}
        >
          <StoreInput variant="standard" />
          <CustomButton sx={{ margin: 0, width: "40%" }}>이관</CustomButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <FileUploadModal />
          <ExcelDownloadButton />
        </Box>
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
