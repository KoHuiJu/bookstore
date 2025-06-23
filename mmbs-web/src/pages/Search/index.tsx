import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import "./style.css";
import axios from "axios";

function SearchAdd() {
    const [bookList, setBookList] = useState<any[]>([]);

    const { productTitle } = useParams();

    useEffect(() => {

        const data = {
          productTitle,
        };
        axios.post(`http://localhost:4080/api/serch`,data)

        .then((response)=>{

            const data = response.data;
            if(data){
                setBookList(data.data);
            }
        })
    }, [productTitle]);

    return (
        <div>
            <div className='container'>
                <div className='list-wrapper'>
                    {bookList.map((item) => (
                        <div className='list-container'>
                            <div className='list-img'>
                                <div className='imgtle'>
                                    <Link to={`/dtlPage/${item.productSeq}`}>
                                        <img
                                            className='book-img'
                                            src={item.productImageUrl}
                                        />
                                    </Link>
                                </div>
                                <div className='book-name'>
                                    {item.productTitle}
                                </div>
                                <div className='price'>
                                    <b>{item.productPrice}</b>원
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SearchAdd;
