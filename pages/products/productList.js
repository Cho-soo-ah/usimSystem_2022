import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Link,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Pagination,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import AddBtn from "../../component/AddBtn";
import CustomDialog from "../../component/CustomDialog";

export default function ProductList() {
  const tableHead = [
    "대리점 타입",
    "상품명",
    "배정 비용",
    "개통 비용",
    "충전 비용",
    "무료 충전 개월 수",
    "수정 / 삭제",
  ];
  // ------ axios -------
  const [productArr, setProductArr] = useState();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const handlePagination = (e, value) => {
    setPage(value);
  };

  // ------ axios -------

  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState();
  const handleClickOpen = (e) => {
    setOpen(true);
    setDeleteData(e.currentTarget.id);
  };
  const handleDelete = (e) => {
    // deleteData;
  };

  return (
    <div className="tableInner">
      <h2>상품 관리</h2>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Link href="/products/productUpload/" passHref>
          <AddBtn />
        </Link>
      </Box>
      <TableContainer>
        <Table
          sx={{ minWidth: 750, margin: "7px 0 16px" }}
          aria-labelledby="tableTitle"
        >
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
            {productArr &&
              productArr.map((obj, index) => {
                const replaceRegex = /\B(?=(\d{3})+(?!\d))/g;
                const regex = (value) => value.replace(replaceRegex, ",");
                console.log(regex(obj.assignCost.toString()));
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    sx={{ "& .MuiTableCell-root": { padding: "0 20px" } }}
                  >
                    <TableCell
                      component="th"
                      id={obj.id}
                      scope="row"
                      padding="none"
                      align="center"
                    ></TableCell>
                    <TableCell>{obj.name}</TableCell>
                    <TableCell align="right">
                      &#65510; {regex(obj.assignCost.toString())}
                    </TableCell>
                    <TableCell align="right">
                      &#65510; {regex(obj.rentalCost.toString())}
                    </TableCell>
                    <TableCell align="right">
                      &#65510; {regex(obj.chargeCost.toString())}
                    </TableCell>
                    <TableCell align="center">{obj.freeChargeMonths}</TableCell>
                    <TableCell align="center" width="130px">
                      <Link href={`/products/${obj.id}`}>
                        <IconButton aria-label="Example">
                          <Edit
                            sx={{
                              cursor: "pointer",
                              color: "#5a5a5a",
                            }}
                          />
                        </IconButton>
                      </Link>
                      <IconButton aria-label="Example">
                        <Delete
                          variant="outlined"
                          onClick={handleClickOpen}
                          id={obj.id}
                          sx={{
                            cursor: "pointer",
                            color: "#5a5a5a",
                            padding: 0,
                          }}
                        ></Delete>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          variant="outlined"
          shape="rounded"
          onChange={handlePagination}
        />
      </Stack>
      <CustomDialog message="삭제하시겠습니까?" open={open} setOpen={setOpen}>
        <Button
          onClick={handleDelete}
          sx={{ background: "none", "&:hover": { background: "none" } }}
        >
          삭제
        </Button>
      </CustomDialog>
    </div>
  );
}
