import React from 'react';
import { useNavigate } from 'react-router-dom';
import Responses from './Responses.jsx';
import Keyboard from './Keyboard.jsx';
import LineGraph from './LineGraph.jsx';

const Home = ({ letters, setLetters, row1, setRow1, row2, setRow2, row3, setRow3, row4, setRow4, row5, setRow5, row6, setRow6, complete, setComplete, remainingWords, setRemainingWords }) => {
  const nav = useNavigate();
  // Validate
  fetch('/validate')
    .then(res => res.json())
    .then(({ valid }) => valid ? null : nav('/sign-in'));

  return (
    <>
      { remainingWords.length > 1 ? <LineGraph remainingWords={remainingWords} /> : null }
      <Responses letters={letters} row1={row1} row2={row2} row3={row3} row4={row4} row5={row5} row6={row6} />
      <Keyboard letters={letters} setLetters={setLetters} row1={row1} setRow1={setRow1} row2={row2} setRow2={setRow2} row3={row3} setRow3={setRow3} row4={row4} setRow4={setRow4} row5={row5} setRow5={setRow5} row6={row6} setRow6={setRow6} complete={complete} setComplete={setComplete} remainingWords={remainingWords} setRemainingWords={setRemainingWords} />
    </>
  )
}

export default Home;
