package com.mong.mmbs.dto;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
	private boolean orderUserWhether;
	private String orderGuestPassword;
	private String orderGuestPasswordCheck;
	private String orderUserId;
	private int orderGiftCode;
	@NotBlank
	private String orderUserName;
	@NotBlank
	private String orderUserPhone;
	@NotBlank
	private String orderUserEmail;
	@NotBlank
	private String orderRecieptName;
	@NotBlank
	private String orderRecieptPhone;
	@NotBlank
	private String orderShipAddress;
	@NotBlank
	private String orderShipAddressDetail;
	private String orderShipMessage;

	@NotBlank
	private int productId;
  @NotBlank
  private int orderCount;

	public boolean getOrderUserWhether() {
		return this.orderUserWhether;
	}

}
