package com.mong.mmbs.entity;

import com.mong.mmbs.dto.OrderDto;

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
@Table(name="orderDetail")
@Entity(name="orderDetail")
public class OrderDetailEntity {
//	주문상세 시퀀스
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int orderDetailSeq;
//	주문번호
	private String orderNumber;
//	제품 아이디
	private int productId;
//	개당 금액
	private int productPrice;
//	제품 이름
  private String productTitle;
//	제품 이미지
  private String productImageUrl;
//	갯수
	private int productCount;

	public OrderDetailEntity(OrderDto dto, OrderEntity order, ProductEntity product) {
		this.productId = dto.getProductId();
		this.productCount = dto.getOrderCount();
		this.orderNumber = order.getOrderNumber();
		this.productPrice = product.getProductPrice();
		this.productTitle = product.getProductTitle();
		this.productImageUrl = product.getProductImageUrl();
	}
}
