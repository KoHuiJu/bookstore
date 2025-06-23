import React, { useEffect, useState } from "react";


import { Img1, Img2, Img3, Img4 } from "../../../assets/images";
import { Box, Grid } from "@mui/material";
import MainSideCarousel from "../MainSideCarousel";
import MainCarousel from "../MainCarousel";
import Ranking from "../Ranking";


export default function MainArticle() {
  // state : 상태 => 해당 컴포넌트가 리랜더링 되는 기준
  //       : 화면에 보여지는 변수
  // String img = 'Img1';
  // const [변수명, setter메서드] = useState<데이터타입>(초깃값);

  const [img, setImg] = useState<string>(Img1);
  const [index, setIndex] = useState<number>(0);
  // state로 지정하면 화면에서 동작을 받아서 변경할 수 있다.

  const imgList = [Img1, Img2, Img3, Img4];
  // 변수로 선언 > 화면에서 동작받아서 변경할 수 없다.

  const nextHandler = () => {
    if (index === imgList.length - 1) {
      setIndex(0);
      setImg(imgList[0]);
    } else {
      setIndex(index + 1);
      setImg(imgList[index + 1]);
    }
  };

  const prevHandler = () => {
    if (index === 0) {
      setIndex(imgList.length - 1);
      setImg(imgList[imgList.length - 1]);
    } else {
      setIndex(index - 1);
      setImg(imgList[index - 1]);
    }
  };

  // 화면에 처음 마운트 될 때(맨 처음) 동작하는 코드
  // 특정 상태가 변경되면 동작하는 코드
  // useEffect(상태 변화에 따라 동작하는 콜백함수, [스코프할 상태]) // 생명주기가..두번 인식한다..

  // useEffect(() => {
  //   alert('useEffect');
  // }, [index, img]);

  // useEffect(() => {
  //   alert('1useEffect');
  // }, [index]);

  const change1 = () => {};

  const change2 = () => {};

  return (
      <Box mb={2} ml='10vw' mr='10vw'>
        <Grid mt={2} container spacing={2}>
          <Grid item xs={8}>
            <MainSideCarousel />
          </Grid>
          <Grid item xs={4}>
            <Ranking></Ranking>
          </Grid>
        </Grid>
        <Grid mt={2} container spacing={2}>
          <Grid item xs={12}>
            <MainCarousel />
          </Grid>
        </Grid>
      </Box>
  );
}