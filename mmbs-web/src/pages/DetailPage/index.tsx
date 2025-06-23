import React from "react";
import {
    Card,
    CardContent,
    TextField,
    CardActions,
    Button,
    Box,
    ButtonBase,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Typography from "@mui/material/Typography";

import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import axios from "axios";

import { Link, useParams } from "react-router-dom";
import { useSelectProductStore, useUserStore } from "src/stores";

import { useCookies } from "react-cookie"; 

export default function DetailPage() {
    
    
    // userStore에서 user정보 가져온다
    // user정보는 login 할때 userStore에 저장

    // userStore에서 user정보 가져온다
    // user정보는 login 할때 userStore에 저장


    const { productSeq } = useParams();
    const { setSelectProduct } = useSelectProductStore();

    const [Value, setValue] = React.useState("1");

    // const [count, setCount] = React.useState(1);
    const [product, setProduct] = useState<any>(null);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    // 제목
    const [productTitle, setProductTitle] = useState<string>("");
    // 저자
    const [productWriter, setProductWriter] = useState<string>("");
    // 출판사
    const [productPublisher, setProductPublisher] = useState<string>("");
    // 출판일
    const [productPublicationDate, setProductPublicationDate] =
        useState<string>("");
    // 가격
    const [productPrice, setProductPrice] = useState<number>(0);
    // 할인가격
    const [productSalesPrice, setProductSalesPrice] = useState<number>(0);
    //  좋아요
    const [productLike, setProductLike] = useState<number>(0);
    // 상세설명
    const [productIntroduceDtl, setProductIntroduceDtl] = useState<string>("");
    // 이미지
    const [productImageUrl, setProductImageUrl] = useState<string>("");

    const [cartId,setCartId]=useState<number>(0);
    const [cartProductName,setCartProductName]=useState<string>('');
    const [cartProductImage,setCartProductImage]=useState<string>('');
    const [cartProductPrice,setCartProductPrice]=useState<string>('');
    const [cartProductAmount,setCartProductAmount]=useState<number>(1);
    const [cartUserId,setCartUserId]=useState<string>('');
    
    const [cookies, setCookies] = useCookies();

    const { user } = useUserStore();
    // 장바구니 담기
    const cartAdd = () => {
        // 장바구니에 담을 때는 필요한 정보가
        // 유저 아이디 제품 시퀀스
        // 유저 아이디는 userStore에서 가져오고
        // 제품 시퀀스는 리스트에서 선택할때 pathVariavle로 가져옴
        // const {productseq}=useParams();
        const data = {
            cartUserId: user.userId,
            cartProductId: productSeq,
            cartProductAmount,  
         }
        //  $가 뭘까요?
         axios.post(`http://localhost:4080/api/cart/cartInsert`,data,{
            headers:{Authorization: `Bearer ${cookies.token}`}})
             .then((response)=>{
                 const data = response.data;
                 if(data.data){
                     alert('성공')
                 }
             })
             .catch((error) => {"qweee" });
     }

    const buyingHandler = () => {
        setSelectProduct([{ ...product, cartProductAmount }]);
    };
   

    // 좋아요 클릭시 +1
    const Likepro = () => {
        const data = {
            productSeq,
        };
        axios
            .post(`http://localhost:4080/api/dtl/dtlLikePage`, data)

            .then((response) => {
                const data = response.data;
                console.log(data);
                if (!data.data) alert(data.data);
                else {
                    alert("저장");
                    setProduct(data.data);
                    setProductTitle(data.data.productTitle);
                    setProductWriter(data.data.productWriter);
                    setProductPublisher(data.data.productPublisher);
                    setProductPublicationDate(data.data.productPublicationDate);
                    setProductPrice(data.data.productPrice);
                    setProductSalesPrice(data.data.productSalesPrice);
                    setProductIntroduceDtl(data.data.productIntroduceDtl);
                    setProductImageUrl(data.data.productImageUrl);
                }
            })
            .catch((error) => {
                "qwe";
            });
    };

    useEffect(() => {
        axios
            .get(`http://localhost:4080/api/book/${productSeq}`)
            .then((response) => {
                const data = response.data;
                const result = data.result;
                console.log(result);
                if (!result) alert(data.message);
                else {
                    setProduct(data.data);
                    setProductTitle(data.data.productTitle);
                    setProductWriter(data.data.productWriter);
                    setProductPublisher(data.data.productPublisher);
                    setProductPublicationDate(data.data.productPublicationDate);
                    setProductPrice(data.data.productPrice);
                    setProductSalesPrice(data.data.productSalesPrice);
                    setProductIntroduceDtl(data.data.productIntroduceDtl);
                    setProductImageUrl(data.data.productImageUrl);
                }
            });
    }, []);
    return (
        <>
            <Box display={"flex"} justifyContent={"center"}>
                <Box border={2} borderRadius={3} marginTop={5} borderColor="#F0A500" marginRight={3}>
                    <Box borderRadius={3} component='img' src={productImageUrl} />
                </Box>
                <Box border={2} paddingTop={6} borderRadius={3} marginTop={5} borderColor="#F0A500">
                    <Box borderBottom={1} padding={1}>
                        <Typography fontSize={20} padding={1}>
                            {productTitle}
                        </Typography>
                        <Typography padding={1}>
                            {productWriter}/{productPublisher}
                        </Typography>
                        <Typography padding={1}>
                            {productPublicationDate}
                        </Typography>
                    </Box>
                    <Box>
                        <Box>
                            <Box
                                display={"flex"}
                                justifyContent={"space-between"}
                                borderBottom={1}
                                padding={1}
                            >
                                <Typography padding={1}>금액</Typography>
                                <Typography padding={1}>
                                    {productPrice}원
                                </Typography>
                            </Box>
                            <Box
                                display={"flex"}
                                justifyContent={"space-between"}
                                borderBottom={1}
                                padding={1}
                            >
                                <Typography padding={1}>할인금액</Typography>
                                <Typography padding={1}>
                                    {productSalesPrice}원
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        borderBottom={1}
                        padding={1}
                    >
                        <Box>
                            <Typography padding={1}>배송비/배송정보</Typography>
                        </Box>
                        <Box>
                            <Typography padding={1}>3000원</Typography>
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        padding={1}
                    >
                        <Box>
                            <Typography padding={1}>구매수량</Typography>
                        </Box>
                        <Box>
                            <Box
                                sx={{
                                    color: "action.active",
                                    display: "flex",
                                    flexDirection: "column",
                                    "& > *": {
                                        marginBottom: 2,
                                    },
                                    "& .MuiBadge-root": {
                                        marginRight: 4,
                                    },
                                }}
                            >
                                <div>
                                    <ButtonGroup>
                                        <Box border={1} display={"flex"}>
                                            <Button
                                                onClick={() => {
                                                    setCartProductAmount(
                                                        Math.max(
                                                            cartProductAmount -
                                                                1,
                                                            0
                                                        )
                                                    );
                                                }}
                                            >
                                                <RemoveIcon fontSize='small' />
                                            </Button>
                                            <Box pl={3}>
                                                <Badge
                                                    badgeContent={
                                                        cartProductAmount
                                                    }
                                                ></Badge>
                                            </Box>
                                            <Button
                                                onClick={() => {
                                                    setCartProductAmount(
                                                        cartProductAmount + 1
                                                    );
                                                }}
                                            >
                                                <AddIcon fontSize='small' />
                                            </Button>
                                        </Box>
                                    </ButtonGroup>
                                </div>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        padding={1}
                    >
                        <Box>
                            <Typography padding={1}>총 상품금액</Typography>
                        </Box>
                        <Box>
                            <Typography padding={1}>
                                {productSalesPrice + 3000}원
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        pt={5}
                    >
                        <Box border={1} ml={3} borderRadius={3} borderColor="#F0A500">
                            <Link to={"/orderPayment"}>
                                <Button onClick={() => buyingHandler()}>
                                    구매하기
                                </Button>
                            </Link>
                        </Box>
                        <Box border={1} borderRadius={3} borderColor="#F0A500">
                            <Button onClick={() => cartAdd()}>
                                장바구니 담기
                            </Button>
                        </Box>
                        <Box border={1} mr={3} borderRadius={3} borderColor="#F0A500">
                            <Button onClick={() => Likepro()}>좋아요</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box marginTop={5}>
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={Value}>
                        <Box
                            display={"flex"}
                            justifyContent={"center"}
                            sx={{ borderBottom: 1, borderColor: "divider" }}
                        >
                            <TabList
                                onChange={handleChange}
                                aria-label='lab API tabs example'
                            >
                                <Tab
                                    style={{ fontSize: "25px" }}
                                    label='책 설명'
                                    value='1'
                                />
                                <Tab
                                    style={{ fontSize: "25px" }}
                                    label='상품 리뷰'
                                    value='2'
                                />
                                <Tab
                                    style={{ fontSize: "25px" }}
                                    label='판매 정보'
                                    value='3'
                                />
                            </TabList>
                        </Box>
                        <Box display={"flex"} justifyContent={"center"}>
                            <TabPanel value='1' >
                                <Box component='img'  src={productIntroduceDtl}/>
                            </TabPanel>
                        </Box >
                        <Box display={"flex"} justifyContent={"center"}>
                            <TabPanel value='2'>
                                <Box>Item Two</Box>
                            </TabPanel>
                        </Box>
                        <Box paddingLeft={55} paddingRight={55}>
                            <TabPanel value='3'>
                                <Box padding={2}>
                                    <Typography fontSize={25}  paddingBottom={2}>배송</Typography>
                                    <Typography fontSize={18}>
                                        배송방법 택배 / CJ 대한통운 네이버페이 구매
                                        후 반품/교환 시 우체국 택배로 자동 수거되지
                                        않으며, 웅진책방 전용 택배사인
                                        CJ대한통운으로 수거처리 됩니다.
                                    </Typography>
                                </Box>
                                <Box padding={2}>
                                    <Typography borderBottom={1} fontSize={18} borderColor="#F0A500">
                                        배송비 기본 배송비 3,000원 (제주/도서산간
                                        지역의 경우 추가비용발생) 30,000원 이상 무료
                                        (단, 네이버페이와 같은 간편결제시
                                        제주/도서산간 지역의 경우 추가비용이
                                        발생합니다.)
                                    </Typography>
                                </Box>
                                <Box padding={2}>
                                    <Typography fontSize={25}  paddingBottom={2}>
                                        교환/반품 안내(도서)
                                    </Typography>
                                    <Typography borderBottom={1} fontSize={18} borderColor="#F0A500">
                                        반품/교환 방법 마이페이지 반품/교환 신청 및
                                        조회, 고객센터(1670-3780)로 유선 연락
                                        반품/교환 가능 기간 출고변심반품의 경우 수령
                                        후 7일 이내 재화등의 내용이 표시·광고의
                                        내용과 다르거나 계약내용과 다르게 이행된
                                        경우에는 그 사실을 안 날 또는 알 수 있었던
                                        날부터 30일 이내에 청약철회가 가능 (단,
                                        수령일로 부터 최대 3개월)
                                    </Typography>
                                </Box>
                                <Box padding={2}>
                                    <Typography fontSize={25}  paddingBottom={2}>
                                        반품/교환 비용
                                    </Typography>
                                    <Typography borderBottom={1} fontSize={18} borderColor="#F0A500">
                                        고객의 단순변심 및 구매 착오로 인한 상품
                                        반송비용은 고객 부담
                                    </Typography>
                                </Box>
                                <Box padding={2}>
                                    <Typography fontSize={25}  paddingBottom={2}>
                                        반품/교환 불가사유
                                    </Typography>
                                    <Typography borderBottom={1} fontSize={18} borderColor="#F0A500">
                                        소비자에게 책임이 있는 사유로 재화등이
                                        멸실되거나 훼손된 경우. 다만, 재화등의
                                        내용을 확인하기 위하여 포장 등을 훼손한
                                        경우는 제외 소비자의 사용, 포장 개봉에 의해
                                        상품 등의 가치가 현저히 감소한 경우 복제가
                                        가능한 상품 등의 포장을 훼손한 경우 디지털
                                        컨텐츠인 eBook, 오디오북 등을 1회 이상
                                        다운로드를 받았을 경우 시간의 경과에 의해
                                        재판매가 곤란한 정도로 가치가 현저히 감소한
                                        경우 전자상거래 등에서의 소비자보호에 관한
                                        법률이 정하는 소비자 청약철회 제한 내용에
                                        해당되는 경우
                                    </Typography>
                                </Box>
                                <Box padding={2}>
                                    <Typography fontSize={25}  paddingBottom={2}>
                                        소비자 피해보상
                                    </Typography>
                                    <Typography fontSize={18}>
                                        상품의 불량에 의한 반품, 교환, A/S, 환불,
                                        품질보증 및 피해보상 등에 관한 사항은
                                        소비자분쟁해결기준(공정거래위원회 고시)에
                                        준하여 처리됨
                                    </Typography>
                                </Box>
                                <Box padding={2}>
                                    <Typography fontSize={18}>
                                        환불 지연에 따른 배상
                                    </Typography>
                                    <Typography borderBottom={1} borderColor="#F0A500">
                                        대금 환불 및 환불 지연에 따른 배상금 지급
                                        조건, 절차 등은 전자상거래 등에서의 소비자
                                        보호에 관한 법률에 따라 처리
                                    </Typography>
                                </Box>
                            </TabPanel>
                        </Box>
                    </TabContext>
                </Box>
            </Box>
        </>
    );
}