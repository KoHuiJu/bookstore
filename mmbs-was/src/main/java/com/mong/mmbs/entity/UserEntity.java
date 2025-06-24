package com.mong.mmbs.entity;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.mong.mmbs.dto.SignUpDto;
import com.mong.mmbs.dto.UserUpdateDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="user")
@Entity(name="user")
public class UserEntity {
//	아이디
	@Id
	private String userId;
//	비밀번호
	private String userPassword;
//	이메일
	private String userEmail;
//	주소
	private String userAddress;
//	상세 주소
	private String userAddressDetail;
//	이름
	private String userName;
//	전화번호
	private String userPhone;
//	아이 생일
	private String userKidBirth;
//	가입 날짜
	private String userSignUpDate;
//	탈퇴 날짜
	private String userWithdraw;
	
	public UserEntity(SignUpDto dto) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		
		this.userId = dto.getUserId();
		this.userPassword = dto.getUserPassword();
		this.userEmail = dto.getUserEmail();
		this.userAddress = dto.getUserAddress();
		this.userAddressDetail =dto.getUserAddressDetail();
		this.userName = dto.getUserName();
		this.userPhone = dto.getUserPhone();
		this.userKidBirth = dto.getUserKidBirth();
		this.userSignUpDate = dateFormat.format(new Date());
	}
	
	public void setUpdateUser(UserUpdateDto dto) {
		
		this.userAddress = dto.getUserAddress();
		this.userAddressDetail =dto.getUserAddressDetail();
		this.userName = dto.getUserName();
		this.userPhone = dto.getUserPhone();
		this.userKidBirth = dto.getUserKidBirth();
	}
}