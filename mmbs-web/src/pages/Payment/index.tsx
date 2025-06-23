import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

import {Card, CardContent,TextField, CardActions, Button, Box, Typography} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import axios from 'axios';
import { useUserStore } from 'src/stores';
import { useCookies } from "react-cookie"; 
import { useSelectProductStore } from 'src/stores';

interface Props {
  productSeq: number;
  productImageUrl: any;
  productPrice: any;
  cartProductAmount: any;
}

export default function OrderPage() {

  const [cookies, setCookies] = useCookies();

  // const [orderNumber, setOrderNumber] = useState<string>('');
  // const [orderUserWhether, setOrderUserWhether] = useState<string>('');
  const [orderGuestPassword, setOrderGuestPassword] = useState<string>('');
  const [orderGuestPasswordCheck, setOrderGuestPasswordCheck] = useState<string>('');
  // const [orderUserId, setOrderUserId] = useState<string>('');
  const [orderGiftCode, setOrderGiftCode] = useState<string>('');
  const [orderUserPhone, setOrderUserPhone] = useState<string>('');
  const [orderUserName, setOrderUserName] = useState<string>('');
  const [orderUserNameA, setOrderUserNameA] = useState<string>('');
  const [orderUserEmail, setOrderUserEmail] = useState<string>('');
  // const [orderDatetime, setOrderDatetime] = useState<string>('');
  const [orderRecieptName, setOrderRecieptName] = useState<string>('');
  const [orderRecieptPhone, setOrderRecieptPhone] = useState<string>('');
  const [orderShipAddress, setOrderShipAddress] = useState<string>('');
  const [orderShipAddressDetail, setOrderShipAddressDetail] = useState<string>('');
  // const [orderTotalPrice, setOrderTotalPrice] = useState<number>(0);
  // const [orderStatus, setOrderStatus] = useState<Number>(0);
  // const [orderShipCompany, setOrderShipCompany] = useState<string>('');
  // const [orderShipNumber, setOrderShipNumber] = useState<number>(0);
  const [orderShipMessage, setOrderShipMessage] = useState('');

  // const [productCount, setProductCount] = useState<number>(0);
  // const [productId, setProductId] = useState<number>(0);

  const { user } = useUserStore();
  const { selectProduct } = useSelectProductStore();
  const { setSelectProduct } = useSelectProductStore();

  const handleChangeMessage = (event: SelectChangeEvent) => {
    setOrderShipMessage(event.target.value as string);
  };

  const handleChangeGift = (event: SelectChangeEvent) => {
    setOrderGiftCode(event.target.value as string);
  };

//   const getSelectProduct = () => {
//     axios
//         .get(
//           "http://localhost:4080/api/pay/orderInsert"
//         )
//         .then((response) => {
//             setSelectProduct(response.data.data);
//         })
//         .catch((error) => {});
// };

  const paymentFinishHandler = async () => {

    console.log(selectProduct);

    const body = {
      orderUserWhether: user ? 1 : 0,
      orderGuestPassword : user ? null : orderGuestPassword,
      orderGuestPasswordCheck : user ? null : orderGuestPasswordCheck,
      orderUserId: user ? user.userId : null,
      orderGiftCode: user ? orderGiftCode : null,
      orderUserName,
      orderUserPhone,
      orderUserEmail,
      orderRecieptName,
      orderRecieptPhone,
      orderShipAddress,
      orderShipAddressDetail,
      orderShipMessage,
      orderCount: selectProduct[0].cartProductAmount,
      productId: selectProduct[0].productSeq,
    };

    axios
      .post("http://localhost:4080/api/pay/orderInsert", body
      , { headers: { Authorization: `Bearer ${cookies.token}`}}
      )
      .then((response) => {
        const data = response.data;
        const result = data.result;
        console.log(result);
        if (!result) alert(data.message);
      })
      .catch((error) => {
        console.log(error)
        alert(error.message);
      });
  }
  
  useEffect(() => {
    if (user) {
      setOrderUserNameA(user.userName);
      setOrderUserName(user.userName);
      setOrderUserPhone(user.userPhone);
      setOrderUserEmail(user.userEmail);

      setOrderRecieptName(user.userName);
      setOrderRecieptPhone(user.userPhone);

      setOrderShipAddress(user.userAddress);
      setOrderShipAddressDetail(user.userAddressDetail);
    } 
  }, [])

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        style={{ paddingTop: "2vw" }}
      >
        <Box sx={{ m: 1 }}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            style={{ paddingTop: "2vw" }}
            sx={{ width: "40vw", height: "20vw" }}
          >
            <Card
              sx={{ minWidth: 275, maxWidth: "40vw" }}
              style={{ paddingTop: "2vw" }}
            >
              <CardContent>
                {cookies.token && (
                  <Box display={"flex"} borderBottom={1} padding={1}>
                    <Typography padding={1}>성명</Typography>
                    <Typography padding={1}>{orderUserNameA} 님</Typography>
                  </Box>
                )}
                <TextField
                  fullWidth
                  label="주문자이름"
                  type="name"
                  variant="standard"
                  value={orderUserName}
                  onChange={(e) => setOrderUserName(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="주문자 전화번호"
                  type="phone"
                  variant="standard"
                  value={orderUserPhone}
                  onChange={(e) => setOrderUserPhone(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="주문자 이메일"
                  type="email"
                  variant="standard"
                  value={orderUserEmail}
                  onChange={(e) => setOrderUserEmail(e.target.value)}
                />
              </CardContent>
            </Card>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            style={{ paddingTop: "2vw" }}
          >
            <Card
              sx={{ minWidth: 275, maxWidth: "40vw" }}
              style={{ paddingTop: "2vw" }}
            >
              <CardContent>
                <Typography> 배송지 정보 </Typography>
                <TextField
                  fullWidth
                  label="수령인 이름"
                  type="name"
                  variant="standard"
                  value={orderRecieptName}
                  onChange={(e) => setOrderRecieptName(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="수령인 전화번호"
                  type="phone"
                  variant="standard"
                  value={orderRecieptPhone}
                  onChange={(e) => setOrderRecieptPhone(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="수령인 주소"
                  type="address"
                  variant="standard"
                  value={orderShipAddress}
                  onChange={(e) => setOrderShipAddress(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="수령인 상세주소"
                  type="address"
                  variant="standard"
                  value={orderShipAddressDetail}
                  onChange={(e) => setOrderShipAddressDetail(e.target.value)}
                />
              </CardContent>
              <CardContent sx={{ maxWidth: "40vw" }}>
                <FormControl sx={{ m: 1, minWidth: "35vw", maxWidth: "40vw" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    배송 메시지
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={orderShipMessage}
                    label="Select gift"
                    onChange={handleChangeMessage}
                  >
                    <MenuItem>
                      <em>배송메시지를 선택해주세요</em>
                    </MenuItem>
                    <MenuItem value={10}>경비실에 맡겨주세요</MenuItem>
                    <MenuItem value={20}>배송전 연락주세요</MenuItem>
                    <MenuItem value={30}>안전하게 와주세요</MenuItem>
                    <MenuItem value={40}>감사합니다 :p </MenuItem>
                  </Select>
                </FormControl>
                {!cookies.token ? (
                  ""
                ) : (
                  <FormControl
                    sx={{ m: 1, minWidth: "35vw", maxWidth: "40vw" }}
                  >
                    <InputLabel id="demo-simple-select-helper-label">
                      사은품 선택
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={orderGiftCode}
                      label="Select gift"
                      onChange={handleChangeGift}
                    >
                      <MenuItem>
                        <em>사은품을 선택해주세요</em>
                      </MenuItem>
                      <MenuItem value={1}>스폰지밥</MenuItem>
                      <MenuItem value={2}>뚱이</MenuItem>
                      <MenuItem value={3}>징징이</MenuItem>
                      <MenuItem value={4}>집게사장</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          style={{ paddingTop: "2vw" }}
          sx={{ width: "40vw", m: 1 }}
        >
          <Card sx={{ minWidth: "40vw" }} style={{ paddingTop: "2vw" }}>
            <Typography padding={1}> 주문 내역</Typography>
            <CardContent>
              {selectProduct.map((product) => (
                <Box>
                  <Box sx={{ width: "20vw", height: "20vw" }}>
                    <Box
                      component="img"
                      src={product.productImageUrl}
                      sx={{ width: "20vw", height: "20vw" }}
                    />
                  </Box>
                  <Box borderBottom={1} padding={1}>
                    <Typography padding={1}>
                      제품 : {product.productTitle}
                    </Typography>
                    <Typography padding={1}>
                      금액 : {product.productPrice}원
                    </Typography>
                    <Typography padding={1}>
                      수량 : {product.cartProductAmount}개
                    </Typography>
                    <Typography padding={1}>
                      결제 금액 :{" "}
                      {product.cartProductAmount * product.productPrice}원
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    borderBottom={1}
                    padding={1}
                  >
                    <Typography padding={1}>상품가격</Typography>
                    <Typography padding={1}>
                      {product.productPrice}원
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    borderBottom={1}
                    padding={1}
                  >
                    <Typography padding={1}>총수량</Typography>
                    <Typography padding={1}>
                      {product.cartProductAmount} 개
                    </Typography>
                    <Typography padding={1}>배송비</Typography>
                    <Typography padding={1}>3,000원</Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    borderBottom={1}
                    padding={1}
                  >
                    <Typography padding={1}>최종 결제 금액</Typography>
                    <Typography padding={1}>
                      {product.cartProductAmount * product.productPrice + 3000}
                      원
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Box>
      </Box>
      {!cookies.token ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          style={{ paddingTop: "2vw" }}
        >
          <Card style={{ paddingTop: "2vw" }}>
            <Box>
              <Typography padding={1}>
                {" "}
                - 비회원 주문 비밀번호 설정 -{" "}
              </Typography>
              <Typography padding={1}>
                비밀번호는 “주문 확인”시 필수기재 사항으로 반드시 기억하셔야
                합니다.
              </Typography>
              <Typography padding={1}>
                비밀번호는 숫자+영문 조합하여 4자리 이상으로 입력하세요.
              </Typography>
              <CardActions>
                <Typography padding={1}> 비회원 주문 비밀번호 : </Typography>
                <TextField
                  label="비회원 주문 비밀번호"
                  type="password"
                  variant="standard"
                  value={orderGuestPassword}
                  onChange={(e) => setOrderGuestPassword(e.target.value)}
                />
              </CardActions>
              <CardActions>
                <Typography padding={1}>
                  {" "}
                  비회원 주문 비밀번호 확인 :{" "}
                </Typography>
                <TextField
                  label="비회원 주문 비밀번호 확인"
                  type="password"
                  variant="standard"
                  value={orderGuestPasswordCheck}
                  onChange={(e) => setOrderGuestPasswordCheck(e.target.value)}
                />
              </CardActions>
            </Box>
          </Card>
        </Box>
      ) : (
        " "
      )}

      <Box display={"flex"} justifyContent={"center"}>
        <CardActions sx={{ minWidth: "60vw" }} style={{ paddingTop: "2vw" }}>
          <Button
            fullWidth
            onClick={() => {
              paymentFinishHandler();
            }}
            variant="contained"
          >
            결제하기
          </Button>
        </CardActions>
      </Box>
    </>
  );
}
