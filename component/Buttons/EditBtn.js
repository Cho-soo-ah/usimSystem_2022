import { IconButton, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";

export default function EditBtn() {
  return (
    <IconButton aria-label="Example" sx={{ p: 0.5 }}>
      <Tooltip title="수정하기" arrow placement="top" disableInteractive>
        <Edit
          sx={{
            cursor: "pointer",
            color: "#5a5a5a",
          }}
        />
      </Tooltip>
    </IconButton>
  );
}
