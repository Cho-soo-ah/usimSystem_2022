import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableSortLabel,
  Pagination,
  Checkbox,
  Link,
} from "@mui/material";
import { useState, useEffect } from "react";
import { styled } from "@mui/system";

// Table Input
import StoreInput from "../../component/TextInput/StoreInput";
import BarcodeInput from "../../component/TextInput/BarcodeInput";
import UsimInput from "../../component/TextInput/UsimInput";
import ExcelDownloadButton from "../../component/ExcelDownloadButton";
import CustomButton from "../../component/CustomButton";
import AddBtn from "../../component/AddBtn";

const InputWrap = styled("div")({
  width: "100%",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  marginTop: "20px",
  "@media(minWidth: 780px)": {
    bgcolor: "red",
  },
});

const tableHead = ["이름", "이메일", "핸드폰 번호", "권한", "대리점"];

export default function MemberList() {
  // ------ axios -------
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const handlePagination = (e, value) => {
    setPage(value);
  };

  // useEffect(() => {
  //   axios
  //     // .get(`http://192.168.0.52:8080/products?page=${page}`)
  //     .then((res) => {
  //       // setProductArr(res.data.content);
  //       setTotalPages(res.data.totalPages);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [page]);

  // ------ axios -------
  return (
    <>
      <div className="tableInner">
        <h2>회원 관리</h2>
        <InputWrap>
          <StoreInput variant="standard" />
          <BarcodeInput variant="standard" />
          <UsimInput variant="standard" />
          <CustomButton
            variant="contained"
            type="submit"
            sx={{
              width: "30%",
              height: "40px",
              marginRight: "16px",
            }}
          >
            검색
          </CustomButton>
          <Box sx={{ width: "35px", height: "35px", mr: "8px" }}>
            <ExcelDownloadButton />
          </Box>
          <Link href="/members/memberUpload/" passHref sx={{ height: "35px" }}>
            <AddBtn />
          </Link>
        </InputWrap>
        <TableContainer>
          <Table
            sx={{ minWidth: 750, margin: "16px 0" }}
            aria-labelledby="tableTitle"
          >
            <TableHead>
              <Checkbox color="primary" />
              {tableHead.map((e, index) => {
                <TableCell key={index}>{e}</TableCell>;
              })}
            </TableHead>
            <TableBody
              sx={{
                "& .MuiTableCell-root": {
                  border: "1px solid #e5e5e5",
                  padding: "0 10px",
                },
              }}
            >
              <TableRow
                hover
                // onClick={handleClick}
                role="checkbox"
                tabIndex={-1}
                // key={row.store}
              >
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>
                <TableCell
                  // id={labelId}
                  scope="row"
                  padding="none"
                  align="left"
                ></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2}>
          <Pagination count={page} variant="outlined" shape="rounded" />
        </Stack>
      </div>
    </>
  );
}
