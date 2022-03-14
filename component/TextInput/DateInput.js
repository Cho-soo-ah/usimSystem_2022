import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 스타일 맥이기
import { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
export default function DateInput(props) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const handleClear = () => {
    setDateRange([null, null]);
  };
  return (
    <>
      <FormControl
        fullWidth
        sx={{
          mr: "16px",
          boxSizing: "border-box",
          "& .react-datepicker-popper": {
            width: "483px",
            "& .clearBtn": { display: "none" },
          },
          "& button": { display: "none" },
          "&:hover button": { display: "block" },
          "&:active button": { display: "block" },
        }}
      >
        <DatePicker
          dateFormat="yyyy-MM-dd"
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
          }}
          selected={startDate}
          monthsShown={2}
          closeOnScroll={true}
          disabledKeyboardNavigation
          focusSelectedMonth={true}
          customInput={
            <TextField
              id="standard-basic"
              label="날짜"
              fullWidth
              inputProps={{
                autoComplete: "off",
                endAdornment: (
                  <InputAdornment position="end">
                    <Clear />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: "16px" }}
            ></TextField>
          }
        ></DatePicker>
        {startDate && (
          <IconButton
            aria-label="delete"
            onClick={handleClear}
            sx={{
              position: "absolute",
              right: 5,
              top: 10,
              height: 36,
            }}
          >
            <Clear fontSize="small" />
          </IconButton>
        )}
      </FormControl>
    </>
  );
}
