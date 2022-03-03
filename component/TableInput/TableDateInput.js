import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 스타일 맥이기
import { useState } from "react";
import { TextField } from "@mui/material";
export default function TableDateInput() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <>
      <TextField variant="standard" label="날짜">
        {/* {DataPicker .active ? TextField data-shrink = 'true' : 'false'} */}
        {/* 
        {
          DataPicker > input className === class="react-datepicker-ignore-onclickoutside"
          ? TextField data-shrink = 'true' 
          : 'false'
        } */}
        <DatePicker
          dateFormat="yyyy-MM-dd"
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            console.log(update);
            setDateRange(update);
          }}
          selected={startDate}
          isClearable={true}
          monthsShown={2}
          closeOnScroll={true}
          disabledKeyboardNavigation
          focusSelectedMonth={true}
        />
      </TextField>
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          console.log(update);
          setDateRange(update);
        }}
        selected={startDate}
        isClearable={true}
        monthsShown={2}
        closeOnScroll={true}
        disabledKeyboardNavigation
        focusSelectedMonth={true}
      />
    </>
  );
}
