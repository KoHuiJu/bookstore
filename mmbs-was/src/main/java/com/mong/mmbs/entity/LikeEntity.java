package com.mong.mmbs.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="like")
@Entity(name="like")
public class LikeEntity {
//	좋아요 시퀀스
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int likeSeq;
//	좋아요한 제품 아이디
	private int likeProductId;
//	좋아요한 유저의 아이디
	private String likeUserId;
}
