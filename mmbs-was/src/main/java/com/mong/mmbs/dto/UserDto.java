package com.mong.mmbs.dto;

import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    @NotBlank
    private String userId;
    
    @NotBlank
    private String userPassword;        // 업데이트 시 비밀번호 변경이 필요 없으면 null로 둘 수 있음
    
    private String userPasswordCheck;   // 회원가입 시 검증용, 업데이트 때는 안 써도 됨
    
    @NotBlank
    private String userName;
    
    @NotBlank
    private Integer roleId;
    
    @NotBlank
    private String userPhone;
    
    @NotBlank
    private String userEmail;
    
    @NotBlank
    private String userAddress;
    
    @NotBlank
    private String userAddressDetail;
    
    private String userKidBirth;
    
    private String recommendedUserId;   // 회원가입 때만 필요할 수도 있음
}
