package com.mong.mmbs.entity;

import javax.persistence.Entity;
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
@Table(name = "recommend")
@Entity(name = "recommend")
public class RecommendEntity {
//  추천인 테이블 시퀀스
	@Id
	private int recommendSeq;
//  추천인 (추천 당한 사람)
    private String recommendedUserId;
//  추천 (추천한 사람)
    private String recommendingUserId;
    
    public RecommendEntity (String recommendedUserId, String recommendingUserId) {
    	this.recommendedUserId = recommendedUserId;
    	this.recommendingUserId = recommendingUserId;
    }
}