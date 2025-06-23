import React, { useState } from 'react'
import {Card, CardContent,TextField, CardActions,Button, Box} from '@mui/material';
import axios from 'axios';
import { useFindIdStore, useUserStore } from '../../stores';

export default function ResetPassword() {
    const [userPassword, setPassword] = useState<string>('');
    const [userPassword2, setPassword2] = useState<string>('');
    
    const { user, setUser } = useUserStore();
    const {userFindId} = useFindIdStore();

    const resetPasswordHandeler =() => {
        if(userPassword.length === 0 || userPassword2.length ===0){
        alert('새 비밀번호와 새 비밀번호 확인을 입력하세요.')
        return;
        }
        const data ={
            userId: userFindId,
            userPassword,
            userPassword2
        }
        axios.post("http://localhost:4080/api/auth/resetPassword", data)
        .then((response)=>{
            const responseData = response.data;
            console.log(responseData)
            if(!responseData.result){
                alert('비밀번호 재확인을 다시 하십시요.')
                return;
            }else{
                alert('성공')
                console.log(responseData)
            }
        })
        .catch((error)=>{
            alert('비밀번호 재설정에 실패하였습니다.')
        });
        
    }
  return (
    <Box display={"flex"} justifyContent={"center"}>
        <Card sx={{minWidth:275, maxWidth:"40vw"}}>
            {user != null && (<>{user.userNickname}</>)}
            <CardContent>
                <TextField
                    fullWidth
                    label="새 비밀번호"
                    type="userPassword"
                    variant='standard'
                    onChange={(e)=> setPassword(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="새 비밀번호 확인"
                    type="userPassword2"
                    variant='standard'
                    onChange={(e)=>setPassword2(e.target.value)}
                />
            </CardContent>
            <CardActions color={'black'}>
                <Button fullWidth onClick={()=>resetPasswordHandeler()} variant="contained">
                    비밀번호 재설정
                </Button>
            </CardActions>
        </Card>
    </Box>
  )
}
