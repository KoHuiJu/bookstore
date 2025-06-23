package com.mong.mmbs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mong.mmbs.entity.CartEntity;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Integer>{

	public CartEntity findByCartId(int cartId);
	public CartEntity findByCartUserIdAndCartProductId(String cartUserId, int cartProudctId);
	
	public List<CartEntity> findByCartUserId(String cartUserId);
	public boolean existsByCartUserIdAndCartProductId(String cartUserId, int cartProudctId);
	public void deleteAllByCartUserIdAndCartProductId(String cartUserId, int cartProudctId);
	
}
