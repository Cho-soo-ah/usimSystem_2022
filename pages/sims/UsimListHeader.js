import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const CardWrap = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "10px",
  width: "32.7%",
  backgroundColor: "#0000000a",
  borderRadius: "4px",
});

const count = (
  <Box
    component="span"
    sx={{
      fontSize: "13px",
      mx: "2px",
      transform: "scale(0.8)",
    }}
  >
    개
  </Box>
);
export default function UsimListHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        mb: 1.5,
      }}
    >
      <CardWrap>
        <Typography sx={{ fontSize: "13px" }}>총 수량</Typography>
        <Typography sx={{ fontSize: "24px" }}>400{count}</Typography>
      </CardWrap>
      <CardWrap>
        <Typography sx={{ fontSize: "13px" }}>배정 전 수량</Typography>
        <Typography sx={{ fontSize: "24px" }}>11{count}</Typography>
      </CardWrap>
      <CardWrap>
        <Typography sx={{ fontSize: "13px" }}>신규 수량</Typography>
        <Typography sx={{ fontSize: "24px" }}>0{count}</Typography>
      </CardWrap>
    </Box>
  );
}
