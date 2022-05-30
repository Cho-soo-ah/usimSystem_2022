import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, IconButton, TextField } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { Field } from "formik";
import { format } from "date-fns";

export default function DateInput(props) {
  const [dateValue, setDateValue] = useState([null, null]);
  const [startDate, endDate] = dateValue;
  const [isOpen, setIsOpen] = useState(false);
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
          onClickOutside={() => setIsOpen(false)}
          closeOnScroll={true}
          focusSelectedMonth={true}
          value={forms.field.value ? forms.field.value : ""}
          onChange={(update) => {
            setDateValue(update);
            if (update)
              forms.setFieldValue(
                "date",
                `${format(update[0], "yyyy-MM-dd")} - ${
                  update[1] ? format(update[1], "yyyy-MM-dd") : ""
                }`
              );
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
            onClick={() => {
              forms.setFieldValue("date", "");
              setDateValue([null, null]);
            }}
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
      {({ field, form: { touched, errors, setFieldValue } }) => {
        return (
          <Placeholder
            field={field}
            touched={touched}
            errors={errors}
            setFieldValue={setFieldValue}
          />
        );
      }}
    </Field>
  );
}
