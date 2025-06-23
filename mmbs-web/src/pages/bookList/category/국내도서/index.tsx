import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import "./style.css";
import axios from "axios";
import { MENU_LIST } from "src/constants";

function BookList() {
    const [bookList, setBookList] = useState<any[]>([]);
    const [menu, setMenu] = useState<any>(MENU_LIST[0]);

    const { productGenre, productSubGenre } = useParams();

    const sortList = (e: any) => {
        const sorting = e.currentTarget.value;
        const tmp: any[] = [];
        const sortedList = bookList.sort((a, b) => {
            if (sorting === "추천순") return b.productLike - a.productLike;
            if (sorting === "가격순") return a.productPrice - b.productPrice;
            if (sorting === "ㄱㄴㄷ순") return b.productTilte - a.productTilte;
            else return a.productTilte - b.productTilte;
        });
        sortedList.forEach((item) => tmp.push(item));
        setBookList(tmp);
    };

    const getBookList = () => {
        const bookListUrl =
            productGenre === "1" || productGenre === "2"
                ? "bookList1"
                : "bookList2";
        axios
            .get(
                `http://localhost:4080/api/book/${bookListUrl}/${productGenre}/${productSubGenre}`
            )
            .then((response) => {
                setBookList(response.data.data);
            })
            .catch((error) => {});
    };

    useEffect(() => {
        getBookList();
        console.log("aaa" + productGenre);
        const menuItem = MENU_LIST.find(
            (item) => item.category === productGenre
        );
        setMenu(menuItem);
    }, [productGenre, productSubGenre]);

    return (
        <div>
            <div className='list-top'>
                <form>
                    <select name='serachFrm' onChange={(e) => sortList(e)}>
                        <option value='none'>=== 선택 ===</option>
                        <option value='추천순'>추천순</option>
                        <option value='가격순'>가격순</option>
                        <option value='ㄱㄴㄷ순'>ㄱㄴㄷ순</option>
                    </select>
                </form>
            </div>
            <div className='container'>
                <div className='sub-menu'>
                    <ul>
                        <h2 className='title'>
                            {menu && menu.category === "1"
                                ? "0~3세"
                                : menu.category === "2"
                                ? "4~7세"
                                : menu.category}
                        </h2>
                        {menu &&
                            menu.subCategory.map((subItem: any) => (
                                <li>
                                    <Link to={subItem.url}>{subItem.name}</Link>
                                </li>
                            ))}
                    </ul>
                </div>

                <div className='list-wrapper'>
                    {bookList.map((item) => (
                        <div className='list-container'>
                            <div className='list-img'>
                                <div className='imgtle'>
                                    <Link to={`/DtlPage/${item.productSeq}`}>
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
                                    <b>가격 : {item.productSalesPrice}</b>원
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BookList;