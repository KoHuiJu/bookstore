import React, {useEffect, useState} from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CreateBoard = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    let navigate = useNavigate(); 

    const resetInput = () => {
        setContent("");
        setTitle("");
    }
    const handleInputClick = async (e: any) => {
        console.log('writeBoard');
        const request_data = {title: title, content: content};
        console.log('req_data: ', request_data);
        try{
            let response = await axios({
            method: 'post',
            url: '/api/create-board',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(request_data)
            });
            console.log('writeBoard/response: ', response);
            console.log('writeBoard/response.status: ', response.status);
            if(response.status >= 200 && response.status < 300) {
            alert("게시글이 정상적으로 생성되었습니다.");
            }
            if(response.status >= 400) {
            alert("게시글 생성이 정상적으로 되지 않았습니다.");
            }
            navigate("/", {});
        } catch (err) {
            console.log('CreateBoard/handleInput/err: ', err);
            resetInput();
        }
    }
    return (
        <>
            <label>제목</label><br/>
            <input type="text" placeholder="제목을 입력해주세요" onChange={(e) => setTitle(e.target.value) } value={title} /><br/><br/>
            <label>내용</label><br/>
            <textarea id='textarea_content' placeholder="내용을 입력해주세요" onChange={(e) => setContent(e.target.value) } value={content} /><br/>
            <input type="button" value="게시글 생성" onClick={handleInputClick}/>
        </>
    )
}

export default CreateBoard;