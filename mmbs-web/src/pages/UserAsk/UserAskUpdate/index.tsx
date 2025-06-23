import React from 'react'
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"; 
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

import {Card, CardContent,TextField, CardActions, Button, Box, Typography, ButtonGroup } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from "@mui/material/MenuItem";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function UserAskUpdate() {

  const { askId } = useParams();

  const [cookies, setCookies] = useCookies();

  // const [askId, setAskId] = useState<string>('');
  const [askWriter, setAskWriter] = useState<string>('');
  const [askSort, setAskSort] = useState<string>('');
  const [askTitle, setAskTitle] = useState<string>('');
  const [askContent, setAskContent] = useState<string>('');

  // const [userName, setUserName] = useState<string>('');
  // const [userEmail, setUserEmail] = useState<string>('');
  // const [userPhone, setUserPhone] = useState<string>('');

  const handleChangeAskSort = (event: SelectChangeEvent) => {
    setAskSort(event.target.value as string);
  };

  const askWriteHandler = () => {
    const data = {
      askId,
      askWriter,
      askSort,
      askTitle,
      askContent,
    };
    axios
    .post("http://localhost:4080/api/ask/userAskUpdate/save", data, {
      headers: { Authorization: `Bearer ${cookies.token}`}})
    .then((response) => {
      const data = response.data;
      const result = data.result;
      console.log(result);
      alert("1 : 1 문의 수정을 정상적으로 완료하였습니다.");
      if (!result) alert(data.message)
    })
    .catch((error) => {});
  };

  useEffect(() => {
    axios.get(`http://localhost:4080/api/ask/userAskUpdate/${askId}`, {
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
        setAskWriter(data.data.askWriter);
        setAskSort(data.data.askSort);
        setAskTitle(data.data.askTitle);
        setAskContent(data.data.askContent);
      }
    })
  }, []);

  return (
    <>
      <Box style={{ paddingTop: "2vw", paddingBottom: "2vw" }}>
        <Typography align="center" fontSize={"30px"}>
          마이페이지
        </Typography>
        <Typography align="center" fontSize={"25px"}>
          1 : 1 문의 수정
        </Typography>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        style={{
          padding: "1vw",
          margin: "auto",
        }}
        sx={{ maxWidth: "60vw" }}
        borderBottom={1}
        borderTop={1}
      >
        <Card sx={{ m: 1, minWidth: "55vw" }}>
          <Box display={"flex"} justifyContent={"center"}>
            <Card>
              <CardContent>
                <Box
                  display={"flex"}
                  borderBottom={1}
                  padding={1}
                  margin={1}
                  sx={{ minWidth: "55vw" }}
                >
                  <Box
                    padding={1}
                    sx={{ minWidth: "8vw" }}
                    justifyContent={"center"}
                    alignContent={"center"}
                  >
                    문의 유형
                  </Box>
                  <Box
                    sx={{ flexGrow: 1 }}
                    justifyContent={"center"}
                    alignContent={"center"}
                  >
                    <FormControl sx={{ minWidth: "11vw", maxWidth: "15vw" }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        문의유형 선택
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={askSort}
                        label="문의유형 선택"
                        onChange={handleChangeAskSort}
                      >
                        <MenuItem>
                          <em>문의 유형을 선택해주세요</em>
                        </MenuItem>
                        <MenuItem value={"제품 문의"}>제품 문의</MenuItem>
                        <MenuItem value={"주문 / 결제 문의"}>주문 / 결제 문의</MenuItem>
                        <MenuItem value={"취소 / 환불 문의"}>취소 / 환불 문의</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  borderBottom={1}
                  padding={1}
                  margin={1}
                  sx={{ minWidth: "55vw" }}
                >
                  <Box padding={1} sx={{ minWidth: "8vw" }}>
                    문의 제목
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <TextField
                      id="filled-multiline-flexible"
                      label="문의 제목을 입력해주세요"
                      fullWidth
                      value={askTitle}
                      onChange={(e) => setAskTitle(e.target.value)}
                      inputProps={{ maxLength: 10 }}
                    />
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  borderBottom={1}
                  padding={1}
                  margin={1}
                  sx={{ minWidth: "55vw" }}
                >
                  <Box padding={1} sx={{ minWidth: "8vw" }}>
                    문의 내용
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <TextField
                      id="filled-multiline-flexible"
                      label="최대 200자 이내로 작성해주세요"
                      multiline
                      fullWidth
                      maxRows={5}
                      variant="filled"
                      value={askContent}
                      onChange={(e) => setAskContent(e.target.value)}
                      inputProps={{ maxLength: 200 }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Card>
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        <CardActions sx={{ minWidth: "60vw" }} style={{ paddingTop: "2vw" }}>
          <Link to={"/userAskList"}>
            <Button onClick={() => askWriteHandler()}>문의 변경</Button>
          </Link>
          <Link to={"/userAskList"}>
            <Button>취소</Button>
          </Link>
        </CardActions>
      </Box>
    </>
  );
}