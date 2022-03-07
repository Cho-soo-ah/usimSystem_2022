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
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/system";
import { visuallyHidden } from "@mui/utils";
// Table Input
import TableStoreInput from "../component/TableInput/TableStoreInput";
import TableBarcodeInput from "../component/TableInput/TableBarcodeInput";
import TableUsimInput from "../component/TableInput/TableUsimInput";
import ExcelDownloadButton from "../component/ExcelDownloadButton";
import Search from "@mui/icons-material/Search";

import CustomButton from "../component/CustomButton";
import StoreInput from "../component/StoreInput";

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
function createData(userName, email, phoneNumber, authority, store) {
  return {
    userName,
    email,
    phoneNumber,
    authority,
    store,
  };
}
// table Cell
const rows = [
  // createData(
  createData("김나나", "aaaa@gmail.com", "01068274007", "대리인", "구주통신"),
  // createData(
  createData("박마마", "aaaa@gmail.com", "01068274007", "관리자", "동아레코드"),
  createData(
    "오피피에이",
    "aaaa@gmail.com",
    "01068274007",
    "대리인",
    "동아레코드"
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
    id: "userName",
    label: "이름",
  },
  {
    id: "email",
    label: "이메일",
  },
  {
    id: "phoneNumber",
    label: "핸드폰 번호",
  },
  {
    id: "authority",
    label: "권한",
  },
  {
    id: "store",
    label: "대리점",
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

// <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     ></Box>
// const toggleDrawer = (anchor, open) => (event) => {
//   if (
//     event.type === "keydown" &&
//     (event.key === "Tab" || event.key === "Shift")
//   ) {
//     return;
//   }

//   setState({ ...state, [anchor]: open });
// };

export default function Member() {
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
        <h2>회원 관리</h2>
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
            {/* <Search /> */}
            검색
          </CustomButton>
          <Box sx={{ width: "35px", height: "35px" }}>
            <ExcelDownloadButton />
          </Box>
        </InputWrap>
        <TableContainer>
          <Table
            sx={{ minWidth: 750, margin: "16px 0" }}
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
                        {row.userName}
                      </TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.phoneNumber}</TableCell>
                      <TableCell align="center">{row.authority}</TableCell>
                      <TableCell align="center">{row.store}</TableCell>
                    </TableRow>
                  );
                })}
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
