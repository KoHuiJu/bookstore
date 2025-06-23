package com.mong.mmbs.service;

import org.springframework.stereotype.Service;

import com.mong.mmbs.dto.ResponseDto;
import com.mong.mmbs.dto.UserDto;
import com.mong.mmbs.entity.UserEntity;
import com.mong.mmbs.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    // 스프링 4.3 이상부터는 생성자가 딱 1개 있으면 @Autowired가 없어도 자동 주입됨
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseDto<?> getUser(String userId) {
        UserEntity user = null;
        try {
            user = userRepository.findByUserId(userId);
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed("Database Error");
        }

        if (user != null) user.setUserPassword(""); // 비밀번호 숨김 처리

        return ResponseDto.setSuccess("result", user);
    }

    public ResponseDto<?> userUpdate(UserDto dto) {
        UserEntity user = null;

        try {
            user = userRepository.findByUserId(dto.getUserId());
            if (user == null) return ResponseDto.setFailed("Does Not Exist User");
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed("Failed");
        }

        user.updateFromDto(dto);

        try {
            userRepository.save(user);
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed("Failed");
        }

        return ResponseDto.setSuccess("Success", user);
    }

    public ResponseDto<?> userDelete(String userId, UserDto dto) {
        try {
            if (!userRepository.existsByUserIdAndUserEmail(userId, dto.getUserEmail())) {
                return ResponseDto.setFailed("UserId Or UserEmail Does Not Exist");
            }

            UserEntity userEntity = userRepository.findByUserId(userId);
            if (userEntity == null) return ResponseDto.setFailed("User Not Found");

            userRepository.delete(userEntity);
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.setFailed("Failed");
        }

        return ResponseDto.setSuccess("Success", null);
    }
}
