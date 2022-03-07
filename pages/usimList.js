import * as React from "react";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import {
  Box,
  Checkbox,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableSortLabel,
  Pagination,
  Stack,
} from "@mui/material";
import StoreInput from "../component/StoreInput";
import CustomButton from "../component/CustomButton";
import ExcelDownloadButton from "../component/ExcelDownloadButton";
import UsimListHeader from "./UsimListHeader";
import FileUploadModal from "../component/FileUploadModal";

// table Cell
function createData(store, barcodeNumber, serviceNumber, usimNumber, date) {
  return {
    store,
    barcodeNumber,
    serviceNumber,
    usimNumber,
    date,
  };
}
const rows = [
  createData(
    "오피피에이",
    "5246910054",
    "01068274007",
    "8982301218002563927F",
    "2022-02-15"
  ),
  createData(
    "마린쉬핑",
    "5246910081",
    "01068274038",
    "8982301218002563927F",
    "2022-02-15"
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

export default function UsimList() {
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

  const UsimListBottom = () => {
    return (
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
          }}
        >
          <StoreInput />
          <CustomButton sx={{ marginLeft: "16px", width: "40%" }}>
            이관
          </CustomButton>
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
    );
  };

  return (
    <div className="tableInner">
      <h2>유심 리스트</h2>
      <UsimListHeader></UsimListHeader>

      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
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
                      align="center"
                    >
                      {row.store}
                    </TableCell>
                    <TableCell align="center">{row.barcodeNumber}</TableCell>
                    <TableCell align="center">{row.serviceNumber}</TableCell>
                    <TableCell align="center">{row.usimNumber}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <UsimListBottom />
      <Stack spacing={2}>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
    </div>
  );
}
