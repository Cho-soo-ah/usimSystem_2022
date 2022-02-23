import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import CustomButton from '../component/CustomButton';
import Link from '../component/MuiNextLink';
import { InputAdornment } from '@mui/material';



const TextInput = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        width: '500px',
        margin:0,
    }
});
const CustomField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    paddingRight:0,
}
})

const card = (
  <React.Fragment>
    <CardContent sx={{display:'flex', flexDirection:'column', paddingLeft:0, paddingRight:0,marginTop:2, marginBottom:2}}>
        <TextInput label="이름" id="input-username" color='warning' variant='outlined'/>
        <TextInput label="이메일" id="input-email" color='warning' sx={{marginTop:2}} error helperText="올바른 이메일을 입력해 주세요"/>
        <TextInput label="비밀번호" id="input-password" color='warning' sx={{marginTop:2}}/>
        <CustomField label="비밀번호 확인" id="input-password" color='warning' sx={{marginTop:2}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CustomButton>인증 코드 발송</CustomButton>
              </InputAdornment>
            ),
          }}
        />
        <TextInput label="인증 코드" id="input-code" color='warning' sx={{marginTop:2, marginBottom:2}}/>
        <Link href='/'>
        <CustomButton >회원가입</CustomButton>
        </Link>
    </CardContent>
  </React.Fragment>
);

export default function ChargeList() {
  return (
    <>
    <div className='inner'>
        <Box>
            <h2>회원 관리</h2>
            <Card sx={{boxShadow:'none'}}>{card}</Card>
        </Box>
    </div>
    </>
  );
}
