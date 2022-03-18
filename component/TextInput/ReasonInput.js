import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import TextInputWrap from "./TextInputWrap";
import { useRecoilState } from "recoil";
import { reasonState } from "../../src/Recoil/atoms";
export default function ReasonInput(props) {
  const [reasonValue, setReasonValue] = useRecoilState(reasonState);

  return (
    <TextInputWrap text="사유">
      <FormControl fullWidth variant={props.variant}>
        <InputLabel id="risState"></InputLabel>
        <Select
          labelId="reason"
          id="reason"
          onChange={(e) => {
            setReasonValue(e.target.value);
          }}
          value={reasonValue}
          label={props.label}
          sx={{ mb: "12px" }}
        >
          <MenuItem value={10}>사유</MenuItem>
          <MenuItem value={20}>사유사유</MenuItem>
        </Select>
      </FormControl>
    </TextInputWrap>
  );
}
