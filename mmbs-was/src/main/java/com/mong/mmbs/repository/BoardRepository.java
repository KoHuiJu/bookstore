package com.mong.mmbs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mong.mmbs.entity.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {
	
}
