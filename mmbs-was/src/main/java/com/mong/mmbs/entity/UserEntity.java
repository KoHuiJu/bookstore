package com.mong.mmbs.entity;

import java.text.SimpleDateFormat;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import com.mong.mmbs.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="user")
@Entity(name="user")
public class UserEntity {
    @Id
    private String userId;
    private String userPassword;
    private String userEmail;
    private String userAddress;
    private String userAddressDetail;
    private String userName;
    private int roleId;
    private String userPhone;
    private String userKidBirth;
    private String userSignUpDate;
    private String userWithdraw;

    // 회원가입 생성자
    public UserEntity(UserDto dto) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        this.userId = dto.getUserId();
        this.userPassword = dto.getUserPassword();
        this.userEmail = dto.getUserEmail();
        this.userAddress = dto.getUserAddress();
        this.userAddressDetail = dto.getUserAddressDetail();
        this.userName = dto.getUserName();
        this.roleId = dto.getRoleId();
        this.userPhone = dto.getUserPhone();
        this.userKidBirth = dto.getUserKidBirth();
        this.userSignUpDate = dateFormat.format(new Date());
    }

    // 업데이트 메서드 (선택적 필드 업데이트 가능)
    public void updateFromDto(UserDto dto) {
        if(dto.getUserPassword() != null && !dto.getUserPassword().isEmpty()) {
            this.userPassword = dto.getUserPassword();
        }
        if(dto.getUserEmail() != null) {
            this.userEmail = dto.getUserEmail();
        }
        if(dto.getUserAddress() != null) {
            this.userAddress = dto.getUserAddress();
        }
        if(dto.getUserAddressDetail() != null) {
            this.userAddressDetail = dto.getUserAddressDetail();
        }
        if(dto.getUserName() != null) {
            this.userName = dto.getUserName();
        }
        if(dto.getRoleId() != 0) {
            this.roleId = dto.getRoleId();
        }
        if(dto.getUserPhone() != null) {
            this.userPhone = dto.getUserPhone();
        }
        if(dto.getUserKidBirth() != null) {
            this.userKidBirth = dto.getUserKidBirth();
        }
        // userWithdraw는 보통 별도 로직으로 관리
    }
}
