import './App.css';
import React, {useState} from 'react';
import {startGame, guess, restart} from './axios';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('');

  const start = () => {
    setHasStarted(true);
    startGame();
  }
  const changeNumber = () => {
    setNumber(document.getElementById('tag').value);
  }
  const handleGuess = async() =>{
    const response = await guess(number)
    if(response === 'Equal') setHasWon(true);

    else{
      setStatus(response);
      setNumber('');
    }
  }
  const handleRestart = async() =>{
    const res = await restart();
    if(res === 'Restart'){
      setHasWon(false);
      setHasStarted(false);
      setStatus('');
    }

  }
  const startMenu =
    <div>
        <button onClick={start}>start game</button>
    </div>

  const gameMode =
    <>
      <p>Guess a number between 1 to 100</p>
      <input onChange={changeNumber} id = 'tag'></input>
      <button onClick={handleGuess} disabled={!number}>guess!</button>
      <p>{status}</p>
    </>

  const winningMode =
    <>
      <p>you won! the number was {number}.</p>
      <button onClick={handleRestart}>restart</button>
    </>

  const game =
    <div>
      {hasWon ? winningMode : gameMode}
    </div>

  return <div className="App">
    {hasStarted ? game : startMenu}
  </div>
}

export default App;
