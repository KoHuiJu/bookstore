import React from 'react'
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";

import {Card, CardContent,TextField, CardActions, Button, Box, Typography, ButtonGroup, Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import UserPageLeftSide from "src/layouts/MyPage/MyPageLeftSide";

export default function UserAskList() {

  const navigator = useNavigate();

  const [cookies, setCookies] = useCookies();

  const [askList, setAskList] = useState<any[]>([]);

  // const [askId, setAskId] = useState<number>(0);
  // const [askWriter, setAskWriter] = useState<string>('');
  const [askSort, setAskSort] = useState<string>('');
  // const [askTitle, setAskTitle] = useState<string>('');
  // const [askContent, setAskContent] = useState<string>('');
  const [askDatetime, setAskDatetime] = useState<number>(0);
  const [askStatus, setAskStatus] = useState<string>('');
  // const [askReply, setAskReply] = useState<string>('');
  
  const handleChangeAskSort = (event: SelectChangeEvent) => {
    setAskSort(event.target.value as string);
  };

  const handleChangeAskStatus = (event: SelectChangeEvent) => {
    setAskStatus(event.target.value as string);
  };

  const onAskDateTimeHandler = (months: number) => {
    setAskDatetime(months);
  }

  // 문의 리스트
  const getAskList = async () => {

    axios
      .get(`http://localhost:4080/api/ask/askList`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((response) => {
        setAskList(response.data.data);
      })
      .catch((error) => {
        alert("Failed");
      });
  }

  // 문의 삭제
  const askDelete = (askId: number) =>{
        
    const data = { askId };

    axios
      .post(`http://localhost:4080/api/ask/userDelete/`, data, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then((response) => {
        const data = response.data;
        if (data.result) {
          const list = data.data;
          setAskList(list);
        }
      })
      .catch((error) => {
        alert("Failed");
      });
  };

  // 문의 조회
  const askSearch = () =>{
        
    const data = {
      askDatetime,
      askStatus,
      askSort
   };

    axios
      .post(`http://localhost:4080/api/ask/askSearch/`, data, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then((response) => {
        const data = response.data;
        if (data.result) {
          const list = data.data;
          setAskList(list);
        }
      })
      .catch((error) => {
        alert("Failed");
      });
  };

  useEffect(() => {
    getAskList();
    axios
      .get(`http://localhost:4080/api/ask/askList`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        },
      })
      .then((response) => {
        const data = response.data;
        const result = data.result;
        setAskList(response.data.data);
      });
  }, []);

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
                1 : 1 문의
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              style={{
                padding: "1vw",
                borderWidth: 2,
                borderRadius: 4,
                borderStyle: "solid",
              }}
              sx={{ maxWidth: "60vw" }}
              borderBottom={1}
              borderTop={1}
            >
              <Card
                style={{ paddingTop: "1vw" }}
                sx={{ m: 1, minWidth: "55vw" }}
              >
                <Box style={{ paddingTop: "1vw" }}>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                    style={{ paddingLeft: "1vw" }}
                  >
                    <Button onClick={() => onAskDateTimeHandler(0)}>
                      전체
                    </Button>
                    <Button onClick={() => onAskDateTimeHandler(1)}>
                      1개월
                    </Button>
                    <Button onClick={() => onAskDateTimeHandler(3)}>
                      3개월
                    </Button>
                    <Button onClick={() => onAskDateTimeHandler(6)}>
                      6개월
                    </Button>
                  </ButtonGroup>
                  {/* <Stack spacing={3}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                localeText={{ start: "Desktop start", end: "Desktop end" }}
              >
                <DesktopDateRangePicker
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 2 }}> to </Box>
                      <TextField {...endProps} />
                    </React.Fragment>
                  )}
                />
              </LocalizationProvider>
            </Stack> */}
                  <Box display={"flex"}>
                    <CardContent sx={{ maxWidth: "40vw" }}>
                      <FormControl sx={{ minWidth: "20vw", maxWidth: "20vw" }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          답변 상태
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={askStatus}
                          label="Select askStatus"
                          onChange={handleChangeAskStatus}
                        >
                          <MenuItem>
                            <em>답변상태</em>
                          </MenuItem>
                          <MenuItem value={"답변 완료"}>답변 완료</MenuItem>
                          <MenuItem value={"문의 접수"}>문의 접수</MenuItem>
                        </Select>
                      </FormControl>
                    </CardContent>
                    <CardContent sx={{ maxWidth: "40vw" }}>
                      <FormControl sx={{ minWidth: "20vw", maxWidth: "20vw" }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          문의 종류
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={askSort}
                          label="Select askSort"
                          onChange={handleChangeAskSort}
                        >
                          <MenuItem>
                            <em>문의 종류</em>
                          </MenuItem>
                          <MenuItem value={"제품 문의"}>제품 문의</MenuItem>
                          <MenuItem value={"주문/결제 문의"}>
                            주문/결제 문의
                          </MenuItem>
                          <MenuItem value={"교환/취소 문의"}>
                            교환/취소 문의
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </CardContent>
                  </Box>
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
                  <CardActions
                    sx={{ minWidth: "30vw" }}
                    // style={{ paddingTop: "1vw" }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => askSearch()}
                    >
                      조회하기
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Box
                sx={{ minWidth: "30vw" }}
                style={{ paddingTop: "2vw", paddingBottom: "1vw" }}
              >
                <Link to={"/userAskWrite"}>
                  <Button fullWidth variant="contained">
                    문의 작성하기
                  </Button>
                </Link>
              </Box>
            </Box>

            <Box
              display={"flex"}
              justifyContent={"center"}
              style={{
                padding: "1vw",
                margin: "auto",
              }}
              sx={{ maxWidth: "70vw" }}
              borderBottom={1}
              borderTop={1}
            >
              <Card
                style={{ paddingTop: "1vw" }}
                sx={{ m: 1, minWidth: "65vw" }}
              >
                <Box display={"flex"} justifyContent={"center"}>
                  <CardContent>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      borderBottom={1}
                      padding={1}
                      marginBottom={1}
                      sx={{ minWidth: "60vw" }}
                    >
                      <Typography padding={1} flexGrow={1}>
                        NO.
                      </Typography>
                      <Typography padding={1} flexGrow={1}>
                        문의 유형
                      </Typography>
                      <Typography padding={1} flexGrow={7}>
                        문의 제목
                      </Typography>
                      <Typography padding={1} flexGrow={1}>
                        문의 상태
                      </Typography>
                      <Typography padding={1} flexGrow={1}>
                        작성일
                      </Typography>
                    </Box>
                    {askList.map((ask) => (
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        borderBottom={1}
                        padding={1}
                        marginBottom={1}
                      >
                        <Typography padding={1} flexGrow={1}>
                          {ask.askId}
                        </Typography>
                        <Typography padding={1} flexGrow={1}>
                          {ask.askSort}
                        </Typography>
                        <Typography padding={1} flexGrow={7}>
                          {ask.askTitle}
                        </Typography>
                        <Typography padding={1} flexGrow={1}>
                          {ask.askStatus}
                        </Typography>
                        <Typography padding={1} flexGrow={1}>
                          {ask.askDatetime}
                        </Typography>
                        <Link to={`/userAskUpdate/${ask.askId}`}>
                          <Button>수정</Button>
                        </Link>
                        {/* <Link to={"/userAskList"}> */}
                        <Button onClick={() => askDelete(ask.askId)}>
                          삭제
                        </Button>
                        {/* </Link> */}
                      </Box>
                    ))}
                  </CardContent>
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
