import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../style.css';
import Header from './Header.jsx';
import Home from './Home.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';

const App = () => {
  const [complete, setComplete] = useState(false);
  const [letters, setLetters] = useState([]);
  const [row1, setRow1] = useState('');  
  const [row2, setRow2] = useState('');
  const [row3, setRow3] = useState('');
  const [row4, setRow4] = useState('');
  const [row5, setRow5] = useState('');
  const [row6, setRow6] = useState('');
  const [remainingWords, setRemainingWords] = useState([8920]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route exact path='/' element={<Home letters={letters} setLetters={setLetters} row1={row1} setRow1={setRow1} row2={row2} setRow2={setRow2} row3={row3} setRow3={setRow3} row4={row4} setRow4={setRow4} row5={row5} setRow5={setRow5} row6={row6} setRow6={setRow6} complete={complete} setComplete={setComplete} remainingWords={remainingWords} setRemainingWords={setRemainingWords} />} />
      </Routes>
    </Router>
  )
}

export default App;
