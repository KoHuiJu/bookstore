import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./layouts/header";
import Main from "./layouts/main";
import Navigation from "./layouts/navigation";
import Footer from "./layouts/footer";
import axios from "axios";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DtlPage from "./pages/DetailPage";
import UserUpdate from "./pages/UserUpdate";
import MyPageOrderInquiry from "./pages/MyPageOrderInquiry";
import 국내도서 from "./pages/bookList/category/국내도서";
import OrderPage from "./pages/Payment";
import FindId from "./pages/FindId";
import Cart from "./pages/Cart";
import FindPassword from "./pages/FindPassword/idex";
import SearchAdd from "./pages/Search";
import Review from "./pages/Review"
import ResetPassword from "./pages/ResetPassword"
import UserAskList from './pages/UserAsk/UserAskList';
import UserAskWrite from './pages/UserAsk/UserAskWrite';
import UserAskUpdate from './pages/UserAsk/UserAskUpdate';
import Withdraw from './pages/Withdraw';

import { useUserStore } from "./stores";
import { useCookies } from "react-cookie";

// component : Main Component //+
// descriptiong : 전체 루트 컴포넌트 //
function App() {
    const [connection, setConnection] = useState<string>("");
    const { user, setUser } = useUserStore();
    const [ cookies, setCookies ] = useCookies();
    const connectionTest = () => {
        axios
            .get("http://localhost:4080/")
            .then((response) => {
                setConnection(response.data);
            })
            .catch((error) => {
                setConnection(error.message);
            });
    };
    useEffect(() => {
        connectionTest();
    }, []);

    useEffect(() => {
      if (cookies.token && !user) {
        axios('http://localhost:4080/api/user/', { headers: { Authorization: `Bearer ${cookies.token}` } }).then((response) => {
          const responseData = response.data.data;
          setUser(responseData);
        }).catch((error) => {
          setCookies('token', new Date());
        })
      }
      if (!cookies.token && user) {
        setUser(null);
      }
    }, [cookies.token, user])

    return (
      <>
        <Header />
        <Navigation />
        
        <Routes>
          {/* // component : Main 화면 */}
          <Route path="/" element={<Main />} />
          {/* // component : 회원가입 화면 */}
          <Route path="/signIn" element={<SignIn />} />
          {/* // component : 로그인 화면 */}
          <Route path="/signup" element={<SignUp />} />
          {/* // component : 마이페이지 화면 */}

          {/* // component : 회원정보수정 화면 */}
          <Route path="/userUpdate" element={<UserUpdate />} />
          {/* // component : 회원 문의 화면 */}
          <Route path="/userAskList" element={<UserAskList />} />
          <Route path="/userAskWrite" element={<UserAskWrite />} />
          <Route path="/userAskUpdate/:askId" element={<UserAskUpdate />} />
          {/* // component : 회원 리뷰 화면 */}
          <Route path="/review" element={<Review />} />
          {/* // component : 회원 주문 조회 화면 */}
          <Route path="/practice" element={<MyPageOrderInquiry />} />
          {/* <Route path="/myPageOrderInquiry" element={<MyPageOrderInquiry />} /> */}
          {/* // component : 회원 탈퇴 화면 */}
          <Route path="/withdraw" element={<Withdraw />} />
          {/* // component : 도서 목록 화면 */}
          <Route
            path="/bookList/:productGenre/:productSubGenre"
            element={<국내도서 />}
          />
          <Route path="/dtlpage/:productSeq" element={<DtlPage />} />
          {/* // component : 주문 결제 화면 */}
          <Route path="/orderPayment" element={<OrderPage />} />
          {/* // component : 장바구니 화면 */}
          <Route path="/cart" element={<Cart />} />
          {/* // component : 아이디/비밀번호 찾기/비밀번호 초기화 화면 */}
          <Route path="/findId" element={<FindId />} />
          <Route path="/findPassword" element={<FindPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />

          {/* // component : 검색 결과 화면 */}
          <Route path="/search/:productTitle" element={<SearchAdd />} />
        </Routes>

        <Footer />
      </>
    );
}
export default App;