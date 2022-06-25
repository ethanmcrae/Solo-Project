import React from 'react';

const Keyboard = ({ letters, setLetters, row1, setRow1, row2, setRow2, row3, setRow3, row4, setRow4, row5, setRow5, row6, setRow6, complete, setComplete, remainingWords, setRemainingWords }) => {
  // Handle key presses from a keyboard
  const handleKeyPress = (e) => {
    // Exit early when the game is already won
    if (complete) return;
    // Determine key
    const key = e.key.toLowerCase();
    // If the key is an alphabet character
    if (/^[a-z]$/.test(key)) {
      // Log
      console.log('Key ->', key);
      // If the character length is less than 5 add the letter
      if (letters.length < 5) setLetters([...letters, key]);
    } else if (/^backspace$/.test(key)) {
      // Log
      console.log('Special key: ' + key)
      // Remove last character
      // - Create a clone (keep state pure)
      const lettersCopy = [...letters];
      // - Remove the last letter from the clone
      lettersCopy.pop();
      // - Update state
      setLetters(lettersCopy);
    } else if (/^enter$/.test(key)) {
      // Log
      console.log('Special key: ' + key)
      // If the character length is 5 characters then add it to the next row
      if (letters.length === 5) {
        // Early exit when the same word has already been guessed
        if (row1 && row1.every((letterData, i) => letterData.letter === letters[i])) return;
        if (row2 && row2.every((letterData, i) => letterData.letter === letters[i])) return;
        if (row3 && row3.every((letterData, i) => letterData.letter === letters[i])) return;
        if (row4 && row4.every((letterData, i) => letterData.letter === letters[i])) return;
        if (row5 && row5.every((letterData, i) => letterData.letter === letters[i])) return;

        // Get the word status from the server
        fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: `{"word": "${letters.join('')}"${!row1 ? ', "first": "true"' : ''}}`
        })
          .then(res => res.ok ? res.json() : alert('Invalid word'))
          .then((data) => {
            // If the word was a valid word
            if (data) {
              // Convert word status code colors to CSS
              for (let i = 0; i < 5; i++) {
                document.getElementById(letters[i]).style = `background-color: var(--${data[i]})`;
              }

              // Update state
              const letterData = letters.map((letter, i) => ({ letter, color: data[i] }))
              if (!row1) setRow1(letterData);
              else if (!row2) setRow2(letterData);
              else if (!row3) setRow3(letterData);
              else if (!row4) setRow4(letterData);
              else if (!row5) setRow5(letterData);
              else if (!row6) setRow6(letterData);
              // Reset the letters
              setLetters([]);

              // Check for win / loss
              if (data.every(code => code === 'green') || row6) setComplete(true);

              // Get stats
              fetch('/stats', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rows: [row1, row2, row3, row4, row5, row6], letters: letterData })
              }).then(res => res.json())
                .then(possibleWords => {
                  console.log('Possible Words ->', possibleWords);
                  setRemainingWords([...remainingWords, possibleWords.length]);
                })
            }
          })
          .catch(err => {
            console.log('e ->', err);
          });
      }
    }
  }

  // Add event listener for a physical keyboard
  document.onkeydown = handleKeyPress;

  return (
    <div id="keyboard">
      <div className="row" id="row1">
        <Key letter='q' handleKeyPress={handleKeyPress} />
        <Key letter='w' handleKeyPress={handleKeyPress} />
        <Key letter='e' handleKeyPress={handleKeyPress} />
        <Key letter='r' handleKeyPress={handleKeyPress} />
        <Key letter='t' handleKeyPress={handleKeyPress} />
        <Key letter='y' handleKeyPress={handleKeyPress} />
        <Key letter='u' handleKeyPress={handleKeyPress} />
        <Key letter='i' handleKeyPress={handleKeyPress} />
        <Key letter='o' handleKeyPress={handleKeyPress} />
        <Key letter='p' handleKeyPress={handleKeyPress} />
      </div>
      <div className="row" id="row2">
        <Key letter='a' handleKeyPress={handleKeyPress} />
        <Key letter='s' handleKeyPress={handleKeyPress} />
        <Key letter='d' handleKeyPress={handleKeyPress} />
        <Key letter='f' handleKeyPress={handleKeyPress} />
        <Key letter='g' handleKeyPress={handleKeyPress} />
        <Key letter='h' handleKeyPress={handleKeyPress} />
        <Key letter='j' handleKeyPress={handleKeyPress} />
        <Key letter='k' handleKeyPress={handleKeyPress} />
        <Key letter='l' handleKeyPress={handleKeyPress} />
      </div>
      <div className="row" id="row3">
        <EnterKey handleKeyPress={handleKeyPress} />
        <Key letter='z' handleKeyPress={handleKeyPress} />
        <Key letter='x' handleKeyPress={handleKeyPress} />
        <Key letter='c' handleKeyPress={handleKeyPress} />
        <Key letter='v' handleKeyPress={handleKeyPress} />
        <Key letter='b' handleKeyPress={handleKeyPress} />
        <Key letter='n' handleKeyPress={handleKeyPress} />
        <Key letter='m' handleKeyPress={handleKeyPress} />
        <BackspaceKey handleKeyPress={handleKeyPress} />
      </div>
    </div>
  )
}

// Normal key that represents a letter of the alphabet
const Key = ({ letter, handleKeyPress }) => {
  return (
    <button onClick={() => handleKeyPress({ key: letter })} className='key' id={ letter }>{ letter }</button>
  )
}

// Enter key
const EnterKey = ({ handleKeyPress }) => {
  return (
    <button onClick={() => handleKeyPress({ key: 'enter' })} className='key big-key' id='enter'>enter</button>
  )
}
// Backspace Key
const BackspaceKey = ({ handleKeyPress }) => {
  return (
    <button onClick={() => handleKeyPress({ key: 'backspace' })} className='key big-key' id='delete'>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
      </svg>
    </button>
  )
}

export default Keyboard;
