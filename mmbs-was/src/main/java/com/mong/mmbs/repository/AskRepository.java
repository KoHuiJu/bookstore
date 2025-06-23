package com.mong.mmbs.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mong.mmbs.entity.AskEntity;

@Repository
public interface AskRepository extends JpaRepository<AskEntity, Integer>{

  public List<AskEntity> findByAskWriter(String UserId);

  public AskEntity findByAskId(int askId);

  public AskEntity deleteByAskId(int askId);

  // 문의 조회하기
  public List<AskEntity> findByAskWriterAndAskDatetimeGreaterThanEqualAndAskSortContainsAndAskStatusContainsOrderByAskDatetimeDesc(String userId, String askDatetime, String askSort, String askStatus);

}
