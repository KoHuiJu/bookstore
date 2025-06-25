package com.mong.mmbs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mong.mmbs.entity.UserEntity;
import com.mong.mmbs.repository.UserRepository;

@Service
public class MemberService {

	@Autowired UserRepository userRepository;
	
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
     /** ID 중복 체크 */
    public boolean checkId(String userId) {
        return userRepository.existsByUserId(userId);
    }

    /** 이메일이 존재하는지 확인 **/
    public boolean checkEmail(String userEmail) {
        /* 이메일이 존재하면 true, 이메일이 없으면 false  */
    	System.out.println(userEmail);
        return userRepository.existsByUserEmail(userEmail);
    }
    
    /** 임시 비밀번호 생성 **/
    public String getTmpPassword() {
        char[] charSet = new char[]{ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};

        String pwd = "";

        /* 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 조합 */
        int idx = 0;
        for(int i = 0; i < 10; i++){
            idx = (int) (charSet.length * Math.random());
            pwd += charSet[idx];
        }

        System.out.println("임시 비밀번호 생성");

        return pwd;
    }

    /** 임시 비밀번호로 업데이트 **/
    public boolean updatePassword(String tmpPassword, String userEmail) {
    	
    	System.out.println(tmpPassword);
    	System.out.println(userEmail);

//        String encryptPassword = Encoder.encode(tmpPassword);
    	UserEntity userEntity = userRepository.findByUserEmail(userEmail);
    	if (userEntity == null) return false;
    	userEntity.setUserPassword(passwordEncoder.encode(tmpPassword));
    	userRepository.save(userEntity); // 로직을 구현 / save 저장 
        System.out.println("임시 비밀번호 업데이트");
        return true;
    }
}
