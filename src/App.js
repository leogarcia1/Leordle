import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Word from './components/Word';

function App() {
  // letters of current word - 5 letters
  const [letters, setLetters] = useState([[], [], [], [], [], []]);

  // current word - 6 words
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const keyDownHandler = event => {
      console.log('User pressed: ', event.key);

      if(isLetter(event.key)) {
        // check if word is not full
        if(letters[currentWord].length !== 5){
          setLetters(letters[currentWord].push(event.key));
          console.log('Letters ', letters);
        }
      }
      else if (event.key === "Enter") {
        setCurrentWord(currentWord + 1);
        console.log("Current word: ", currentWord);
      }
      else if (event.key === "Backspace") {
        setLetters(letters[currentWord].pop());
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    // clean up event listener
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  return (
    <React.Fragment>
    {/* HEADER */}
    <div className='header'>
      <span className='title'>LEORDLE</span>
    </div>

    <div className='game-container'>
      {/* BOARD */}
      <div className='board'>
        <Word letters={letters}/>
        <Word letters={letters[1]}/>
        <Word letters={letters[2]}/>
        <Word letters={letters[3]}/>
        <Word letters={letters[4]}/>
        <Word letters={letters[5]}/>
      </div>
    </div>

    </React.Fragment>
  );
}

export default App;
