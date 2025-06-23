package com.mong.mmbs.dto;

import java.util.List;

import com.mong.mmbs.entity.OrderDetailEntity;
import com.mong.mmbs.entity.OrderEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderListResponseDto {
  private OrderEntity order;
  private List<OrderDetailEntity> orderDetailList;
}