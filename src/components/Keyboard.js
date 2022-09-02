import React from 'react';
import './Keyboard.css'

/**
 * This functional component is for the keyboard/letters at the bottom of the page.
 * alphabet = object that keeps track of keyboard status
 */
function Keyboard({alphabet}) {

    const keyRows = [];
    for (const letter in alphabet) {
        keyRows.push(
            <div key={letter} className={'key ' + (alphabet[letter])}>
                <span>{letter}</span>
            </div>
        );
    }

    return(
        <React.Fragment>
            <div className='keyboard-container'>
                {keyRows}
            </div>
        </React.Fragment>
    );
}

export default Keyboard;