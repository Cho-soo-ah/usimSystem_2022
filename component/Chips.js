import { Box, Chip, Link } from "@mui/material";
import { useState, useEffect } from "react";
import { Clear, Check, HourglassBottom } from "@mui/icons-material";
export default function Chips(props) {
  const [status, setStatus] = useState();
  const [color, setColor] = useState();
  useEffect(() => {
    if (props.children === "취소") {
      setStatus(<Clear />);
    } else if (props.children === "완료") {
      setStatus(<Check />);
    } else {
      setStatus(<HourglassBottom />);
    }
  }, []);
  useEffect(() => {
    if (props.children === "취소") {
      setColor("primary");
    } else if (props.children === "완료") {
      setColor("success");
    } else {
      setColor("warning");
    }
  }, []);

  return (
    <Box>
      <Link href="/ListDetail" sx={{ textDecoration: "none" }}>
        <Chip
          size="small"
          label={props.children}
          avatar={status}
          color={color}
          sx={{
            cursor: "pointer",
            padding: "13px 5px",
            "& .MuiSvgIcon-root": {
              backgroundColor: "transparent ",
              color: "#fff",
            },
          }}
        ></Chip>
      </Link>
    </Box>
  );
}
