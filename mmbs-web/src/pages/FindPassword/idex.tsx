import React, { useState } from 'react'
import {Card, CardContent,TextField, CardActions,Button, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { error } from 'console';
import { useCookies } from 'react-cookie';
import { useFindIdStore, useUserStore } from '../../stores';

export default function FindPassword() {
    const [userId, setId] = useState<string>('');
    const [userName, setName] = useState<string>('');
    const [userEmail, setEmail] = useState<string>('');
    const [cookies, setCookies]=useCookies();

    const {user,setUser} = useUserStore();
    const {userFindId, setFindId} = useFindIdStore();

    const navigator = useNavigate();

    const findIdHandeler =() => {
        if(userId.length === 0 ||userName.length === 0 || userEmail.length ===0){
        alert('아이디,닉네임,이메일을 입력하세요.')
        return;
        }
        const data ={
            userId,
            userName,
            userEmail
        }
        axios.post("http://localhost:4080/api/auth/findPassword", data)
        .then((response)=>{
            const responseData = response.data;
            if(!responseData.result){
                alert('비밀번호를 찾을 수 없습니다.')
                return;
            }
            setFindId(userId);
            navigator('/resetPassword')
        })
        .catch((error)=>{
            alert('비밀번호 찾기에 실패하였습니다.')
        });
        
    }
  return (
    <Box display={"flex"} justifyContent={"center"}>
        <Card sx={{minWidth:275, maxWidth:"40vw"}}>
            {user != null && (<>{user.userNickname}</>)}
            <CardContent>
                <TextField
                    fullWidth
                    label="아이디"
                    type="userID"
                    variant='standard'
                    onChange={(e)=> setId(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="닉네임"
                    type="userName"
                    variant='standard'
                    onChange={(e)=> setName(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="이메일"
                    type="email"
                    variant='standard'
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </CardContent>
            <CardActions color={'black'}>
                <Button fullWidth onClick={()=>findIdHandeler()} variant="contained">
                    비밀번호 찾기
                </Button>
            </CardActions>
        </Card>
    </Box>
  )
}
