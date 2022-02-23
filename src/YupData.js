import * as yup from "yup";

const YupData = yup.object().shape({
  passwordCurrent: yup
    .string("현재 비밀번호를 입력하세요")
    .required("현재 비밀번호를 입력하세요"),
  password: yup
    .string("변경할 비밀번호를 입력하세요")
    .required("변경할 비밀번호를 입력하세요"),
  passwordValid: yup
    .string("변경할 비밀번호를 한번 더 입력하세요")
    .required("변경할 비밀번호를 한번 더 입력하세요"),
  phoneNumber: yup
    .number("숫자만 입력하세요")
    .typeError("숫자만 입력하세요")
    .required("핸드폰 번호를 입력하세요"),
  code: yup
    .number("인증 코드를 입력하세요")
    .typeError("6자리 인증 코드를 입력하세요")
    .required("인증 코드를 입력하세요"),
});

export default YupData;
