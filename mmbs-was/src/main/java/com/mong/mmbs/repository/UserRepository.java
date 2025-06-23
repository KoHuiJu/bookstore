package com.mong.mmbs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mong.mmbs.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String>{
	
	public boolean existsByUserEmail(String userEmail);
	
	public UserEntity findByUserEmail(String userEmail);
	
	public UserEntity findByUserEmailAndUserName(String userEmail, String userName);
	
	public UserEntity findByUserIdAndUserNameAndUserEmail(String userId,String userName,String userEmail);
	
	public boolean existsByUserIdAndUserPassword(String userId, String userPassword);
	
	public UserEntity findByUserId(String UserId);

	public UserEntity findPasswordByUserId(String UserId);

	public boolean existsByUserIdAndUserEmail(String userId, String userEmail);

	public UserEntity deleteByUserId(String UserId);

}
