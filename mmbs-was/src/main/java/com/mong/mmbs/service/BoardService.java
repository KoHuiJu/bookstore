package com.mong.mmbs.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mong.mmbs.entity.Board;
import com.mong.mmbs.repository.BoardRepository;

@Service
public class BoardService {

    @Autowired BoardRepository boardRepository; // Auto wired로 스프링 빈에 등록

    public List<Board> findBoards() {
        return boardRepository.findAll();
    }
    public Board findOne(Long boardId){
        return boardRepository.findById(boardId).orElseThrow(NullPointerException::new);
    }
    @Transactional
    public void create(Board board) {
        boardRepository.save(board);
    }

    @Transactional
    public void update(Long ask_id, String ask_writer, String ask_sort, String ask_content,
    		String ask_datetime, int ask_status, String ask_reply){
        Board board = boardRepository.findById(ask_id).orElseThrow(NullPointerException::new);
        board.setAsk_writer(ask_writer);
        board.setAsk_sort(ask_sort);
        board.setAsk_content(ask_content);
        board.setAsk_datetime(ask_datetime);
        board.setAsk_status(ask_status);
        board.setAsk_reply(ask_reply);
    }
    @Transactional
    public void delete(Board board) {
        boardRepository.delete(board);
    }
}
