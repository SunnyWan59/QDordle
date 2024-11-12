import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';


const WORDS = ["apple", "grape", "peach", "plumb", "mango", "berry", "melon", "lemon", "guava", "olive"];

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

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  useEffect(() => {
    if (attemptsLeft === 0 && !gameOver) {
      setMessage(`Game over! The word was ${word}`);
      setGameOver(true);
    }
  }, [attemptsLeft, gameOver, word]);

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

    if (guess === word) {
      setMessage('Congratulations! You guessed the word!');
      setGameOver(true);
    } else {
      setMessage('Try again!');
    }
    setGuess('');
  };

  const renderAttempts = () => {
    return attempts.map((attempt, index) => (
      <div key={index}>
        {attempt.split('').map((char, i) => {
          let className = '';
          if (char === word[i]) {
            className = 'correct';
          } else if (word.includes(char)) {
            className = 'present';
          } else {
            className = 'absent';
          }
            return (
            <span key={i} className={className}>
              {char} ({className})
            </span>
            );
        })}
      </div>
    ));
  };

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
        <div>{renderAttempts()}</div>

        <table>
          <tbody>
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: 5 }).map((_, colIndex) => (
                  <td key={colIndex} className="cell">
                    {attempts[rowIndex] && attempts[rowIndex][colIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={restartGame}>
          Restart Game
        </button>
      </header>
    </div>
  );
};
export default App;
