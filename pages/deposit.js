import * as React from "react";
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
} from "@mui/material";
import CustomButton from "../component/CustomButton";
// Table Input
import TableDateInput from "../component/TableInput/TableDateInput";
import TableStoreInput from "../component/TableInput/TableStoreInput";
import TableBarcodeInput from "../component/TableInput/TableBarcodeInput";
import ExcelDownloadButton from "../component/ExcelDownloadButton";
import Chip from "../component/Chips";

import { styled } from "@mui/system";

import { visuallyHidden } from "@mui/utils";
import TableReasonInput from "../component/TableInput/TableReasonInput";

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

// ---------- table ----------

function createData(
  date,
  phoneNumber,
  barcodeNumber,
  store,
  account,
  deposit,
  deduction,
  balance,
  note,
  state
) {
  return {
    date,
    phoneNumber,
    barcodeNumber,
    store,
    account,
    deposit,
    deduction,
    balance,
    note,
    state,
  };
}
// table Cell
const rows = [
  createData(
    "2022-02-15 20:51:49",
    "01068274007",
    "5246910054",
    "오피피에이",
    "60438085518952 (우리은행)",
    "\uFFE6200,000",
    "\uFFE626,000",
    "\uFFE646,000",
    "충전(1차)",
    <Chip status="cancel">취소</Chip>
  ),
  createData(
    "2022-02-15 20:51:49",
    "01068274007",
    "5246910054",
    "오피피에이",
    "60438085518952 (우리은행)",
    "\uFFE6200,000",
    "\uFFE626,000",
    "\uFFE646,000",
    "충전(1차)",
    <Chip>접수</Chip>
  ),
  createData(
    "2022-02-15 20:51:49",
    "01068274007",
    "5246910054",
    "오피피에이",
    "60438085518952 (우리은행)",
    "\uFFE6200,000",
    "\uFFE626,000",
    "\uFFE646,000",
    "충전(1차)",
    <Chip status="complete">완료</Chip>
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "data",
    label: "날짜",
  },
  {
    id: "phoneNumber",
    label: "핸드폰 번호",
  },
  {
    id: "barcodeNumber",
    label: "바코드 번호",
  },
  {
    id: "store",
    label: "대리점 명",
  },
  {
    id: "account",
    label: "가상계좌",
  },
  {
    id: "deposit",
    label: "입금",
  },
  {
    id: "deduction",
    label: "차감",
  },
  {
    id: "balance",
    label: "잔액",
  },
  {
    id: "note",
    label: "비고",
  },
  {
    id: "state",
    label: "상태",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
      sx={{
        bgcolor: "#0000000a",
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
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
// ---------- table ----------

export default function Deposit() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <div className="tableInner">
        <h2>예치금 내역</h2>
        <InputWrap>
          <TableDateInput />
          <TableBarcodeInput />
          <TableStoreInput />
          <TableReasonInput />
          <CustomButton
            variant="contained"
            type="submit"
            // disabled={isSubmitting}
            sx={{
              width: "30%",
              height: "40px",
              marginRight: "16px",
            }}
          >
            검색
          </CustomButton>
          <Box sx={{ width: "35px", height: "35px" }}>
            <ExcelDownloadButton />
          </Box>
        </InputWrap>

        <TableContainer sx={{ margin: "20px 0" }}>
          <Table
            sx={{
              minWidth: 500,
              verticalAlign: "bottom",
              "& .MuiTableRow-hover:hover": {
                bgcolor: "#f1f1f1",
              },
              borderRadius: "5px",
              overflow: "hidden",
            }}
            aria-label="custom pagination table"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              align="center"
            />
            <TableBody
              sx={{
                "& .MuiTableCell-root": {
                  border: "1px solid #e5e5e5",
                  height: "45px",
                  padding: "0 10px",
                },
              }}
            >
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row, index) => {
                  return (
                    <TableRow hover key={row.data}>
                      <TableCell align="center" sx={{ minWidth: "155px" }}>
                        {row.date}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "120px" }}>
                        {row.phoneNumber}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "100px" }}>
                        {row.barcodeNumber}
                      </TableCell>
                      <TableCell align="left" sx={{ minWidth: "140px" }}>
                        {row.store}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "140px" }}>
                        {row.account}
                      </TableCell>
                      <TableCell align="right" sx={{ minWidth: "100px" }}>
                        {row.deposit}
                      </TableCell>
                      <TableCell align="right" sx={{ minWidth: "100px" }}>
                        {row.deduction}
                      </TableCell>
                      <TableCell align="right" sx={{ minWidth: "100px" }}>
                        {row.balance}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "125px" }}>
                        {row.note}
                      </TableCell>
                      <TableCell align="center">{row.state}</TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </div>
    </>
  );
}
