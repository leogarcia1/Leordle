import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Keyboard from './components/Keyboard';
import Word from './components/Word';
import words from './words.txt'

export const Status = {
  CorrectSpot: "key-correct-spot",
  WrongSpot: "key-wrong-spot",
  NoSpot: "key-no-spot",
  Default: ""
}

function App() {
  // letters of current word - 5 letters
  const [letters, setLetters] = useState([[], [], [], [], [], []]);

  // current word - 6 words
  const [currentWord, setCurrentWord] = useState(0);

  // word that the user is trying to guess
  const [winningWord, setWinningWord] = useState([]);

  // object that keeps track of keyboard status
  const [alphabet, setAlphabet] = useState({});

  /**
   * This useEffect hook gets a random word from the text file to be the winning word.
   * Also fills in alphabet array for default.
   */
  useEffect(() => {
    fetch(words)
      .then(response => response.text())
        .then(text => {
                      const words = text.split(/\r?\n/);  // array of words
                      const randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
                      setWinningWord(randomWord.split(""));
                      console.log(randomWord);
                    })

    let abc = "abcdefghijklmnopqrstuvwxyz";
    let abcArray = abc.toUpperCase().split("");
    let obj = {};
    for(let i = 0; i < 26; i++) {
        obj[abcArray[i]] = Status.Default;
    }
    console.log(obj)
    setAlphabet(obj);
    }, []);

  /* 
  This useEffect hook is used to listen for when the user types a key,
  and updates the state if it's a valid key.
  */
  useEffect(() => {
    const keyDownHandler = event => {
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
  }, [currentWord, letters]);

  /* Checks if users input was a letter */
  function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  /* Checks if arrays are equal, used to see if the user corrected the right word. */
  function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

  /* For loop that makes 6 rows for user to guess. */
  function WordRows() {
    const wordRows = [];
    for (let i = 0; i < 6; i++) {
      wordRows.push(<Word key={i} wordNumber={i} letters={letters[i]} winningWord={winningWord} currentWord={currentWord} alphabet={alphabet} setAlphabet={setAlphabet}/>);
    }
    return wordRows;
  }

  /* Game over pop up based on if user won or lost! */
  function GameOver() {
    // use state and useEffect to delay the popup
    const [delay, setDelay] = useState(false);

    useEffect(() => {
      if(arrayEquals(letters[currentWord - 1], winningWord) || (currentWord > 5)) {
        setTimeout(() => {
          setDelay(true);
        }, 1500)
      }
    }, [setDelay]);

    // check if word that was just guessed is the correct word
    if(arrayEquals(letters[currentWord - 1], winningWord) && delay) {
      // YOU WON!
      return (
        <div className='game-over'>
          <span className='game-over-text'>YOU WON!</span>
          <div>
            <span>WINNING WORD: </span>
            <span>{winningWord}</span>
          </div>
          <button onClick={() => window.location.reload(false)}>PLAY AGAIN</button>
        </div>
      );
    }

    else if((currentWord > 5) && delay) {
      // YOU LOST!
      return (
        <div className='game-over'>
          <span className='game-over-text'>YOU LOST!</span>
          <div>
            <span>WINNING WORD: </span>
            <span>{winningWord}</span>
          </div>
          <button onClick={() => window.location.reload(false)}>PLAY AGAIN</button>
        </div>
      );
    }
    // game is still going - no need for a pop up
    return 
  }


  return (
    <React.Fragment>

      {/* HEADER */}
      <div className='header'>
        <span className='title'>LEORDLE</span>
      </div>

      <div className='game-container'>

        <GameOver/>

        {/* BOARD */}
        <div className='board'>
          <WordRows/>
        </div>

        {/* KEYBOARD */}
        <Keyboard alphabet={alphabet}/>

      </div>
      
    </React.Fragment>
  );
}

export default App;
