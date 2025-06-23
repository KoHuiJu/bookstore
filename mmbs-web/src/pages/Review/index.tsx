import React from 'react';
import './style.css'

export default function Review() {
  return (
    <div>
      <div className="navi_depth2">
        <ul className="navi">
          <li className="home">홈</li>
          <li className="is_active">리뷰</li>
        </ul>
      </div>
      <div id="container" className="curation jbFixed">
        <div className="curation_txt">
          <h2>리뷰</h2>
          <p>한 번에 모아보는 사용자 리뷰</p>
        </div>
        <form
          name="reviewFrm"
          id="reviewFrm"
          action="/pc/dispaly/review"
          method="get"
        >
          <input type="hidden" name="cPage" id="cPage" value="" />
          <input type="hidden" name="PHOTO_ONLY" id="PHOTO_ONLY" value="" />
          <div className="review_tit">
            <p className="title">
              <a href="javascript:photo_only('N');">
                전체(<em>0건</em>)
              </a>
              <a href="javascript:photo_only('Y');" className="photo">
                포토(<em>0건</em>)
              </a>
            </p>
            <select
              className="select_default"
              id="SEARCH_ORDER"
              name="SEARCH_ORDER"
            >
              <option value="0">최신등록순</option>
              <option value="1">좋아요순</option>
              <option value="2">별점높은순</option>
              <option value="3">리뷰많은순</option>
            </select>
          </div>
        </form>
        <div className="review">
          <ul>
            <li>
              <div
                className="thumbanil"
                style={{ cursor: "pointer" }}
                onClick={() => "product(0,'000000000005030863')"}
              >
                <img src="" alt="" />
              </div>
              <div className="review_cont">
                <div className="point_wrap">
                  <p className="caption">
                    <a href="">상품 이름</a>
                  </p>
                  <div className="writer">
                    <ul>
                      <li className="user_id">hhhsss51</li>
                      <li className="date">2023-00-00</li>
                    </ul>
                  </div>
                </div>
                <div className="review_txt">
                  <div className="star_wrapper">
                    <ul>
                      <li className="total">
                        <span className="tit">총점</span>
                        <span className="star-rating">
                          <span style={{ width: "100%" }}></span>
                        </span>
                      </li>
                      <li>
                        <span className="tit">기능</span>
                        <span className="star-rating">
                          <span style={{ width: "100%" }}></span>
                        </span>
                      </li>
                      <li>
                        <span className="tit">디자인</span>
                        <span className="star-rating">
                          <span style={{ width: "100%" }}></span>
                        </span>
                      </li>
                      <li>
                        <span className="tit">가격</span>
                        <span className="star-rating">
                          <span style={{ width: "100%" }}></span>
                        </span>
                      </li>
                      <li>
                        <span className="tit">만족도</span>
                        <span className="star-rating">
                          <span style={{ width: "100%" }}></span>
                        </span>
                      </li>
                    </ul>
                    <p className="txt"> </p>
                    <div className="review_text">
                      <br />
                      <p className="word">작성자가 적을 내용</p>
                      <br />
                      <br />
                      <img
                        src=""
                        width="3024"
                        height="4032"
                        className="photo"
                      />
                      <br />
                      <br />
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="pagintion">
          <a className="nav prev" href="">
            <i>
              <em>이전 페이지</em>
            </i>
          </a>
          <a href="javascript:;" className="on">
            1
          </a>
          <a className="num" href="javascript:goPage(2);">
            2
          </a>
          <a className="num" href="javascript:goPage(3);">
            3
          </a>
          <a className="num" href="javascript:goPage(4);">
            4
          </a>
          <a className="num" href="javascript:goPage(5);">
            5
          </a>
          <a className="nav next" href="javascript:goPage(6);">
            <i>
              <em>다음 페이지</em>
            </i>
          </a>
        </div>
      </div>
    </div>
  );
}
