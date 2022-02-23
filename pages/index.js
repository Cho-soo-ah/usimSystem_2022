import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Link from '../component/MuiNextLink';
import Button from '@mui/material/Button';

const UsimNext = () => {
  return (
    <div className='inner'>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          width:'auto',
          '& .MuiButton-root': {
            m: 2,
            width: 250,
            height: 250,
          },
          '& a':{
            textDecoration:'none'
          }
        }}
      >
        <Link href='/chargeList'>
          <Button variant="outlined" color="error">개통 및 충전 검증</Button>
        </Link>
        <Link href='/payList'>
          <Button variant="outlined" color="error">입금 내역</Button>
        </Link>
        <Link href='/store'>
          <Button variant="outlined" color="error">대리점 개통 및 충전 현황</Button>
        </Link>
        <Link href='/product'>
          <Button variant="outlined" color="error">상품 관리</Button>
        </Link>
      </Box>
    </div>
  );
};

export default UsimNext;