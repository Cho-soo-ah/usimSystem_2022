import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const wrap = {
  display: "flex",
  flexDirection: "column",
  minWidth: "280px",
  width: "100%",
};
const title = {
  fontSize: "14px",
  color: "#787878",
  mb: "5px",
  textIndent: "8px",
};
export default function TextInputWrap(props) {
  return (
    <Box sx={wrap}>
      <Typography sx={title}>{props.text}</Typography>
      {props.children}
    </Box>
  );
}
