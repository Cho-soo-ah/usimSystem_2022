import * as React from "react";
import { useState } from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import CustomButton from "../component/CustomButton";
import StoreInput from "../component/StoreInput";
import BarcodePhoneInput from "../component/BarcodePhoneInput";

// ---------- table ----------
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(
  date,
  store,
  division,
  barcode,
  phoneNumber,
  product,
  state,
  risState
) {
  return {
    date,
    store,
    division,
    barcode,
    phoneNumber,
    product,
    state,
    risState,
  };
}
// table Cell
const rows = [
  createData(
    "2022-02-15 20:51:49",
    "오피피에이",
    "충천 대행",
    "5246910054",
    "01068274007",
    "825SIM 330",
    "완료",
    "미완"
  ),
  createData(
    "2022-02-15 20:51:49",
    "오피피에이",
    "충천 대행",
    "5246910054",
    "01068274007",
    "825SIM 330",
    "완료",
    "미완"
  ),
  createData(
    "2022-02-15 20:51:49",
    "오피피에이",
    "충천 대행",
    "5246910054",
    "01068274007",
    "825SIM 330",
    "완료",
    "미완"
  ),
  createData(
    "2022-02-15 20:51:49",
    "오피피에이",
    "충천 대행",
    "5246910054",
    "01068274007",
    "825SIM 330",
    "완료",
    "미완"
  ),
  createData(
    "2022-02-15 20:51:49",
    "오피피에이",
    "충천 대행",
    "5246910054",
    "01068274007",
    "825SIM 330",
    "완료",
    "미완"
  ),
  createData(
    "2022-02-15 20:51:49",
    "오피피에이",
    "충천 대행",
    "5246910054",
    "01068274007",
    "825SIM 330",
    "완료",
    "미완"
  ),
  createData(
    "2022-02-15 20:51:49",
    "오피피에이",
    "충천 대행",
    "5246910054",
    "01068274007",
    "825SIM 330",
    "완료",
    "미완"
  ),
  createData(
    "2022-02-15 20:51:49",
    "오피피에이",
    "충천 대행",
    "5246910054",
    "01068274007",
    "825SIM 330",
    "완료",
    "미완"
  ),
  createData(
    "2022-02-15 20:51:49",
    "오피피에이",
    "충천 대행",
    "5246910054",
    "01068274007",
    "825SIM 330",
    "완료",
    "미완"
  ),
  createData(
    "2022-02-15 20:51:49",
    "오피피에이",
    "충천 대행",
    "5246910054",
    "01068274007",
    "825SIM 330",
    "완료",
    "미완"
  ),
  createData(
    "2022-02-15 20:51:49",
    "오피피에이",
    "충천 대행",
    "5246910054",
    "01068274007",
    "825SIM 330",
    "완료",
    "미완"
  ),
  createData(
    "2022-02-15 20:51:49",
    "오피피에이",
    "충천 대행",
    "5246910054",
    "01068274007",
    "825SIM 330",
    "완료",
    "미완"
  ),
  createData(
    "2022-02-15 20:51:49",
    "오피피에이",
    "충천 대행",
    "5246910054",
    "01068274007",
    "825SIM 330",
    "완료",
    "미완"
  ),
];
// ---------- table ----------

export default function ChargeList() {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  // ---------- table ----------
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // ---------- table ----------
  return (
    <>
      <div className="tableInner">
        <h2>개통 및 충전 처리</h2>
        <Box>
          <CustomButton
            variant="contained"
            fullWidth
            type="submit"
            // disabled={isSubmitting}
          >
            검색
          </CustomButton>
        </Box>

        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table
            sx={{ minWidth: 500, verticalAlign: "bottonm" }}
            aria-label="custom pagination table"
          >
            <TableBody>
              <TableRow key="filter">
                <TableCell>
                  {/* 날짜 */}
                  <StoreInput />
                </TableCell>
                <TableCell>
                  {/* 대리점 명 */}
                  <StoreInput />
                </TableCell>
                <TableCell>
                  {/* 구분 */}
                  <StoreInput />
                </TableCell>
                <TableCell>
                  {/* 바코드 번호 */}
                  <BarcodePhoneInput></BarcodePhoneInput>
                </TableCell>
                <TableCell>
                  {/* 핸드폰 번호 */}
                  <BarcodePhoneInput></BarcodePhoneInput>
                </TableCell>
                <TableCell>
                  {/* 상품 */}
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="product">상품</InputLabel>
                    <Select
                      labelId="product"
                      id="product"
                      value={value}
                      label="상품"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>825SIM 330</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  {/* 상태 */}
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="product">상태</InputLabel>
                    <Select
                      labelId="product"
                      id="product"
                      value={value}
                      label="상태"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>완료</MenuItem>
                      <MenuItem value={20}>진행</MenuItem>
                      <MenuItem value={30}>거절</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  {/* RIS 처리 여부 */}
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="product">RIS 처리 여부</InputLabel>
                    <Select
                      labelId="product"
                      id="product"
                      value={value}
                      label="RIS 처리 여부"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>완료</MenuItem>
                      <MenuItem value={20}>미완</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.date}>
                  <TableCell style={{ width: 160 }}>{row.date}</TableCell>
                  <TableCell style={{ width: 160 }}>{row.store}</TableCell>
                  <TableCell style={{ width: 160 }}>{row.division}</TableCell>
                  <TableCell style={{ width: 160 }}>{row.barcode}</TableCell>
                  <TableCell style={{ width: 160 }}>
                    {row.phoneNumber}
                  </TableCell>
                  <TableCell style={{ width: 160 }}>{row.product}</TableCell>
                  <TableCell style={{ width: 160 }}>{row.state}</TableCell>
                  <TableCell style={{ width: 160 }}>{row.risState}</TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
