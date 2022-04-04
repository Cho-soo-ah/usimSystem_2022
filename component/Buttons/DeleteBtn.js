import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { alertOpen } from "../../src/Recoil/atoms";
import CustomAlert from "../CustomAlert";

export default function DeleteBtn(props) {
  const [alertOpens, setAlertOpens] = useRecoilState(alertOpen);
  const [fieldOpen, setFieldOpen] = useState(false);

  const handleOpen = () => {
    setFieldOpen(true);
  };
  const handleClose = (e) => {
    setAlertOpens(false);
  };
  console.log("alertOpens", alertOpens);
  return (
    <>
      <IconButton aria-label="Example" sx={{ p: 0.5 }}>
        <Tooltip title="삭제하기" arrow placement="top" disableInteractive>
          <Delete
            variant="outlined"
            onClick={handleOpen}
            sx={{
              cursor: "pointer",
              color: "#5a5a5a",
            }}
          />
        </Tooltip>
      </IconButton>
      <CustomAlert
        onClose={handleClose}
        open={fieldOpen}
        message="삭제하시겠습니까?"
        buttonText="삭제"
        color="#bf3434"
        icon={
          <Close
            color="error"
            sx={{
              fontSize: "40px",
              mr: 0.5,
            }}
          />
        }
      />
    </>
  );
}
