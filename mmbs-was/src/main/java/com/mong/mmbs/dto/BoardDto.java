package com.mong.mmbs.dto;

import com.mong.mmbs.entity.Board;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BoardDto {
    private Long ask_id;
    private String ask_writer;
    private String ask_sort;
    private String ask_content;
    private String ask_datetime;
    private int ask_status;
    private String ask_reply;

    public BoardDto(Board board) {
        this.ask_id = board.getAsk_id();
        this.ask_writer = board.getAsk_writer();
        this.ask_sort = board.getAsk_sort();
        this.ask_content = board.getAsk_content();
        this.ask_datetime = board.getAsk_datetime();
        this.ask_status = board.getAsk_status();
        this.ask_reply = board.getAsk_reply();
    }
}