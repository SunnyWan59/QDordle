import './App.css';
import React, { useState, useEffect } from 'react';
import ArrayFromFile from './Array';


// const WORDS = words.split('\n');
// const WORDS = ["apple", "grape", "peach", "plumb", "mango", "berry", "melon", "lemon", "guava", "olive"];r

// function getArrayFromFile(filePath) {
//   try {
//     const data = fs.readFileSync(filePath, 'utf8');
//     return data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
//   } catch (err) {
//     console.error('Error reading file:', err);
//     return [];
//   }
// }


const WORDS = ArrayFromFile();


function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}


const App = () => {
  // const [word, setWord] = useState('react'); // Change this to a random word
  const [word, setWord] = useState(getRandomWord());
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [message, setMessage] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState([]);


  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  useEffect(() => {
    if (attemptsLeft === 0 && !gameOver) {
      setMessage(`Game over! The word was ${word}`);
      setGameOver(true);
    }
  }, [attemptsLeft, gameOver, word]);

  const newFeedback = guess.split('').map((char, idx) => {
    if (char === word[idx]) return 'correct';
    if (word.includes(char)) return 'present';
    return 'absent';
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameOver) {
      setMessage('Game over! Please restart to play again.');
      return;
    }
    if (guess.length !== 5) {
      setMessage(`Guess must be 5 letters long`);
      return;
    }
    setAttempts([...attempts, guess]);
    setAttemptsLeft(attemptsLeft - 1);
    setFeedback([...feedback, newFeedback]);

    if (guess === word) {
      setMessage('Congratulations! You guessed the word!');
      setGameOver(true);
    } else {
      setMessage('Try again!');
    }
    setGuess('');
  };



  // const renderAttempts = () => {
  //   return attempts.map((attempt, index) => (
  //     <div key={index}>
  //       {attempt.split('').map((char, i) => {
  //         let className = '';
  //         if (char === word[i]) {
  //           className = 'correct';
  //         } else if (word.includes(char)) {
  //           className = 'present';
  //         } else {
  //           className = 'absent';
  //         }
  //           return (
  //           <span key={i} className={className}>
  //             {char} ({className})
  //           </span>
  //           );
  //       })}
  //     </div>
  //   ));
  // };


  const restartGame = () => {
    setWord(getRandomWord());
    setGuess('');
    setAttemptsLeft(6);
    setGameOver(false);
    setMessage('');
    setAttempts([]);
  };

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>QDordle</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={guess}
            onChange={handleChange}
            maxLength={word.length}
          />
          <p>The word is: {word}</p>
          {/* <p>Game Over: {gameOver ? 'Yes' : 'No'}</p> */}
          {/* <button type="submit">Submit</button> */}
        </form>
        <div>{message}</div>
        {/* <div>{renderAttempts()}</div> */}
        <div>
          <h2>Words List</h2>
          <ul>
            {WORDS.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>

        {attempts.map((guess, idx) => (
        <div key={idx} className="guess">
          {guess.split('').map((char, charIdx) => (
            <span key={charIdx} className={`tile ${feedback[idx][charIdx]}`}>
              {char.toUpperCase()}
            </span>
          ))}
        </div>
      ))}


        <button onClick={restartGame}>
          Restart Game
        </button>
      </header>
    </div>
  );
};
export default App;
