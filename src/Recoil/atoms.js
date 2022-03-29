import { atom, selector } from "recoil";
// ----- formik -----
import * as yup from "yup";

export const pageType = atom({
  key: "pageType",
  default: "agencyUpload",
});

export const formikSelector = selector({
  key: "formikSelector",
  get: ({ get }) => {
    const type = get(pageType);

    switch (type) {
      case "agencyUpload":
        return yup.object({
          storeType: yup.string().required("대리점 타입을 선택하세요"),
          storeName: yup.string().required("대리점명을 입력하세요").nullable(),
          registrationNumber: yup
            .number()
            .typeError("사업자 번호를 입력하세요")
            .required("사업자 번호를 입력하세요")
            .nullable(),
        });
      case "productUpload":
        return yup.object({
          storeType: yup.array().min(1, "대리점 타입을 선택하세요"),
          productName: yup.string().required("상품명을 입력하세요").nullable(),
          assignCost: yup
            .string()
            .required("배정 비용을 입력하세요")
            .nullable(),
          rentalCost: yup
            .string()
            .required("개통 비용을 입력하세요")
            .nullable(),
          chargeCost: yup
            .string()
            .required("충전 비용을 입력하세요")
            .nullable(),
          months: yup
            .number()
            .typeError("무료 충전 개월 수를 선택하세요")
            .required("무료 충전 개월 수를 선택하세요")
            .nullable(),
        });
      case "memberUpload":
        return yup.object({
          username: yup.string().nullable(),
          email: yup
            .string()
            .email("유효한 이메일 주소를 입력해 주세요")
            .required("이메일을 입력하세요")
            .nullable(),
          password: yup.string().required("비밀번호를 입력하세요").nullable(),
          phoneNumber: yup
            .number()
            .typeError("핸드폰 번호를 입력하세요")
            .required("핸드폰 번호를 입력하세요")
            .nullable(),
          roleId: yup.string().nullable(),
          agencyId: yup.array().nullable(),
        });
      case "chargeIn":
        return yup.object({
          storeName: yup.string().required("대리점명을 입력하세요").nullable(),
          registrationNumber: yup
            .string()
            .required("여권 번호를 입력하세요")
            .nullable(),
          barcode: yup
            .string()
            .required("바코드 번호 / 서비스 번호를 입력하세요")
            .nullable(),
          product: yup.string().required("상품명을 입력하세요").nullable(),
        });
      case "usimUpload":
        return yup.object({
          barcodeNumber: yup
            .number()
            .typeError("바코드 번호를 입력하세요")
            .required("바코드 번호를 입력하세요")
            .nullable(),
          serviceNumber: yup
            .number()
            .typeError("서비스 번호를 입력하세요")
            .required("서비스 번호를 입력하세요")
            .nullable(),
          usimNumber: yup
            .string()
            .required("유심 번호를 입력하세요")
            .nullable(),
          serialNumber: yup
            .string()
            .required("시리얼 번호를 입력하세요")
            .nullable(),
        });
    }
  },
});

// export const formikState = atom({
//   key: "formikState",
//   default: yup.object({
//     // 회원가입
//     name: yup.string().required("이름을 입력하세요").nullable(),
//     // 로그인
//     email: yup
//       .string()
//       .email("유효한 이메일 주소를 입력해 주세요")
//       .required("이메일을 입력하세요")
//       .nullable(),
//     password: yup.string().required("비밀번호를 입력하세요").nullable(),
//     // 비밀번호 변경
//     passwordCurrent: yup
//       .string()
//       .required("현재 비밀번호를 입력하세요")
//       .nullable(),
//     password: yup.string().required("변경할 비밀번호를 입력하세요").nullable(),
//     passwordValid: yup
//       .string()
//       .required("변경할 비밀번호를 한번 더 입력하세요")
//       .nullable(),
//     // 휴대폰 인증번호 발송
//     phoneNumber: yup.string().required("서비스 번호를 입력하세요").nullable(),
//     code: yup
//       .string()
//       .typeError("6자리 인증 코드를 입력하세요")
//       .required("인증 코드를 입력하세요")
//       .nullable(),

//     // 대리점 등록
//     companyNumber: yup
//       .string()
//       .required("사업자등록번호를 입력하세요")
//       .nullable(),
//     // 검색
//     reason: yup.string().required("aaa").nullable(),
//   }),
// });
// ----- formik -----
// ----- Alert Dialog -----
export const alertOpen = atom({
  key: "alertOpen",
  default: false,
});
// ----- Alert Dialog -----
