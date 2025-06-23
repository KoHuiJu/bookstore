package com.mong.mmbs.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "review")
@Entity(name = "review")
public class ReviewEntity {
//	리뷰 시퀀스
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewId;
//  리뷰 작성자 아이디
	private String reviewWriterId;
//  제품 목록
	private int reviewProductId;
//  별점
    private int reviewScore;
//  리뷰 내용
	private String reviewContent;
//  리뷰 이미지
    private String reviewImage;
//  리뷰 날짜
	private String reviewDatetime;

}
