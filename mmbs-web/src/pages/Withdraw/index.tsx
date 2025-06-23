import React, { useState } from 'react'
import axios from 'axios';
import UserPageLeftSide from "src/layouts/MyPage/MyPageLeftSide";

import {Card, CardContent,TextField, CardActions, Button, Box, Typography, ButtonGroup } from '@mui/material';

import { Cookies, useCookies } from 'react-cookie';
import { useUserStore } from '../../stores';
import { Link } from "react-router-dom";

export default function Withdraw() {

  const [userId, setUserId] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [cookies, setCookies] = useCookies();

  const withdrawHandeler =() => {

    if(userId.length === 0 || userEmail.length === 0){
    alert('아이디와 이메일을 입력하세요.')
    return;
    }
    const data ={
        userId,
        userEmail
    }

    axios.post("http://localhost:4080/api/user/userDelete", data, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    })
    .then((response) => {
      setCookies("token", "", { expires: new Date() });

      const responseData = response.data;
      console.log(responseData);
      if (!responseData.result) {
        alert("아이디 또는 이메일이 일치하지 않습니다");
        return;
      }
      alert("회원 탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.");
    })
    .catch((error)=>{
      alert('다시 입력해주세요')
    });
}

  return (
    <>
      <Box display={"flex"} style={{ padding: "3vw" }}>
        <UserPageLeftSide />
        <Box marginLeft={"10vw"}>
          <Box>
            <Box>
              <Typography
                variant="h3"
                paddingBottom={"2vw"}
                textAlign={"center"}
                fontFamily={"logoFont"}
              >
                마이페이지
              </Typography>
              <Typography
                variant="h4"
                paddingBottom={"1vw"}
                textAlign={"center"}
              >
                회원 탈퇴
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              style={{ paddingTop: "3vw" }}
            >
              <Card
                style={{ marginBottom: "5vw" }}
                sx={{ m: 1, width: "40vw", height: "15vw" }}
              >
                <CardContent>
                  <Box>
                    <TextField
                      fullWidth
                      label="아이디"
                      type="email"
                      variant="standard"
                      onChange={(e) => setUserId(e.target.value)}
                    />
                    <TextField
                      fullWidth
                      label="이메일"
                      type="email"
                      variant="standard"
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Box sx={{ width: "100vw" }}>
                    <Box component="div">
                      <Link to={""}>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{ bgcolor: "#F0A500" }}
                          onClick={() => withdrawHandeler()}
                        >
                          회원 탈퇴
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                </CardActions>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
