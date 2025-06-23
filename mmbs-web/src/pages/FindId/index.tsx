import React, { useState } from 'react'
import {Card, CardContent,TextField, CardActions,Button, Box} from '@mui/material';
import axios from 'axios';
import { useUserStore } from '../../stores';


export default function FindId() {
    const [userName, setName] = useState<string>('');
    const [userEmail, setEmail] = useState<string>('');
    const {user,setUser} = useUserStore();

   

    const findIdHandeler =() => {
        if(userName.length === 0 || userEmail.length ===0){
        alert('닉네임과 이메일을 입력하세요.')
        return;
        }
        const data ={
            userName,
            userEmail
        }
        axios.post("http://localhost:4080/api/auth/findId", data)
        .then((response)=>{
            const responseData = response.data;
            console.log(responseData)
            if(!responseData.result){
                alert('아이디를 찾을 수 없습니다.')
                return;
            }else{
                let moon = response.data.data
                alert( '일치하는 아이뒤:' + moon )
                console.log(responseData)
            }
        })
        .catch((error)=>{
            alert('아이디 찾기에 실패하였습니다.')
        });
        
    }
  return (
    <Box display={"flex"} justifyContent={"center"}>
        <Card sx={{minWidth:275, maxWidth:"40vw"}}>
            {user != null && (<>{user.userNickname}</>)}
            <CardContent>
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
                    아이디 찾기
                </Button>
            </CardActions>
        </Card>
    </Box>
  )
}
