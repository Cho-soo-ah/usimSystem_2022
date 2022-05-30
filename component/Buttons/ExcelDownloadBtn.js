import FileDownloadRounded from "@mui/icons-material/FileDownloadRounded";
import { Tooltip } from "@mui/material";

export default function ExcelDownloadBtn() {
  return (
    <Tooltip
      title="엑셀로 다운로드"
      arrow
      disableInteractive
      placement="bottom-end"
      componentsProps={{
        tooltip: { sx: { bottom: 5 } },
      }}
    >
      <FileDownloadRounded
        fontSize="large"
        sx={{
          border: "1px solid #0000003b",
          borderRadius: "4px",
          padding: "5px",
          cursor: "pointer",
          color: "#5a5a5a",
        }}
      ></FileDownloadRounded>
    </Tooltip>
  );
}
