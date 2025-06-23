package com.mong.mmbs.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GiftDto {
	private int orderGiftCode; 
	private String orderNumber;
}
