package com.mong.mmbs.dto;

import java.util.List;

import com.mong.mmbs.entity.OrderEntity;
import com.mong.mmbs.entity.OrderDetailEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetOrderInquiryResponseDto {

  private OrderEntity order;
  private List<OrderDetailEntity> detailList;
}
