import { Button, Dialog, DialogActions } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function CustomDialog(e) {
  const handleClose = () => {
    e.setOpen(false);
  };
  return (
    <>
      <Dialog
        open={e.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {e.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {e.children}
          <Button
            onClick={handleClose}
            sx={{ background: "none", "&:hover": { background: "none" } }}
          >
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
