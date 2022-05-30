import { useState, useEffect } from "react";
import axios from "axios";
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
import EscalationWrap from "../../component/EscalationWrap";
import SearchBtn from "../../component/Buttons/SearchBtn";
import { alertOpen } from "../../src/Recoil/atoms";
import { useRecoilState } from "recoil";
import CustomAlert from "../../component/CustomAlert";
import Chips from "../../component/Chips";

export default function MyUsimList() {
  const [alertOpens, setAlertOpens] = useRecoilState(alertOpen);
  // ----- axios -----
  const [data, setData] = useState("");
  const maxSize = 10;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const handlePagination = (e, value) => {
    setPage(value);
  };
  const [selectedArr, setSelectedArr] = useState([]);

  const callData = () => {
    axios
      .get(`http://192.168.0.52:8080/sims?page=${page}&size=${maxSize}`)
      .then((res) => {
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    callData();
  }, [page]);
  const deleteData = () => {
    axios
      .delete(`http://192.168.0.52:8080/sims`, { data: "" })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  // ----- axios -----

  const handleSelecAll = (e) => {
    if (e.target.checked) {
      setSelectedArr(data.map((obj) => obj.id));
      return;
    }
    setSelectedArr([]);
  };
  const tableHead = [
    <Checkbox
      key="usimCheckAll"
      color="primary"
      onClick={handleSelecAll}
    ></Checkbox>,
    "대리점명",
    "바코드 번호",
    "서비스 번호",
    "유심 번호",
    "시리얼 번호",
    "현재 유심 상태",
  ];
  // ----- CLICK -----
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
      if (selectedArr.includes(selectedId)) {
        let arr = selectedArr.filter((item) => {
          return item !== selectedId;
        });
        setSelectedArr(arr);
      } else setSelectedArr(() => [selectedId]);
    }
  };
  // ----- CLICK -----
  const isSelected = (id) =>
    selectedArr.some((selectedId) => {
      return selectedId == id;
    });
  return (
    <div className="tableInner">
      <h2>내 유심리스트</h2>
      <Box
        sx={{
          width: "100%",
          height: "35px",
          display: "flex",
          mt: 3,
          justifyContent:
            selectedArr.length === 0 ? "flex-end" : "space-between",
        }}
      >
        {selectedArr.length === 0 ? null : <EscalationWrap />}
        <SearchBtn items={["barcode", "store", "usim"]} />
      </Box>
      <TableContainer>
        <Table
          sx={{
            mb: 1.5,
            mt: 1.5,
            borderRadius: "5px",
            overflow: "hidden",
            "& .MuiTableHead-root": {
              bgcolor: "#0000000a",
            },
            "& .MuiTableCell-head": {
              textAlign: "center",
            },
            "& .MuiTableCell-root": {
              border: "1px solid #dbdbdb",
              height: 40,
              padding: "0 10px",
            },
          }}
          aria-labelledby="tableTitle"
        >
          <TableHead>
            <TableRow>
              {tableHead.map((e, index) => (
                <TableCell key={index} sx={{ padding: 0 }}>
                  {e}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((obj) => {
                return (
                  <TableRow
                    hover
                    key={obj.id}
                    id={obj.id}
                    selected={isSelected(obj.id)}
                    onClick={(e) => handleClick(e, obj.id)}
                  >
                    <TableCell
                      align="center"
                      sx={{ width: "10px", padding: 0 }}
                    >
                      <Checkbox
                        color="primary"
                        id={obj.id}
                        checked={isSelected(obj.id)}
                        sx={{ p: 0 }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "140px" }}>
                      {obj.id}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "120px" }}>
                      {obj.barcodeNumber}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "120px" }}>
                      {obj.serviceNumber}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "140px" }}>
                      {obj.usimNumber}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: "130px" }}>
                      {obj.serialNumber}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "130px" }}>
                      <Chips>개통</Chips>
                    </TableCell>
                  </TableRow>
                );
              })}

            {data &&
              Array.from(Array(maxSize - data.length), (e, index) => {
                return (
                  <TableRow
                    sx={{ "& .MuiTableCell-root": { height: 40 } }}
                    key={index}
                  >
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          onChange={handlePagination}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
      <CustomAlert
        open={alertOpens}
        // callback={props.callback}
        message="삭제되었습니다."
      />
    </div>
  );
}
