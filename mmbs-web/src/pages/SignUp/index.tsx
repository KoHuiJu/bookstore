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
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

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

  const [idChecked, setIdChecked] = useState<boolean>(false);
  const [idCheckMessage, setIdCheckMessage] = useState<string>("");

  const idRegExp = /^[a-zA-Z0-9]{4,8}$/;
  const pwRegExp = /^[a-zA-Z0-9!@#]{8,12}$/;
  const emailRegExp = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

  const onIdHandler = (value: string) => {
    setUserId(value);
    setIdError(value === "" || !idRegExp.test(value));
    setIdChecked(false);
    setIdCheckMessage("");
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

  const checkDuplicateId = () => {
    if (!idRegExp.test(userId)) {
      setIdCheckMessage("형식에 맞는 아이디를 입력해주세요.");
      setIdChecked(false);
      return;
    }

    axios
      .get("http://localhost:4080/api/auth/checkId", {
        params: { userId },
      })
      .then((response) => {
        const { code, message } = response.data;

        if (code === "SU") {
          setIdCheckMessage(message);
          setIdChecked(true);
        } else {
          setIdCheckMessage(message);
          setIdChecked(false);
        }
      })
      .catch((error) => {
        console.error("ID 중복 확인 중 오류 발생", error);
        setIdCheckMessage("오류가 발생했습니다. 다시 시도해주세요.");
        setIdChecked(false);
      });
  };

  const signUpHandler = () => {
    if (userId === "") {
      alert("아이디를 입력하세요.");
      return;
    }

    if (!idRegExp.test(userId)) {
      alert("아이디 형식이 올바르지 않습니다. 영문+숫자 4~8자리.");
      return;
    }

    if (!idChecked) {
      alert("아이디 중복 확인을 먼저 해주세요.");
      return;
    }

    if (userPassword === "") {
      alert("비밀번호를 입력하세요.");
      return;
    }

    if (!pwRegExp.test(userPassword)) {
      alert("비밀번호 형식이 올바르지 않습니다. 특수문자 포함 8~12자리.");
      return;
    }

    if (userPasswordCheck === "") {
      alert("비밀번호 확인을 입력하세요.");
      return;
    }

    if (userPassword !== userPasswordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (userName === "") {
      alert("이름을 입력하세요.");
      return;
    }

    if (userPhone === "") {
      alert("전화번호를 입력하세요.");
      return;
    }

    if (userEmail === "") {
      alert("이메일을 입력하세요.");
      return;
    }

    if (!emailRegExp.test(userEmail)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    if (userAddress === "") {
      alert("주소를 입력하세요.");
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
      .then(() => {
        const loginData = {
          userId,
          userPassword,
        };

        axios
          .post("http://localhost:4080/api/auth/login", loginData)
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            // navigate("/mypage");
          })
          .catch(() => {
            alert("자동 로그인에 실패했습니다. 다시 로그인 해주세요.");
            navigate("/login");
          });
      })
      .catch(() => {
        alert("회원가입 중 오류가 발생했습니다.");
      });
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
      <Box display="flex" justifyContent="center" style={{ paddingTop: "3vw" }}>
        <Card
          variant="outlined"
          sx={{ width: "30vw", height: "auto" }}
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
            <Button
              onClick={checkDuplicateId}
              variant="outlined"
              sx={{ mt: 1 }}
              size="small"
            >
              중복 확인
            </Button>
            <Typography
              variant="caption"
              color={idChecked ? "green" : "error"}
              display="block"
              sx={{ mt: 0.5 }}
            >
              {idCheckMessage}
            </Typography>

            <TextField
              fullWidth
              label="비밀번호"
              type="password"
              variant="standard"
              error={pwError}
              helperText={
                pwError
                  ? "영대소문자 및 숫자, 특수문자(!,#,@)로 8~12자리 입력하세요"
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
              variant="standard"
              error={userName === ""}
              helperText={userName === "" ? "이름을 입력하세요" : false}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              fullWidth
              label="전화번호"
              variant="standard"
              error={userPhone === ""}
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
                emailError
                  ? "이메일을 형식에 맞게 작성하여 주십시오."
                  : false
              }
              onChange={(e) => onEmailHandler(e.target.value)}
            />
            <TextField
              fullWidth
              label="주소"
              variant="standard"
              error={userAddress === ""}
              helperText={userAddress === "" ? "주소를 입력하세요" : false}
              onChange={(e) => setUserAddress(e.target.value)}
            />
            <TextField
              fullWidth
              label="상세주소"
              variant="standard"
              onChange={(e) => setUserAddressDetail(e.target.value)}
            />
            <TextField
              fullWidth
              label="자녀 생년월일"
              variant="standard"
              onChange={(e) => setUserKidBirth(e.target.value)}
            />
            <TextField
              fullWidth
              label="추천인 아이디"
              variant="standard"
              onChange={(e) => setRecommendedUserId(e.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              onClick={signUpHandler}
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
