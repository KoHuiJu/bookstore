package com.mong.mmbs.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data // @Getter @Setter
@Table(name = "board")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Board {
    @Id @GeneratedValue
    private Long ask_id;
    private String ask_writer;
    private String ask_sort;
    private String ask_content;
    private String ask_datetime;
    private int ask_status;
    private String ask_reply;

    public Board(Long ask_id, String ask_writer, String ask_sort,
    		String ask_content, String ask_datetime, int ask_status, 
    		String ask_reply ) {

        this.ask_id = ask_id;
        this.ask_writer = ask_writer;
        this.ask_sort = ask_sort;
        this.ask_content = ask_content;
        this.ask_datetime = ask_datetime;
        this.ask_status = ask_status;
        this.ask_reply = ask_reply;
    }
}