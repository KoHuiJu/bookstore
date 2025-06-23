import React from "react";
import './index.css'

export default function Inquiry2() {
  return (
    <div>
      <div className="container">
        <div className="content">
          <h2 className="mypage_txt">마이페이지</h2>
          <p className="sub_title">1:1문의</p>
          <p className="star">
            <span>*</span>은 필수입력 사항입니다.
          </p>
          <form name="searchFrm" id="searchFrm" action="/mmbs/Inquiry.html">
            <input type="hidden" name="cPage" value="1" />
            <input
              type="hidden"
              name="MEM_ADV_REG_DT_BEGIN"
              value="2022-12-29"
            />
            <input type="hidden" name="MEM_ADV_REG_DT_END" value="2023-01-29" />
            <input type="hidden" name="MEM_ADV_RPL_YN" value="" />
          </form>
          <form
            name="inquiryFrm"
            id="inquiryFrm"
            encType="multipart/form-data"
            method="post"
          >
            <div className="tbl_write_01">
              <table>
                <caption>1:1문의 등록</caption>
                <colgroup>
                  <col style={{ width: "145px" }}></col>
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="col">
                      문의 유형 <span className="star">*</span>
                    </th>
                    <td>
                      <select
                        name="MEM_ADV_QST_TYPE"
                        id="MEM_ADV_QST_TYPE"
                        className="select_board w_300"
                      >
                        <option value="">문의유형 선택</option>
                        <option value="106">회원정보/멤버십</option>
                        <option value="107">상품</option>
                        <option value="108">주문/결제</option>
                        <option value="356">배송</option>
                        <option value="357">교환/반품/AS</option>
                        <option value="358">취소/환불</option>
                        <option value="612">쿠폰/포인트</option>
                        <option value="359">이벤트/혜택</option>
                        <option value="360">거래증빙서류</option>
                        <option value="361">추가서비스</option>
                        <option value="2199">시스템 및 사이트오류</option>
                        <option value="2200">기타</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">
                      문의내용 <span className="star">*</span>
                    </th>
                    <td>
                      <textarea
                        name="MEM_ADV_CONTENTS"
                        id="MEM_ADV_CONTENTS"
                        cols={30}
                        rows={10}
                        className="w_100"
                        placeholder="최대 1,000자 이내로 작성해주세요"
                      ></textarea>
                      <div style={{ textAlign: "right" }}>
                        <span id="MEM_ADV_CONTENTS_SIZE">0</span>/ 1,000
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">이름</th>
                    <td>
                      입력받을 이름
                      <input
                        type="hidden"
                        name="MEM_MST_MEM_NM"
                        value="장건녕"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">
                      이메일 주소 <span className="star">*</span>
                    </th>
                    <td>
                      <input
                        type="hidden"
                        name="MEM_ADV_MAIL"
                        id="MEM_ADV_MAIL"
                        value=""
                      />
                      <input
                        type="text"
                        name="MEM_ADV_MAIL_ID"
                        id="MEM_ADV_MAIL_ID"
                        className="w_120"
                        value="입력받을 사용자 이메일"
                      />
                      @{" "}
                      <input
                        type="text"
                        name="MEM_ADV_MAIL_DOMAIN"
                        id="MEM_ADV_MAIL_DOMAIN"
                        className="w_120"
                        value="입력받을 사용자 이메일"
                      />
                      &nbsp;
                      <select
                        name="odr_email_sel"
                        id="emailDomain"
                        className="w_120 select_board"
                      >
                        <option value="">::::직접입력::::</option>
                        <option value="daum.net">daum.net</option>
                        <option value="naver.com">naver.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="nate.com">nate.com</option>
                        <option value="hanmail.net">hanmail.net</option>
                        <option value="kakao.com">kakao.com</option>
                        <option value="empas.com">empas.com</option>
                        <option value="hotmail.com">hotmail.com</option>
                      </select>
                      &nbsp;
                      <input
                        type="checkbox"
                        id="MEM_ADV_MAIL_YN"
                        name="MEM_ADV_MAIL_YN"
                      ></input>
                      <label>이메일 답변수신</label>
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">
                      휴대폰 번호 <span className="star">*</span>
                    </th>
                    <td>
                      <select
                        className="select_board w_70"
                        name="MEM_ADV_HP1"
                        id="MEM_ADV_HP1"
                      >
                        <option value="010" selected>
                          010
                        </option>
                        <option value="011">011</option>
                        <option value="016">016</option>
                        <option value="017">017</option>
                        <option value="018">018</option>
                        <option value="019">019</option>
                      </select>{" "}
                      -
                      <input
                        type="text"
                        name="MEM_ADV_HP2"
                        id="MEM_ADV_HP2"
                        value="6409"
                        className="w_70 number"
                        maxLength={4}
                      />{" "}
                      -
                      <input
                        type="text"
                        name="MEM_ADV_HP3"
                        id="MEM_ADV_HP3"
                        value="1959"
                        className="w_70 number"
                        maxLength={4}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">이미지 첨부 </th>
                    <td>
                      <div className="file_wrap">
                        <input
                          type="text"
                          name="file_image"
                          id="file_image"
                          className="w_540"
                        />
                        <input
                          type="file"
                          name="file_attatch"
                          id="file_attatch"
                        />
                        <label className="sch_file">파일찾기</label>
                      </div>
                      <p className="info_txt">
                        ※ 이미지는 10MB 미만의 JPG,PNG, GIF 파일형식으로만
                        업로드 가능 합니다. 파일 등록 수량은 1개만 지원 합니다.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
          <div className="comm_btn_area">
            <button type="button" className="btn btn_gray_line" id="btn_submit">
              등록
            </button>
            <a href="#" className="btn	btn_solid" id="btn_cancel">
              취소
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
