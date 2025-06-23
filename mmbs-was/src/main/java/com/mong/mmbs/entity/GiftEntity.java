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
@Table(name = "gift")
@Entity(name = "gift")
public class GiftEntity {
//	사은품 코드
	@Id
	private int giftCode;
//  사은품 이름
    private String giftName;
//  사은품 이미지
    private String giftImage;
}