import { Add } from "@mui/icons-material";
export default function AddBtn() {
  return (
    <>
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
      ></Add>
    </>
  );
}
