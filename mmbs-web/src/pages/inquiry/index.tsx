import React from "react";
import './index.css'
// import Inquiry from "./pages/inquiry2";

export default function inquiry() {
  return (
    <div>
      <div className="navi_depth2">
        <ul className="navi">
          <li className="home">l홈</li>
          <li>마이페이지</li>
          <li className="is_active">1:1 문의</li>
        </ul>
      </div>
      <div id="container">
        <div className="content">
          <h2 className="mypage_txt">마이페이지</h2>
          <p className="sub_title">1:1 문의</p>
          <form name="searchFrm" id="searchFrm">
            <input type="hidden" name="cPage" value="1" />
            <div className="point_info_box_white product_qna">
              <div className="inner">
                <ul className="select_period_chk">
                  <li>
                    <input
                      type="radio"
                      name="period_chk"
                      id="period_all"
                      value="0"
                      onClick={() => {
                        "$('#MEM_ADV_REG_DT_BEGIN').val('');$('#MEM_ADV_REG_DT_END').val('');";
                      }}
                    />
                    <label>전체</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="period_chk"
                      value="1"
                      checked
                      id="period_01"
                      onClick={() => {
                        "fnDateSet('MEM_ADV_REG_DT_END', 'MEM_ADV_REG_DT_BEGIN', 0, 0, 0, 0, -1, 0,  '-');";
                      }}
                    />
                    <label>1개월</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="period_chk"
                      value="2"
                      id="period_02"
                      onClick={() => {
                        "fnDateSet('MEM_ADV_REG_DT_END', 'MEM_ADV_REG_DT_BEGIN', 0, 0, 0, 0, -2, 0,  '-');";
                      }}
                    />
                    <label>2개월</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="period_chk"
                      value="3"
                      id="period_06"
                      onClick={() => {
                        "fnDateSet('MEM_ADV_REG_DT_END', 'MEM_ADV_REG_DT_BEGIN', 0, 0, 0, 0, -6, 0,  '-');";
                      }}
                    />
                    <label>6개월</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="period_chk"
                      value="4"
                      id="period_12"
                      onClick={() =>
                        "fnDateSet('MEM_ADV_REG_DT_END', 'MEM_ADV_REG_DT_BEGIN', 0, 0, 0, -1, 0, 0,  '-');"
                      }
                    />
                    <label>1년</label>
                  </li>
                </ul>
                <div className="calendar_view">
                  <div>
                    <input
                      type="text"
                      name="MEM_ADV_REG_DT_BEGIN"
                      id="MEM_ADV_REG_DT_BEGIN"
                      value="2022-12-24"
                      readOnly
                    />
                    <button
                      className="datepickr_begin flatpickr-input"
                      onClick={() => false}
                    >
                      <img src="/mmbs/order_calendar_ico.png" alt="달력" />
                    </button>
                    readOnly
                  </div>
                  <span>~</span>
                  <div>
                    <input
                      type="text"
                      name="MEM_ADV_REG_DT_END"
                      id="MEM_ADV_REG_DT_END"
                      value="2023-01-24"
                      readOnly
                    />
                    <button
                      className="datepickr_end flatpickr-input"
                      onClick={() => false}
                    >
                      <img src="/mmbs/order_calendar_ico.png" alt="달력" />
                    </button>
                    readOnly
                  </div>
                </div>
                <select name="MEM_ADV_RPL_YN" id="MEM_ADV_RPL_YN">
                  <option value="">답변상태</option>
                  <option value="Y">답변완료</option>
                  <option value="N">문의접수</option>
                </select>
                <button
                  onClick={() =>
                    "xSubmit($('#searchFrm'), {url: '/pc/mypage/inquiry/list', method: 'GET'});"
                  }
                >
                  조회하기
                </button>
              </div>
            </div>
          </form>
          <p className="btn_top_area mt20">
            <a
              href="javascript:;"
              onClick={() =>
                "xSubmit($('#searchFrm'), {url: '/mmbs/Inquiry2', method: 'GET'});"
              }
              className="btn	btn_gray_line"
            >
              1:1문의 작성
            </a>
          </p>

          <div className="tbl_list_01">
            <table>
              <caption>1:1문의 리스트</caption>
              <colgroup>
                <col style={{ width: "7%" }} />
                <col style={{ width: "20%" }} />
                <col />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">NO</th>
                  <th scope="col">유형</th>
                  <th scope="col">내용</th>
                  <th scope="col">상태</th>
                  <th scope="col">작성일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5}>문의하신 내역이 없습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <a className="nav prev" href="javascript:;">
              <i>
                <em>이전 페이지</em>
              </i>
            </a>{" "}
            <a href="javascript:;" className="on">
              1
            </a>
            <a className="nav next" href="javascript:;">
              <i>
                <em>다음 페이지</em>
              </i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
