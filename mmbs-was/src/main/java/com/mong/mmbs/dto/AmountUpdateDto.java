package com.mong.mmbs.dto;

import java.util.List;
import com.mong.mmbs.entity.CartEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AmountUpdateDto {
	private List<CartEntity> selectCartList;
}
