import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    askId: number;
    askWriter: string;
}

const BoardBox = (props: Props) => {
    const { askId, askWriter } = props;
    console.log('beerBox/props: ', props);
    console.log('beerBox/props.writer: ', askWriter);
    return(
    <>
        <Link
            to = {"/detail"}
            state = {{
                askId,
            }}
        >
            <div>
                <h1>{askWriter}</h1>
            </div>
        </Link>
    </>
    )
}
export default BoardBox;