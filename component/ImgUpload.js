import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Box, FormHelperText, IconButton } from "@mui/material";
import { HighlightOff, ErrorOutline } from "@mui/icons-material";
import { Field } from "formik";

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
const names = "imgFile";
const DropZone = (props) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      var newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      props.setFieldValue(names, props.value.concat(newFiles));
    },
  });

  const handleDelete = (i) => {
    const newFiles = props.value;
    const target = newFiles.splice(i, 1);
    URL.revokeObjectURL(target.preview);
    props.setFieldValue(names, newFiles);
  };
  const handleOpen = (e) => {
    window.open(e.target.src, "_blank");
  };

  const thumbs = props.value.map((file, i) => {
    return (
      <div style={thumb} key={file.name}>
        <IconButton
          aria-label="delete"
          size="small"
          style={buttonStyle}
          onClick={() => handleDelete(i)}
        >
          <HighlightOff fontSize="small" />
        </IconButton>
        <div style={thumbInner}>
          <Image
            width="98"
            height="98"
            src={file.preview}
            sx={img}
            alt="#"
            onClick={handleOpen}
          />
        </div>
      </div>
    );
  });

  return (
    <>
      <Box {...getRootProps({ className: "dropzone" })}>
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
      </Box>
      {thumbs.length > 0 && <aside style={thumbsContainer}>{thumbs}</aside>}
    </>
  );
};
export default function FileUpload() {
  return (
    <Field name={names}>
      {({ field, form: { touched, errors, setFieldValue } }) => {
        return (
          <>
            <Box
              className="imgFile"
              style={{
                cursor: "pointer",
                border:
                  touched[names] && errors[names]
                    ? "1px solid #bf3434"
                    : "1px solid #c3c3c3",
                borderRadius: "4px",
                padding: "12px",
              }}
            >
              <DropZone value={field.value} setFieldValue={setFieldValue} />
            </Box>
            <FormHelperText sx={{ ml: "14px" }} error>
              {touched[names] && errors[names]}
            </FormHelperText>
          </>
        );
      }}
    </Field>
  );
}
