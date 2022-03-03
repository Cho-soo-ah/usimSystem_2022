import Image from "next/image";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, IconButton, Modal } from "@mui/material";
import { HighlightOff, ErrorOutline } from "@mui/icons-material";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  marginTop: 16,
  padding: 8,
  background: "#f7f7f7",
  borderRadius: 4,
};

const thumb = {
  display: "inline-flex",
  margin: 8,
  boxSizing: "border-box",
  cursor: "pointer",
  position: "relative",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "100%",
};

const buttonStyle = {
  position: "absolute",
  zIndex: 10,
  right: 0,
  color: "white",
  background: "#00000047",
  padding: 1,
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
  width: 600,
  minHeight: "50vh",
  maxHeight: "70vh",
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  overflowY: "scroll",
};
const modalImg = {
  width: "500px",
  height: "100px",
};

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      // 파일을 선택했을 때, 실행
      // setFiles = 기존에 있던 파일 + 새로 선택한 파일

      var newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(files.concat(newFiles));
    },
  });

  // 선택한 썸네일 삭제
  const handleClick = (i) => {
    const newFiles = [...files]; // make a var for the new array

    const target = newFiles.splice(i, 1); // 배열에서 선택한 Index 의 Thumbnail 을 삭제
    URL.revokeObjectURL(target.preview);
    // files.forEach((file) => {
    //
    // });

    setFiles(newFiles); // update the state
  };

  const [open, setOpen] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState();
  const handleOpen = (e) => {
    console.log("e.target.src : ", e.target.src);
    setImgSrc(e.target.src);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const thumbs = files.map((file, i) => {
    return (
      <>
        <div style={thumb} key={file.name}>
          <IconButton
            aria-label="delete"
            size="small"
            style={buttonStyle}
            onClick={() => {
              handleClick(i);
            }}
          >
            <HighlightOff fontSize="small" />
          </IconButton>
          <div style={thumbInner}>
            <Image
              width="105"
              height="105"
              src={file.preview}
              sx={img}
              alt="#"
              onClick={handleOpen}
            />
          </div>
        </div>
      </>
    );
  });

  // useEffect(() => {
  //   console.log("useEffect!!!!!", files);
  //   // Make sure to revoke the data uris to avoid memory leaks

  // }, [files]);

  return (
    <>
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p style={{ marginTop: 16, cursor: "pointer" }}>
            <ErrorOutline
              color="error"
              fontSize="small"
              sx={{
                marginTop: "4px",
                marginRight: "2px",
                display: "block",
                float: "left",
              }}
            />
            이곳을 클릭하거나 드래그하여 이미지를 업로드 하세요.
            <br />
            <span style={{ fontSize: 14, color: "#a3a3a3", marginLeft: 20 }}>
              (필수 : 신분증, 페이스샷, USIM / 선택 : 가입신청서)
            </span>
          </p>
        </div>
        {thumbs.length > 0 && <aside style={thumbsContainer}>{thumbs}</aside>}
      </section>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Image
            src={imgSrc}
            alt="/"
            objectFit="contain"
            width="600px"
            height="550px"
            maxheight="1000px"
          />
        </Box>
      </Modal>
    </>
  );
}
