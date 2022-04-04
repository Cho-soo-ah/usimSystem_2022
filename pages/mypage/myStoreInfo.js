import { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
export default function MyStoreInfo() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://192.168.0.52:8080/agencies`)
      .then((res) => {
        setData(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  const wrap = {
    display: "flex",
    justifyContent: "flex-start",
    borderTop: "1px solid #dbdbdb",
    boxSizing: "border-box",
    padding: "6px",
  };
  const title = {
    width: "40%",
  };
  return (
    <div className="inner">
      <h2 style={{ marginBottom: "24px" }}>내 유심리스트</h2>
      {data &&
        data.map((obj, index) => (
          <Accordion key={obj.id} defaultExpanded={index === 0}>
            <AccordionSummary expandIcon={<ExpandMore />} id={obj.id}>
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {obj.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={wrap}>
                <Typography style={title}>대리점 타입</Typography>
                <Typography>{obj.type}</Typography>
              </div>
              <div style={wrap}>
                <Typography style={title}>사업자등록번호</Typography>
                <Typography>{obj.corporateRegistrationNumber}</Typography>
              </div>
              <div style={wrap}>
                <Typography style={title}>예치금</Typography>
                <Typography>&#65510; 20,456</Typography>
              </div>
              <div style={wrap}>
                <Typography style={title}>은행 + 가상계좌</Typography>
                <Typography>{obj.bank}</Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
}
