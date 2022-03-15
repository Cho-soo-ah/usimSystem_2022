import FileDownloadRounded from "@mui/icons-material/FileDownloadRounded";

export default function ExcelDownloadButton() {
  return (
    <>
      {/* 
        다운로드 링크 추가할것
    */}
      <FileDownloadRounded
        // color="gray"
        fontSize="large"
        sx={{
          border: "1px solid #0000003b",
          borderRadius: "4px",
          padding: "5px",
          cursor: "pointer",
          color: "#5a5a5a",
          mr: "8px",
        }}
      ></FileDownloadRounded>
    </>
  );
}
