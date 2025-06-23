import { click } from '@testing-library/user-event/dist/click';
import React from 'react'
import './style.css'

export default function pw_search() {

    const requestCertification = () => {}

return (
    <form id="findPasswordForm" method="post">
        <div className="password_navi">
            <ul className="navi">
                <li className="home">홈</li>
                <li>로그인</li>
                <li className="is_active">비밀번호 / 비회원 주문번호 찾기</li>
            </ul>
        </div>
        <div id="password_con" className="member">
            <div className="sub_content">
                <h2 className="mypage_txt">로그인</h2>
                <div className="find">
                    <div className="login_txt">
                        <p className="sub_tit">비밀번호 찾기 / 비회원 주문번호 찾기</p>
                        <div className="box_find">
                            <ul className="find_tab">
                                <li><a href="">비회원 주문번호 찾기</a></li>
                                <li className="on"><a href="">비밀번호 찾기</a></li>
                            </ul>
                            <div className="find_wrap">
                                <div className="tab_content pw">
                                    <div className="input_box">
                                        <input type="hidden" name="chk_sns_code" id="chk_sns_code" value="0"/>
                                        <p className="find_tit">
                                            휴대폰으로 찾기
                                        </p>
                                        <span className="txt">
                                            가입 당시 입력한 이메일(Email)을 통해
                                            임시 비밀번호를 발급 받을 수 있습니다.
                                            <br/>
                                            비밀번호는 고객님의 소중한 개인정보로
                                            <br/>
                                            <strong>고객센터에서 안내</strong>
                                            또는
                                            <strong>수정이 불가</strong>
                                            합니다.
                                        </span>
                                        <ul>
                                            <li className="name">
                                                <span>이름</span>
                                                <div className="wrapper">
                                                    <input type="text" name="MEM_MST_MEM_NM" id="MEM_MST_MEM_NM"
                                                        placeholder="홍길동"/>
                                                </div>
                                            </li>
                                            <li className="name">
                                                <span>아이디</span>
                                                <div className="wrapper">
                                                    <input type="text" name="MEM_MST_MAIL" id="MEM_MST_MAIL"
                                                        placeholder="ID를 입력하세요."/>
                                                </div>
                                            </li>
                                            <li className="phone">
                                                <span>이메일(Email)</span>
                                                <div className="wrapper">
                                                    <input type="text" name="MEM_MST_KCB_PHONENO_01"
                                                        id="MEM_MST_KCB_PHONENO_01" className="text number"/>
                                                    <select className="select_option" name="MEM_MST_KCB_PHONENO_02"
                                                        id="MEM_MST_KCB_PHONENO_02">
                                                        <option value={0}>선택</option>
                                                        <option value={1}>@naver.com</option>
                                                        <option value={2}>@gmail.com</option>
                                                        <option value={3}>@nate.com</option>
                                                        <option value={4}>@yahoo.com</option>
                                                    </select>
                                                </div>
                                            </li>
                                            <li>
                                                <span></span>
                                                <div className="wrapper align_r">
                                                    <input type="button" className="btn_red"
                                                        onClick={() => requestCertification()} value="이메일 발송"/>
                                                </div>
                                            </li>
                                        </ul>
                                        <span className="info mt30">
                                            본인 인증 시 제공되는 정보는 인증 이외의
                                            용도로 이용 또는 저장하지 않습니다.
                                        </span>
                                        <span className="info">
                                            인증문자가 발송되지 않을 경우 <strong>몽몽책방</strong>
                                            연락처가 스팸으로 분류되어
                                            <br/>
                                            있는지 확인하세요.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    );
}