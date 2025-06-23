import React from 'react'
import { Routes, Route, Outlet, Link } from "react-router-dom";

import UserPageLeftSide from 'src/layouts/MyPage/MyPageLeftSide';
import MyPageOrderInquiry from "../../pages/MyPageOrderInquiry";
import Cart from "../../pages/Cart";

export default function MyPage() {
  return (
    <>
      <UserPageLeftSide />
      <Routes>
        {/* // component : 주문확인 화면 */}
        <Route path="/orderInquiryPage" element={<MyPageOrderInquiry />} />
        {/* // component : 장바구니 화면 */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}

