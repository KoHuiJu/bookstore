import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores';
import "./cart.css";

export default function Cart() {

    const [cartList, setCartList] = useState<any[]>([]);
    const [selectCart, setSelectCart] = useState<number[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [expectedPrice, setExpectedPrice] = useState<number>(0);
    const [flag, setFlag] = useState<boolean>(true);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const [cookies] = useCookies();
    const navigator = useNavigate();

    const deleteCartList = (cartId: number) =>{
        
        const data = { cartId };

        const token = cookies.token;
        
        axios
        .post("http://localhost:4080/api/cart/cartDelete", data, {headers: {Authorization: `Bearer ${token}`}})
        .then((response)=>{
            const data = response.data;
            if(data.result){
                const list = data.data;
                setCartList(list);
            }
        })
        .catch((error) => {"qweee" });
      };

    const saveCartList = () => {

        const selectCartList: any[] = []
        selectCart.forEach((selected) => {
            cartList.forEach((cart) => {
                if(cart.cartId === selected) selectCartList.push(cart);
            })
        })
        
        const data = {
            selectCartList
          };
        // const changeAmount=()=>{
        //     setCartProductAmount
        // }

        const token = cookies.token;

        axios
        .post("http://localhost:4080/api/cart/cartAmountUpdate", data, {headers: {Authorization: `Bearer ${token}`}})
        .then((response)=>{
            const data = response.data;
            if(data.result){
                alert('성공')
                console.log(data)
                navigator('/orderPayment')
                
            }
        })
        .catch((error) => {"qweee" });
      };
    

    const setSelectCartItem = (cartId: number) => {
        let totalCount = 0;
        const tmp: number[] = [];
        if (selectCart.findIndex((element) => element === cartId) === -1) {
            selectCart.forEach((item) => {
                tmp.push(item);
            })
            tmp.push(cartId);
        }
        else {
            selectCart.forEach((item) => {
                if (item !== cartId) tmp.push(item);
            })
        }
        setSelectCart(tmp);
        let total = 0;
        cartList.forEach((cartItem) => {
            if (tmp.findIndex((element) => element === cartItem.cartId) !== -1) {
                total += cartItem.cartProductPrice * cartItem.cartProductAmount;
                totalCount += cartItem.cartProductAmount;
            }
        })
        const expected = total < 30000 ? total + 3000 : total;
        setTotalAmount(totalCount);
        setTotalPrice(total);
        setExpectedPrice(expected);
    }

    const getCartList = () => {

        console.log(cookies.token)

        axios.post('http://localhost:4080/api/cart/showInCart', {}, {
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        }).then((response) => {
            const list = response.data.data;
            setCartList(list);
        })
    }

    const addAmount = (cartId: number, num: number) => {
        let totalCount = 0;
        cartList.forEach((cartItem) => {
            if (cartItem.cartId === cartId) {
                if (!(cartItem.cartProductAmount === 1 && num === -1)){
                    cartItem.cartProductAmount += num;
                }
            }
        })

        let total = 0;
        cartList.forEach((cartItem) => {
            if (selectCart.findIndex((element: any) => element === cartItem.cartId) !== -1) { total += cartItem.cartProductPrice * cartItem.cartProductAmount; totalCount += cartItem.cartProductAmount; }
        })
        const expected = total < 30000 ? total + 3000 : total;
        
        setTotalPrice(total);
        setExpectedPrice(expected);
        setCartList(cartList);
        setTotalAmount(totalCount);
        setFlag(!flag);
    }





    useEffect(() => {
        getCartList();
    }, [])

    return (

        <div>
            <h1 className="cart-txt">장바구니
                <div className="title-bottom">
                </div>
            </h1>
            <ul className="cart-active-tap" >
                <li className="active-tap">
                    <span>도서상품( <em>{totalAmount}</em> )
                    </span>
                </li>


            </ul>
            <div className="cart-info-txt">
                <span>도서 상품</span>
                <em></em>
                <strong>{totalAmount}건</strong>
                <span className="cart-info-txt2">문화비 소득공제 가능 상품</span>
            </div>
            <div className="table-order">
                <table className="table">
                    <caption>장바구니 상품</caption>
                    <colgroup>
                        <col style={{ width: '72px' }} />
                        <col style={{ width: '140px' }} />
                        <col />
                        <col style={{ width: '170px' }} />
                        <col style={{ width: '170px' }} />
                        <col style={{ width: '190px' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th></th>
                            <th colSpan={2}>상품정보</th>
                            <th>이미지</th>
                            <th>금액</th>
                            <th>수량</th>
                            <th>결제금액</th>
                            <th>지우기</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='showInFo'>
                        {cartList.length === 0 && (
                            <tr>
                                <td className="text-no-data" colSpan={8} >
                                    <span className="no-data">장바구니에 담긴 상품이 없습니다.</span>

                                </td>
                            </tr>
                        )}
                        {cartList.map((cartItem) => (
                            <tr>
                                <td><input type="checkBox" onChange={() => setSelectCartItem(cartItem.cartId)} /></td>
                                <td colSpan={2}>{cartItem.cartProductName}</td>
                                <td><div><img src={cartItem.cartProductImage} width="80%" height="100px" /></div></td>
                                <td>{cartItem.cartProductPrice}원</td>
                                <td><button className='amountButton' onClick={() => addAmount(cartItem.cartId, 1)}>△</button> {cartItem.cartProductAmount }  권 <button onClick={() => addAmount(cartItem.cartId, -1)}>▽</button></td>
                                <td>{cartItem.cartProductPrice * cartItem.cartProductAmount}원</td>
                                <td><button onClick={()=>deleteCartList(cartItem.cartId)}>❎</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="cart-total-area">
                <div className="inner">
                    <div className="cart-box">
                        <dl>
                            <dt>총 상품가격</dt>
                            <dd>
                                <span id="total-product-price" className="price-black">
                                    <strong>{totalPrice}</strong>원
                                </span>
                            </dd>
                        </dl>
                    </div>
                    <div className="cart-box-img">
                        <img src="https://www.woongjinbooks.com/static/pc/images/sub/review_order01.png" alt="plus" />
                    </div>
                    <div className="cart-box-shipping">
                        <dl>
                            <dt>예상 비용</dt>
                            <dd>
                                <p><span id="delivery-price" className="price-black"><strong>{expectedPrice}</strong>원</span></p>
                                <p><span className="note-txt">(30,000원 이상 무료배송)</span></p>
                            </dd>
                        </dl>
                    </div>
                    <div className="cart-box-img">
                        <img src="https://www.woongjinbooks.com/static/pc/images/sub/review_order02.png
                    " alt="equlas" />
                    </div>
                    <div className="cart-box-total">
                        <dl>
                            <dt>총 결제 예상 금액</dt>
                            <dd>
                                <p id="total-payment-price" className="txt-red"><strong>{expectedPrice}</strong>원</p>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
            <p id="cart-info-txt" className="cart-info-txt-comment"></p>
            <div className="order-botton-area">
                <a href="" className="botton-keep-shopping">계속 쇼핑하기</a>
                <button className="botton-solid" onClick={()=>saveCartList()}>구매하기</button>
            </div>
        </div>

    )
}
