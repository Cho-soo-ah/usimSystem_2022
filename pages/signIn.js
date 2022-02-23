import * as React from 'react';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import {Form, Formik} from 'formik';
import CustomButton from '../component/CustomButton';
import CustomInput from '../component/CustomInput';
import PhoneCertify from '../component/PhoneCertify';
import {validationSchema2} from '../component/PhoneCertify';
const validationSchema = yup.object({
  name: yup
    .string('이름을 입력하세요')
    .required('이름을 입력하세요'),
  email: yup
    .string('이메일을 입력하세요')
    .email('유효한 이메일 주소를 입력해 주세요')
    .required('이메일을 입력하세요'),
  password: yup
    .string('비밀번호를 입력하세요')
    .required('비밀번호를 입력하세요'),
  passwordValid: yup
    .string('비밀번호를 한번 더 입력하세요')
    .required('비밀번호를 한번 더 입력하세요'),
});

const concatSchema = validationSchema.concat(validationSchema2);

export default function Login() {
  return (
    <div className='inner'>
      <Box>
        <h2>회원가입</h2>
        <Formik
          validationSchema={concatSchema}
          // validateOnChange={false}
          //   validateOnBlur={false}
          initialValues={{ name:"", email: "", password: "", passwordValid:"", phoneNumber:"", code:"" }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            // 비동기 동작
            setSubmitting(false);;
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <CustomInput name="name">이름</CustomInput>
              <CustomInput name="email">이메일</CustomInput>
              <CustomInput name='password' type='password'>비밀번호</CustomInput>
              <CustomInput name='passwordValid' type='password'>비밀번호 확인</CustomInput>
              <PhoneCertify schema={validationSchema}></PhoneCertify> 
              <CustomButton color="primary" variant="contained" fullWidth type="submit" disabled={isSubmitting}>
                로그인
              </CustomButton>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
}
