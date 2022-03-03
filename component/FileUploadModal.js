import * as React from "react";
import axios from "axios";
import { styled } from "@mui/system";
import { useState } from "react";
import CustomButton from "../component/CustomButton";
import { UploadFile } from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
const UploadWrap = styled("div")({
  display: "flex",
  flexDirection: "column",
});
const UploadInput = styled("input")({
  // display: "none",
});
const UploadLabel = styled("label")({
  height: "200px",
  cursor: "pointer",
  backgroundColor: "#efefef",
  borderRadius: "4px",
  fontSize: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

export default function FileUploadModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // --------- file upload ---------
  const [file, setFile] = useState();
  const [loading, setLoading] = useState();
  function handleLoading() {
    setLoading;
  }

  function handleAxios() {
    const url = "http://192.168.0.52:8080/sims/upload";
    var formData = new FormData();
    formData.append("file", file);
    console.log(file);

    setLoading(true);
    axios
      .post(url, formData, {
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // --------- file upload ---------
  return (
    <div>
      <UploadFile
        onClick={handleOpen}
        fontSize="large"
        sx={{
          marginRight: "8px",
          cursor: "pointer",
          border: "1px solid #0000003b",
          borderRadius: "4px",
          padding: "5px",
          color: "#5a5a5a",
        }}
      ></UploadFile>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <UploadWrap>
            <UploadLabel for="uploadInput">
              <UploadFile
                sx={{
                  fontSize: "100px",
                  color: "#bf3434",
                  filter: " drop-shadow(2px 2px 2px gray)",
                }}
              />
              <span style={{ fontSize: "13px" }}>
                클릭하여 파일을 업로드하세요
              </span>
            </UploadLabel>
            <UploadInput
              id="uploadInput"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                console.log(e);
              }}
            ></UploadInput>
            <LoadingButton
              color="primary"
              loading={loading}
              onClick={handleAxios}
              sx={{ height: "35px", color: "#fff" }}
              loadingPosition="start"
            >
              업로드
            </LoadingButton>
          </UploadWrap>
        </Box>
      </Modal>
    </div>
  );
}
