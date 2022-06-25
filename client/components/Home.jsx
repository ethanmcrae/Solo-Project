import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Responses from './Responses.jsx';
import Keyboard from './Keyboard.jsx';
import LineGraph from './LineGraph.jsx';

const Home = () => {
  const [complete, setComplete] = useState(false);
  const [letters, setLetters] = useState([]);
  const [currentRow, setCurrentRow] = useState(1);
  const [row1, setRow1] = useState('');  
  const [row2, setRow2] = useState('');
  const [row3, setRow3] = useState('');
  const [row4, setRow4] = useState('');
  const [row5, setRow5] = useState('');
  const [row6, setRow6] = useState('');
  const [remainingWords, setRemainingWords] = useState([8920]);

  const nav = useNavigate();

  // Validate
  useEffect(() => {
    fetch('/validate')
    .then(res => res.json())
    .then(({ valid }) => {
      if (valid) {
        // Retrieve current game progress (if any)
        fetch('/load', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ friend: null })
        })
          .then(res => res.json())
          .then(({ row1, row2, row3, row4, row5, row6, currentRow }) => {
            // Update state to populate page with changes
            console.log('Saved progress:', row1, row2, row3, currentRow);
            if (row1) setRow1(row1);
            if (row2) setRow2(row2);
            if (row3) setRow3(row3);
            if (row4) setRow4(row4);
            if (row5) setRow5(row5);
            if (row6) setRow6(row6);
            setCurrentRow(currentRow || 1);
          })
          .catch(err => console.log(err));
      }
      // Redirect
      else nav('/sign-in')
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <>
      { remainingWords.length > 1 ? <LineGraph remainingWords={remainingWords} /> : null }
      <Responses letters={letters} row1={row1} row2={row2} row3={row3} row4={row4} row5={row5} row6={row6} />
      <Keyboard letters={letters} setLetters={setLetters} currentRow={currentRow} setCurrentRow={setCurrentRow} row1={row1} setRow1={setRow1} row2={row2} setRow2={setRow2} row3={row3} setRow3={setRow3} row4={row4} setRow4={setRow4} row5={row5} setRow5={setRow5} row6={row6} setRow6={setRow6} complete={complete} setComplete={setComplete} remainingWords={remainingWords} setRemainingWords={setRemainingWords} />
    </>
  )
}

export default Home;
