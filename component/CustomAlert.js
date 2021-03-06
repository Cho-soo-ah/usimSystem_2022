import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DialogActions } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { alertOpen } from "../src/Recoil/atoms";

import { CheckRounded, Close } from "@mui/icons-material";

export default function CustomAlert(props) {
  const setAlertOpens = useSetRecoilState(alertOpen);
  const handleClose = () => {
    setAlertOpens(false);
    props.callback && props.callback();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        PaperProps={{ style: { boxShadow: "none", minWidth: "380px" } }}
        onClose={props.onClose}
      >
        <DialogContent sx={{ textAlign: "left" }}>알림</DialogContent>
        <IconButton
          onClick={setAlertOpens(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 13,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent
          dividers
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: props.color ? props.color : "green",
          }}
        >
          {props.icon ? (
            props.icon
          ) : (
            <CheckRounded
              color="success"
              sx={{
                fontSize: "40px",
                mr: 0.5,
              }}
            />
          )}
          {props.message}
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color="inherit"
            onClick={handleClose}
            sx={{
              bgcolor: "transparent",
              "&:hover": { bgcolor: "#efefef" },
            }}
          >
            {props.buttonText ? "삭제" : "닫기"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
