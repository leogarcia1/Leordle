import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Word from './components/Word';
import words from './words.txt'

function App() {
  // letters of current word - 5 letters
  const [letters, setLetters] = useState([[], [], [], [], [], []]);

  // current word - 6 words
  const [currentWord, setCurrentWord] = useState(0);

  // word that the user is trying to guess
  const [winningWord, setWinningWord] = useState([]);


  /**
   * This useEffect hook gets a random word from the text file to be the winning word.
   */
  useEffect(() => {
    fetch(words)
      .then(response => response.text())
        .then(text => {
                      const words = text.split(/\r?\n/);  // array of words
                      const randomWord = words[Math.floor(Math.random() * words.length)];
                      setWinningWord(randomWord.split(""));
                    })
    },[])

  /* 
  This useEffect hook is used to listen for when the user types a key,
  and updates the state if it's a valid key.
  */
  useEffect(() => {
    const keyDownHandler = event => {
      console.log("Winning Word: ", winningWord);
      // if user inputted a letter
      if(isLetter(event.key)) {
        // check if word is not full
        if(letters[currentWord].length !== 5){
          let newLetters = [...letters];
          newLetters[currentWord].push(event.key.toUpperCase());
          setLetters([...newLetters]);
        }
      }

      // if user inputted Enter
      else if (event.key === "Enter") {
        // check if user filled in all letters
        if(letters[currentWord].length === 5){
          setCurrentWord(currentWord + 1);

          // check if game is over
          if(currentWord === 6) {
            // game over
          }
        } 
      }

      // if user inputted a back space
      else if (event.key === "Backspace") {
        // check if user has anything to remove
        if(letters[currentWord].length !== 0) {
          let newLetters = [...letters];
          newLetters[currentWord].pop();
          setLetters([...newLetters]);
        }
      }
    };

    // listens for when user types a key
    window.addEventListener('keydown', keyDownHandler);

    // clean up event listener
    return () => {window.removeEventListener('keydown', keyDownHandler);};
  }, [currentWord, letters, winningWord]);


  /* Checks if users input was a letter */
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
        <Word letters={letters[0]}/>
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
