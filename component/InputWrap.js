import theme from "../src/theme";
import { styled } from "@mui/system";

const InputWrap = styled("div")({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.only("laptop")]: {
    flexDirection: "initial",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: "28px",
  },
});
export default InputWrap;
