import * as React from "react";
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
import StoreInput from "../component/TextInput/StoreInput";
import BarcodeInput from "../component/TextInput/BarcodeInput";
import UsimInput from "../component/TextInput/UsimInput";
import CustomButton from "../component/CustomButton";
import ExcelDownloadButton from "../component/ExcelDownloadButton";
import UsimListHeader from "./UsimListHeader";
import FileUploadModal from "../component/FileUploadModal";
import axios from "axios";
import { useState, useEffect } from "react";
import { TurnedIn, UsbOff } from "@mui/icons-material";

export default function UsimList() {
  // ----- axios -----
  const [data, setData] = useState([
    {
      barcodeNumber: 1111111,
      id: 13265,
      serviceNumber: 1212,
      usimNumber: 12121,
    },
    { barcodeNumber: 2222, id: 29894, serviceNumber: 1212, usimNumber: 12121 },
    {
      barcodeNumber: 3333333,
      id: 3541,
      serviceNumber: 1212,
      usimNumber: 12121,
    },
    {
      barcodeNumber: 444444,
      id: 45453,
      serviceNumber: 1212,
      usimNumber: 12121,
    },
    {
      barcodeNumber: 555555,
      id: 55354,
      serviceNumber: 1212,
      usimNumber: 12121,
    },
    { barcodeNumber: 66666, id: 61111, serviceNumber: 1212, usimNumber: 12121 },
    {
      barcodeNumber: 77777,
      id: 7234243,
      serviceNumber: 1212,
      usimNumber: 12121,
    },
    { barcodeNumber: 88888, id: 84243, serviceNumber: 1212, usimNumber: 12121 },
    {
      barcodeNumber: 999999,
      id: 942424,
      serviceNumber: 1212,
      usimNumber: 12121,
    },
    {
      barcodeNumber: 10101010,
      id: 104444,
      serviceNumber: 1212,
      usimNumber: 12121,
    },
  ]);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const handlePagination = (e, value) => {
    setPage(value);
  };
  // useEffect(() => {
  //   axios
  //     .get(`http://192.168.0.52:8080/sims?page=${page}&size=10`)
  //     .then((res) => {
  //       console.log(res);
  //       setData(res.data.content);
  //       setTotalPages(res.data.totalPages);
  //     })
  //     .catch((err) => console.log(err));
  // }, [page]);
  // ----- axios -----
  const tableHead = [
    <Checkbox key="usimCheckAll" color="primary"></Checkbox>,
    "대리점 명",
    "바코드 번호",
    "서비스 번호",
    "유심 번호",
    "적용일",
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
      <h2>유심 리스트</h2>
      {/* <br /> */}
      {/* 선택된 ID : {selectedArr.map((a) => a + " ")} */}
      <UsimListHeader></UsimListHeader>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: "100%",
          mb: "16px",
        }}
      >
        <StoreInput variant="standard" />
        <BarcodeInput variant="standard" />
        <UsimInput variant="standard" />
        <CustomButton
          sx={{
            width: "30%",
            height: "40px",
          }}
        >
          검색
        </CustomButton>
      </Box>
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
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        id={obj.id}
                        checked={isSelected(index)}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      // id={labelId}
                      scope="row"
                      padding="none"
                      align="center"
                    >
                      {obj.store}
                    </TableCell>
                    <TableCell align="center">{obj.barcodeNumber}</TableCell>
                    <TableCell align="center">{obj.serviceNumber}</TableCell>
                    <TableCell align="center">{obj.usimNumber}</TableCell>
                    <TableCell align="center">{obj.date}</TableCell>
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
