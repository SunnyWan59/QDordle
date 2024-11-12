import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';


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

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess.length !== 5) {
      setMessage(`Guess must be 5 letters long`);
      return;
    }
    setAttempts([...attempts, guess]);
    if (guess === word) {
      setMessage('Congratulations! You guessed the word!');
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
              {char}
            </span>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Wordle Game</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={guess}
            onChange={handleChange}
            maxLength={word.length}
          />
          <p>The word is: {word}</p>
          <button type="submit">Submit</button>
        </form>
        <div>{message}</div>
        <div>{renderAttempts()}</div>
      </header>
    </div>
  );
};
export default App;
