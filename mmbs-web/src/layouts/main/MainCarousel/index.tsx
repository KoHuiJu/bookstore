import { Button, Paper } from '@mui/material'
import Card from '@mui/material/Card/Card'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom'

import SampleImg from '../../../assets/images/XL.jpeg'

export default function MainCarousel() {

    const [bestList, setBestList] = useState<any[]>([]);

    useEffect(()=>{
        axios.get(`http://localhost:4080/api/best`)
        .then((response)=>{
            const data = response.data;
            if(data){
                const tmp: any[] = [[], []];
                data.data.forEach((item: any, index: number) => {
                    if(index < 5) 
                        tmp[0].push(item);
                    else
                        tmp[1].push(item);
                })
                setBestList(tmp);
            }
        })
    }, [])



  return (
    <Carousel>
        {
            bestList.map( (items, i) => <Item key={i} items={items} /> )
        }
    </Carousel>
  )
}
function Item({items}: any)
{
    return (
        <Paper>
            <Box p={2} display='flex' justifyContent='space-around'>
                {/* [1, 2, 3, 4, 5] */}
                {/* [6, 7, 8, 9, 10] */}
                {items.map((item: any) => (
                    <PaperItem item={item} />
                ))}
            </Box>
        </Paper>
    )
}
function PaperItem({item}: any) {
    return (
        <Card>
            <Box width='12.5vw'>
            <Link to={`/DtlPage/${item.productSeq}`}>
                <Box component='img' src={item.productImageUrl} width='100%'></Box>
                <Typography m={1} fontWeight="900">{item.productTitle}</Typography>
                <Typography m={1} fontWeight="700" color="#999999">{item.productWriter}</Typography>
                <Typography m={1} fontWeight="900">{item.productPrice}원</Typography> </Link>
            </Box>
        </Card>
    )
}
const tmpList = [
    {
        image: SampleImg,
        title: '팔도와 친구들의 나도 경제왕',
        writer: '김형진 글/구슬기 그림',
        price: 12600
    },
    {
        image: SampleImg,
        title: '팔도와 친구들의 나도 경제왕',
        writer: '김형진 글/구슬기 그림',
        price: 12600
    },
    {
        image: SampleImg,
        title: '팔도와 친구들의 나도 경제왕',
        writer: '김형진 글/구슬기 그림',
        price: 12600
    },
    {
        image: SampleImg,
        title: '팔도와 친구들의 나도 경제왕',
        writer: '김형진 글/구슬기 그림',
        price: 12600
    },
    {
        image: SampleImg,
        title: '팔도와 친구들의 나도 경제왕',
        writer: '김형진 글/구슬기 그림',
        price: 12600
    },
]