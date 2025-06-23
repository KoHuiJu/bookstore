package com.mong.mmbs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mong.mmbs.entity.RecommendEntity;

@Repository
public interface RecommendRepository extends JpaRepository<RecommendEntity, Integer> {

}
