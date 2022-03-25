import Image from "next/image";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IconButton, Link } from "@mui/material";
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

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      var newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(files.concat(newFiles));
    },
  });

  const handleClick = (i) => {
    const newFiles = [...files];
    const target = newFiles.splice(i, 1);
    URL.revokeObjectURL(target.preview);
    setFiles(newFiles);
  };

  const [imgSrc, setImgSrc] = useState();
  const handleOpen = (e) => {
    setImgSrc(e.target.src);
  };

  const thumbs = files.map((file, i) => {
    return (
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
          <Link href={imgSrc} target="_blank">
            <Image
              width="105"
              height="105"
              src={file.preview}
              sx={img}
              alt="#"
              onClick={handleOpen}
            />
          </Link>
        </div>
      </div>
    );
  });

  return (
    <>
      <section
        className="container"
        style={{ margin: "16px 0 ", cursor: "pointer" }}
      >
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>
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
    </>
  );
}
