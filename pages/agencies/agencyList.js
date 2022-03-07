import * as React from "react";
import {
  Box,
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
import CustomDialog from "../../component/CustomDialog";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Add,
  BorderColor,
  Delete,
  Edit,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import Link from "next/link";

export default function AgencyList() {
  const tableHead = [
    "대리점 타입",
    "사업자등록번호",
    "대리점 명",
    "은행",
    "가상계좌번호",
    "예치금",
    "수정 / 삭제",
  ];
  // ------ axios -------
  const [agencyArr, setAgencyArr] = useState();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const handlePagination = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    console.log("useEffect!!!!!!");
    axios
      .get(`http://192.168.0.52:8080/agencies?page=${page}&size=10`)
      .then((res) => {
        setAgencyArr(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

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
      <h2>대리점 관리</h2>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Link href="/agencies/agencyUpload" passHref>
          <Add
            fontSize="large"
            sx={{
              cursor: "pointer",
              border: "1px solid #0000003b",
              borderRadius: "4px",
              padding: "5px",
              color: "#5a5a5a",
            }}
          ></Add>
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
            {agencyArr &&
              agencyArr.map((obj, index) => {
                console.log(obj);
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
                    >
                      {obj.type}
                    </TableCell>
                    <TableCell align="center">
                      {obj.corporateRegistrationNumber}
                    </TableCell>
                    <TableCell align="center">{obj.name}</TableCell>
                    <TableCell align="center">{obj.bank}</TableCell>
                    <TableCell align="center">
                      {obj.virtualAccountNumber}
                    </TableCell>
                    <TableCell align="right">
                      &#65510; {obj.freeChargeMonths}
                    </TableCell>
                    <TableCell align="center" width="130px">
                      <Link href={`/agencies/${obj.id}`} passHref>
                        <IconButton aria-label="Example">
                          <Edit
                            sx={{
                              cursor: "pointer",
                              color: "#5a5a5a",
                              // fontSize: "18px",
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
                            // fontSize: "20px",
                            padding: 0,
                          }}
                        />
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
