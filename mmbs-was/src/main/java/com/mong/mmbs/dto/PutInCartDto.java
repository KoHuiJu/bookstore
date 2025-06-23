package com.mong.mmbs.dto;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PutInCartDto {
	
	@NotBlank
	private String cartUserId;
	// 지금 cartUserId에는user.userId 값을 들고있음
	@NotBlank
	private int cartProductId;
	// 지금 cartProductId에는 productSeq 값을 들고있음
	@NotBlank
	private int cartProductAmount;
}