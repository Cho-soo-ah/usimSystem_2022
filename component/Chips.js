import { Box, Chip, Link } from "@mui/material";
import { useState, useEffect } from "react";
import { Clear, Check, HourglassBottom } from "@mui/icons-material";
export default function Chips(props) {
  const [status, setStatus] = useState();
  const [color, setColor] = useState();
  useEffect(() => {
    if (props.status === "cancel") {
      setStatus(<Clear />);
    } else if (props.status === "complete") {
      setStatus(<Check />);
    } else {
      setStatus(<HourglassBottom />);
    }
  }, []);
  useEffect(() => {
    if (props.status === "cancel") {
      setColor("primary");
    } else if (props.status === "complete") {
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
          avatar={status}
          label={props.children}
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
