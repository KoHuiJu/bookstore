import React, { useEffect, useState } from 'react'

import {Card, CardContent,TextField , CardActions ,Button ,Box , Typography} from '@mui/material';
import axios from 'axios';
import UserPageLeftSide from 'src/layouts/MyPage/MyPageLeftSide';
import { useCookies } from "react-cookie"; 

export default function UserUpdate() {

  const [userId, setUserId] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [userPasswordCheck, setUserPasswordCheck] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [userAddressDetail, setUserAddressDetail] = useState<string>('');
  const [userKidBirth, setUserKidBirth] = useState<string>('');

  const [cookies, setCookies] = useCookies();

  const onUpdateHandler = async () => {

    const body = {
      userId,
      userPassword,
      userPasswordCheck,
      userName,
      userEmail,
      userPhone,
      userAddress,
      userAddressDetail,
      userKidBirth
    }

    axios
      .post("http://localhost:4080/api/user/userUpdate", body, {
        headers: { Authorization: `Bearer ${cookies.token}`}})
      .then((response) => {
        const data = response.data;
        const result = data.result;
        console.log(result);
        if (!result) alert(data.message);
        else {
          setUserId(data.data.userId);
          setUserPassword(data.data.userPassword);
          setUserPasswordCheck(data.data.userPassword);
          setUserName(data.data.userName);
          setUserEmail(data.data.userEmail);
          setUserPhone(data.data.userPhone);
          setUserAddress(data.data.userAddress);
          setUserAddressDetail(data.data.userAddressDetail);
          setUserKidBirth(data.data.userKidBirth);
        }
      })
      .catch((error) => {
        console.log(error)
        alert(error.message);
      });
  }

  useEffect(() => {
    axios.get(`http://localhost:4080/api/user/`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
    .then((response) => {
      const data = response.data;
      const result = data.result;
      console.log(result);
      if (!result) alert(data.message)
      else {
        setUserId(data.data.userId);
        setUserName(data.data.userName);
        setUserEmail(data.data.userEmail);
        setUserPhone(data.data.userPhone);
        setUserAddress(data.data.userAddress);
        setUserAddressDetail(data.data.userAddressDetail);
        setUserKidBirth(data.data.userKidBirth);
      }
    })
  }, []);

  return (
    <Box display={"flex"}>
      <UserPageLeftSide />
      <Box
        display={"flex"}
        justifyContent={"center"}
        style={{ paddingTop: "5vw" }}
      >
        <Card sx={{ minWidth: 275, maxWidth: "40vw" }}>
          <CardContent>
            <Typography fontWeight={800} ml={1} mb={2}>
              회원 정보 수정
            </Typography>
            <TextField
              fullWidth
              label="아이디"
              value={userId}
              type="email"
              variant="standard"
            />
            <TextField
              fullWidth
              label="이름"
              type="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              variant="standard"
            />
            <TextField
              fullWidth
              label="전화번호"
              type="phone"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              variant="standard"
            />
            <TextField
              fullWidth
              label="이메일"
              type="email"
              value={userEmail}
              variant="standard"
            />
            <TextField
              fullWidth
              label="주소"
              type="address"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              variant="standard"
            />
            <TextField
              fullWidth
              label="상세주소"
              type="address"
              value={userAddressDetail}
              onChange={(e) => setUserAddressDetail(e.target.value)}
              variant="standard"
            />
            <TextField
              fullWidth
              label="자녀 생년월일"
              type="kidBirth"
              value={userKidBirth}
              onChange={(e) => setUserKidBirth(e.target.value)}
              variant="standard"
            />
          </CardContent>
          <CardActions>
            <Button onClick={() => onUpdateHandler()} variant="contained">
              정보 수정
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
}
