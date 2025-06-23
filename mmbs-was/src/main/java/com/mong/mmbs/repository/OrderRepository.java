package com.mong.mmbs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mong.mmbs.entity.OrderEntity;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, String>{

	public OrderEntity findByOrderNumber(String orderNumber);

	public List<OrderEntity> findByOrderUserId(String orderUserId);

}
