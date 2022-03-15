import * as React from "react";
import axios from "axios";
import {
  Box,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Pagination,
  Checkbox,
  Link,
} from "@mui/material";
import { useState, useEffect } from "react";
import ExcelDownloadButton from "../../component/ExcelDownloadButton";
import AddBtn from "../../component/AddBtn";
import SearchBtn from "../../component/SearchBtn";

const tableHead = [
  <Checkbox key="usimCheckAll" color="primary"></Checkbox>,
  "이름",
  "이메일",
  "핸드폰 번호",
  "권한",
  "대리점",
];

export default function MemberList() {
  // ------ axios -------
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const handlePagination = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    axios
      .get(`http://192.168.0.52:8080/sims?page=${page}&size=10`)
      .then((res) => {
        console.log(res);
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  }, [page]);

  // ------ axios -------
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
  const isSelected = (id) =>
    selectedArr.some((selectedId) => {
      return selectedId == id;
    });

  return (
    <>
      <div className="tableInner">
        <h2>회원 관리</h2>
        <Box sx={{ width: "100%", textAlign: "right" }}>
          <SearchBtn items={["store", "barcode", "usim"]} />
        </Box>
        <TableContainer>
          <Table
            sx={{ minWidth: 750, mb: "16px" }}
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
                      <TableCell
                        scope="row"
                        padding="none"
                        align="center"
                        sx={{ minWidth: "80px" }}
                      >
                        김떙떙
                        {/* {obj.store} */}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "180px" }}>
                        sample@email.com
                        {/* {obj.barcodeNumber} */}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "120px" }}>
                        {obj.serviceNumber}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "80px" }}>
                        {/*{obj.usimNumber}*/}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: "120px" }}>
                        {/*{obj.serviceNumber}*/}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            height: "35px",
          }}
        >
          <ExcelDownloadButton />
          <Link href="/members/memberUpload/" passHref sx={{ height: "35px" }}>
            <AddBtn />
          </Link>
        </Box>
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            onClick={handlePagination}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </>
  );
}
