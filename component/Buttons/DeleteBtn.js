import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Close, Delete, PriorityHighRounded } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { alertOpen } from "../../src/Recoil/atoms";
import { useState } from "react";

export default function DeleteBtn() {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleOpen = () => {
    setDeleteOpen(true);
  };
  const handleClose = () => {
    setDeleteOpen(false);
  };
  const handleDelete = (e) => {
    // deleteData;
  };
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
      <Dialog
        open={deleteOpen}
        PaperProps={{ style: { boxShadow: "none", minWidth: "380px" } }}
      >
        <DialogContent sx={{ textAlign: "left" }}>알림</DialogContent>
        <IconButton
          sx={{
            position: "absolute",
            right: 8,
            top: 13,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close onClick={handleClose} />
        </IconButton>
        <DialogContent
          dividers
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#d32f2f",
          }}
        >
          <PriorityHighRounded
            color="error"
            sx={{
              fontSize: "40px",
              mr: 0.5,
            }}
          />
          삭제하시겠습니까?
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color="error"
            onClick={handleClose}
            sx={{
              bgcolor: "transparent",
              "&:hover": { bgcolor: "#efefef" },
            }}
          >
            삭제
          </Button>
          <Button
            autoFocus
            color="inherit"
            onClick={handleClose}
            sx={{
              bgcolor: "transparent",
              "&:hover": { bgcolor: "#efefef" },
            }}
          >
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
