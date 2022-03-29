import { Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
export default function AddBtn() {
  return (
    <Tooltip
      title="추가하기"
      arrow
      disableInteractive
      placement="bottom-end"
      componentsProps={{
        tooltip: { sx: { bottom: 5 } },
      }}
    >
      <Add
        fontSize="large"
        sx={{
          cursor: "pointer",
          border: "1px solid #0000003b",
          borderRadius: "4px",
          padding: "5px",
          color: "#5a5a5a",
          ml: "8px",
        }}
      />
    </Tooltip>
  );
}
