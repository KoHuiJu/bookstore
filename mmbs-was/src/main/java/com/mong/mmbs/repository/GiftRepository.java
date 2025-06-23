package com.mong.mmbs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mong.mmbs.entity.GiftEntity;

@Repository
public interface GiftRepository extends JpaRepository<GiftEntity, Integer>{
	public GiftEntity findByGiftCode(int giftCode);

}
