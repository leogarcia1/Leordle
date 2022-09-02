import React, { useEffect } from 'react';
import './Word.css';
import { Status } from '../App';

/**
 * This functional component will be for each word that is guessed.
 * wordNumber = the unique id for each word guess
 * letters = array of letters currently on board
 * winningWord = array of letters of the correct word
 * currentWord = id of word guess that game is currently on
 * alphabet = object that keeps track of keyboard status
 * setAlphabet = setState of parent component for alphabet
 */
function Word({wordNumber, letters, winningWord, currentWord, alphabet, setAlphabet}) {

    let obj = alphabet; // this variable is used to update alphabet which is in the parent component

    /* This useEffect will update alphabet in the parent component when it needs to be changed. */
    useEffect(() => {
        setAlphabet(obj);
    }, [obj, setAlphabet])

    function WordContainer() {
        // check if user is currently on this row, or not on the row yet
        if(currentWord <= wordNumber) {
            const tileRows = [];
            for (let i = 0; i < 5; i++) {
                tileRows.push(
                    <div key={i} className={'tile ' + (letters[i] === undefined ? '' : 'letter-typed')}>
                        <span className='letter'>{letters[i]}</span>
                    </div>
                );
            }
            return(             
                <div className='word-container'>
                    {tileRows}
                </div>
                );
        }
        // if user already guessed this row
        else{
            console.log(obj);
            console.log(alphabet);
            const tileRows = [];
            for (let i = 0; i < 5; i++) {
                let spotClassName = 'letter-no-spot';
                obj[letters[i]] = Status.NoSpot;
                // check if letter is in winning word
                if(winningWord.includes(letters[i])) {
                    if(letters[i] === winningWord[i]) {
                        spotClassName = 'letter-correct-spot';
                        obj[letters[i]] = Status.CorrectSpot;
                    }
                    else {
                        spotClassName = 'letter-wrong-spot';
                        if(alphabet[letters[i]] !== Status.CorrectSpot) {
                            obj[letters[i]] = Status.WrongSpot;
                        }
                    }
                }
                tileRows.push(
                    <div key={i} className={'tile ' + (spotClassName)}>
                        <span className='letter'>{letters[i]}</span>
                    </div>
                );
            }
            return(             
                <div className='word-container'>
                    {tileRows}
                </div>
                );
        }
    }

    return (
        <React.Fragment>
            <WordContainer/>
        </React.Fragment>
    );
}

export default Word;