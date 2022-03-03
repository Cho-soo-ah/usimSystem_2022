import * as React from "react";
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
  Typography,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/system";
import { visuallyHidden } from "@mui/utils";
// Table Input
import TableStoreInput from "../component/TableInput/TableStoreInput";
import TableBarcodeInput from "../component/TableInput/TableBarcodeInput";
import TableUsimInput from "../component/TableInput/TableUsimInput";
import ExcelDownloadButton from "../component/ExcelDownloadButton";

import Chip from "../component/Chips";
import CustomButton from "../component/CustomButton";
import StoreInput from "../component/StoreInput";

// ---------- header ----------
const CardWrap = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "10px",
  width: "24.3%",
  backgroundColor: "#0000000a",
  borderRadius: "4px",
});

const count = (
  <Box
    component="span"
    sx={{
      fontSize: "13px",
      mx: "2px",
      transform: "scale(0.8)",
    }}
  >
    건
  </Box>
);
// ---------- header ----------
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
  store,
  barcodeNumber,
  serviceNumber,
  usimNumber,
  date,
  state
) {
  return {
    store,
    barcodeNumber,
    serviceNumber,
    usimNumber,
    date,
    state,
  };
}
// table Cell
const rows = [
  createData(
    "오피피에이",
    "5246910054",
    "01068274007",
    "8982301218002564768F",
    "2022-02-15 20:51:49",
    <Chip status="cancel">취소</Chip>
  ),
  createData(
    "마린쉬핑",
    "5246910054",
    "01068274007",
    "8982301218002564768F",
    "2022-02-15 20:51:49",
    <Chip>접수</Chip>
  ),
  createData(
    "오피피에이",
    "5246910054",
    "01068274007",
    "8982301218002564768F",
    "2022-02-15 20:51:49",
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
    id: "store",
    label: "대리점 명",
  },
  {
    id: "barcodeNumber",
    label: "바코드 번호",
  },
  {
    id: "serviceNumber",
    label: "서비스 번호",
  },
  {
    id: "usimNumber",
    label: "유심 번호",
  },
  {
    id: "date",
    label: "적용일",
  },
  {
    id: "state",
    label: "상태",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
      sx={{
        bgcolor: "#0000000a",
        "& .MuiTableCell-root": {
          border: "1px solid #e5e5e5",
        },
      }}
    >
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sx={{ padding: "0 16px 0 36px" }}
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
// ---------- table ----------

export default function Store() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.store);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <>
      <div className="tableInner">
        <h2>대리점 개통 및 충전 현황</h2>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginTop: "16px",
          }}
        >
          <CardWrap>
            <Typography sx={{ fontSize: "13px" }}>미개통</Typography>
            <Typography sx={{ fontSize: "24px" }}>211{count}</Typography>
          </CardWrap>
          <CardWrap>
            <Typography sx={{ fontSize: "13px" }}>개통</Typography>
            <Typography sx={{ fontSize: "24px" }}>27{count}</Typography>
          </CardWrap>
          <CardWrap>
            <Typography sx={{ fontSize: "13px" }}>충전</Typography>
            <Typography sx={{ fontSize: "24px" }}>70{count}</Typography>
          </CardWrap>
          <CardWrap>
            <Typography sx={{ fontSize: "13px" }}>정지</Typography>
            <Typography sx={{ fontSize: "24px" }}>81{count}</Typography>
          </CardWrap>
        </Box>
        <InputWrap>
          <TableStoreInput />
          <TableBarcodeInput />
          <TableUsimInput />
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
        <TableContainer>
          <Table
            sx={{ minWidth: 750, marginTop: "16px" }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody
              sx={{
                "& .MuiTableCell-root": {
                  border: "1px solid #e5e5e5",
                  padding: "0 10px",
                },
              }}
            >
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.store);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.store)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.store}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="left"
                      >
                        {row.store}
                      </TableCell>
                      <TableCell align="center">{row.barcodeNumber}</TableCell>
                      <TableCell align="center">{row.serviceNumber}</TableCell>
                      <TableCell align="center">{row.usimNumber}</TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.state}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ width: "100%", marginBottom: "16px" }}>
          <Box
            sx={{
              display: "flex",
              width: "20%",
            }}
          >
            <StoreInput />
            <CustomButton sx={{ marginLeft: "16px", width: "40%" }}>
              이관
            </CustomButton>
          </Box>
        </Box>
        <Stack spacing={2}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </div>
    </>
  );
}
