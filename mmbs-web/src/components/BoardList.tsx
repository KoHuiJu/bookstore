import React from "react";
import BoardBox from "./BoardBox/BoardBox";


const BoardList = (props: any) => {
    console.log('boerdList/props: ', props);
    console.log('boerdList/props.data: ', props.data);
    return (
    <>
    {Array.isArray(props.data) ?
        props.data.map((i : any) => (
            <BoardBox
                key = {i.id}
                askId = {i.id}
                askWriter = {i.title}
            />
        ))
        : null}
    </>
    );
};
export default BoardList;