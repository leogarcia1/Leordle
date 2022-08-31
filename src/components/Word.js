import React from 'react';
import { useState } from 'react';
import './Word.css'

function Word({letters}) {
    const [attempted, setAttempted] = useState(false);
    
    return (
        <React.Fragment>
            <div className='word-container'>
                <div className='tile'>
                    {letters[0]}
                </div>
                <div className='tile'>
                    {letters[1]}
                </div>
                <div className='tile'>
                    {letters[2]}
                </div>
                <div className='tile'>
                    {letters[3]}
                </div>
                <div className='tile'>
                    {letters[4]}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Word;