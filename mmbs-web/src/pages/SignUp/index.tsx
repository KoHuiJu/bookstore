import React, { useState } from "react";

import {
    Card,
    CardContent,
    TextField,
    CardActions,
    Button,
    Box,
    Typography,
} from "@mui/material";

import axios from "axios";

export default function SignUp() {

    const [userId, setUserId] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [userPasswordCheck, setUserPasswordCheck] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [userPhone, setUserPhone] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userAddress, setUserAddress] = useState<string>("");
    const [userAddressDetail, setUserAddressDetail] = useState<string>("");
    const [userKidBirth, setUserKidBirth] = useState<string>("");
    const [recommendedUserId, setRecommendedUserId] = useState<string>("");

    const [idError, setIdError] = useState<boolean>(true);
    const [pwError, setPwError] = useState<boolean>(true);
    const [pwckError, setPwckError] = useState<boolean>(true);
    const [emailError, setEmailError] = useState<boolean>(true);

    const idRegExp = /^[a-zA-Z0-9]{4,8}$/;
    const pwRegExp = /^[a-zA-Z0-9!@]{8,12}$/;
    const emailRegExp = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

    const onIdHandler = (value: string) => {
        setUserId(value);
        setIdError(value === "" || !idRegExp.test(value));
    };

    const onPwHandler = (value: string) => {
        setUserPassword(value);
        setPwError(!pwRegExp.test(value));
    };

    const onPwChackHandler = (value: string) => {
        setUserPasswordCheck(value);
        setPwckError(userPassword !== value);
    };

    const onEmailHandler = (value: string) => {
        setUserEmail(value);
        setEmailError(value === "" || !emailRegExp.test(value));
    };

    const signUpHandler = () => {
        if (
            idError ||
            pwError ||
            pwckError ||
            emailError ||
            userName === "" ||
            userPhone === "" ||
            userAddress === ""
        ) {
            alert("모든 조건을 만족시켜주세요.");
            return;
        }
        const data = {
            userId,
            userPassword,
            userPasswordCheck,
            userName,
            userPhone,
            userEmail,
            userAddress,
            userAddressDetail,
            userKidBirth,
            recommendedUserId,
        };
        axios
            .post("http://localhost:4080/api/auth/signUp", data)
            .then((response) => {
                alert("회원가입 완료! 환영합니다.");
            })
            .catch((error) => {});
    };

    return (
      <>
        <Typography
          variant="h3"
          paddingTop={"2vw"}
          textAlign={"center"}
          fontFamily={"logoFont"}
        >
          회원가입
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"center"}
          style={{ paddingTop: "3vw" }}
        >
          <Card
            variant="outlined"
            sx={{ width: "30vw", height: "41vw" }}
            style={{ marginBottom: "5vw" }}
          >
            <CardContent>
              <TextField
                fullWidth
                label="아이디"
                type="id"
                variant="standard"
                error={idError}
                helperText={
                  idError ? "영대소문자 및 숫자로 4~8자리 입력하세요" : false
                }
                onChange={(e) => onIdHandler(e.target.value)}
              />
              <TextField
                fullWidth
                label="비밀번호"
                type="password"
                variant="standard"
                error={pwError}
                helperText={
                  pwError
                    ? "영대소문자 및 숫자, 특수문자(! @)로 8~12자리 입력하세요"
                    : false
                }
                onChange={(e) => onPwHandler(e.target.value)}
              />
              <TextField
                fullWidth
                label="비밀번호 체크"
                type="password"
                variant="standard"
                error={pwckError}
                helperText={pwckError ? "비밀번호가 일치하지 않습니다." : false}
                onChange={(e) => onPwChackHandler(e.target.value)}
              />
              <TextField
                fullWidth
                label="이름"
                type="name"
                variant="standard"
                error={userName === "" ? true : false}
                helperText={userName === "" ? "이름을 입력하세요" : false}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                fullWidth
                label="전화번호"
                type="phone"
                variant="standard"
                error={userPhone === "" ? true : false}
                helperText={userPhone === "" ? "전화번호를 입력하세요" : false}
                onChange={(e) => setUserPhone(e.target.value)}
              />
              <TextField
                fullWidth
                label="이메일"
                type="email"
                variant="standard"
                error={emailError}
                helperText={
                  emailError ? "이메일을 형식에 맞게 작성하여 주십시오." : false
                }
                onChange={(e) => onEmailHandler(e.target.value)}
              />
              <TextField
                fullWidth
                label="주소"
                type="address"
                variant="standard"
                error={userAddress === "" ? true : false}
                helperText={userAddress === "" ? "주소를 입력하세요" : false}
                onChange={(e) => setUserAddress(e.target.value)}
              />
              <TextField
                fullWidth
                label="상세주소"
                type="address"
                variant="standard"
                onChange={(e) => setUserAddressDetail(e.target.value)}
              />
              <TextField
                fullWidth
                label="자녀 생년월일"
                type="kidBirth"
                variant="standard"
                onChange={(e) => setUserKidBirth(e.target.value)}
              />
              <TextField
                fullWidth
                label="추천인 아이디"
                type="recommendedUserId"
                variant="standard"
                onChange={(e) => setRecommendedUserId(e.target.value)}
              />
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                onClick={() => signUpHandler()}
                variant="contained"
                sx={{ bgcolor: "#F0A500" }}
              >
                회원가입
              </Button>
            </CardActions>
          </Card>
        </Box>
      </>
    );
}
