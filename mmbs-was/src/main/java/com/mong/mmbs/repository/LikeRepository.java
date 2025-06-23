package com.mong.mmbs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mong.mmbs.entity.LikeEntity;

@Repository
public interface LikeRepository extends JpaRepository<LikeEntity, Integer> {

}
