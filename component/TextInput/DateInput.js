import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, IconButton, TextField } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { Field } from "formik";

export default function DateInput(props) {
  const [dateValue, setDateValue] = useState([null, null]);
  const [startDate, endDate] = dateValue;
  const [isOpen, setIsOpen] = useState(false);
  const handleClear = () => {
    setDateValue([null, null]);
  };
  const names = "date";

  const Placeholder = (forms) => (
    <>
      <FormControl
        fullWidth
        sx={{
          mb: "14px",
          boxSizing: "border-box",
          "& .react-datepicker-popper": {
            width: "483px",
            zIndex: "999",
          },
          "& button": { display: "none" },
          "&:hover button": { display: "block" },
          "&:active button": { display: "block" },
        }}
      >
        <DatePicker
          dateFormat="yyyy-MM-dd"
          monthsShown={2}
          startDate={startDate}
          endDate={endDate}
          selected={startDate}
          selectsRange={true}
          open={isOpen}
          onInputClick={() => setIsOpen(true)}
          closeOnScroll={true}
          focusSelectedMonth={true}
          value={dateValue}
          onChange={(update) => {
            setDateValue(update);
            if (update)
              forms.setFieldValue("date", `${update[0]}, ${update[1]}`);
            if (update[1]) {
              setIsOpen(false);
            }
          }}
          disabledKeyboardNavigation
          customInput={
            <TextField
              id="standard-basic"
              label={props.label}
              fullWidth
              autoComplete="off"
            />
          }
        ></DatePicker>
        {startDate && (
          <IconButton
            aria-label="delete"
            onClick={handleClear}
            sx={{
              position: "absolute",
              right: 7,
              top: 15,
              width: 28,
              height: 28,
            }}
          >
            <Clear
              fontSize="small"
              sx={{ top: "-6px", right: "4px", position: "relative" }}
            />
          </IconButton>
        )}
      </FormControl>
    </>
  );
  return (
    <Field name={names}>
      {({ form: { touched, errors, setFieldValue } }) => {
        return (
          <Placeholder
            touched={touched}
            errors={errors}
            setFieldValue={setFieldValue}
          />
        );
      }}
    </Field>
  );
}
