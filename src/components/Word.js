import React from 'react';
import { useState } from 'react';
import './Word.css'

function Word(props) {
    const [attempted, setAttempted] = useState(false);

    console.log(props);

    return (
        <React.Fragment>
            <div className='word-container'>
                <div className='tile'>
                </div>
                <div className='tile'>
                </div>
                <div className='tile'>
                </div>
                <div className='tile'>
                </div>
                <div className='tile'>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Word;