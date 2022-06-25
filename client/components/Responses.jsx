import React from 'react';

const Responses = ({ letters, row1, row2, row3, row4, row5, row6 }) => {
  return (
    <div id="responses">
    <div className={ "box" + (row1 ? ' ' + row1[0].color : '') }>{ (row1 && row1[0].letter) || letters[0] }</div>
    <div className={ "box" + (row1 ? ' ' + row1[1].color : '') }>{ (row1 && row1[1].letter) || letters[1] }</div>
    <div className={ "box" + (row1 ? ' ' + row1[2].color : '') }>{ (row1 && row1[2].letter) || letters[2] }</div>
    <div className={ "box" + (row1 ? ' ' + row1[3].color : '') }>{ (row1 && row1[3].letter) || letters[3] }</div>
    <div className={ "box" + (row1 ? ' ' + row1[4].color : '') }>{ (row1 && row1[4].letter) || letters[4] }</div>

    <div className={ "box" + (row2 ? ' ' + row2[0].color : '') }>{ (row2 && row2[0].letter) || (row1 && letters[0]) }</div>
    <div className={ "box" + (row2 ? ' ' + row2[1].color : '') }>{ (row2 && row2[1].letter) || (row1 && letters[1]) }</div>
    <div className={ "box" + (row2 ? ' ' + row2[2].color : '') }>{ (row2 && row2[2].letter) || (row1 && letters[2]) }</div>
    <div className={ "box" + (row2 ? ' ' + row2[3].color : '') }>{ (row2 && row2[3].letter) || (row1 && letters[3]) }</div>
    <div className={ "box" + (row2 ? ' ' + row2[4].color : '') }>{ (row2 && row2[4].letter) || (row1 && letters[4]) }</div>

    <div className={ "box" + (row3 ? ' ' + row3[0].color : '') }>{ (row3 && row3[0].letter) || (row2 && letters[0]) }</div>
    <div className={ "box" + (row3 ? ' ' + row3[1].color : '') }>{ (row3 && row3[1].letter) || (row2 && letters[1]) }</div>
    <div className={ "box" + (row3 ? ' ' + row3[2].color : '') }>{ (row3 && row3[2].letter) || (row2 && letters[2]) }</div>
    <div className={ "box" + (row3 ? ' ' + row3[3].color : '') }>{ (row3 && row3[3].letter) || (row2 && letters[3]) }</div>
    <div className={ "box" + (row3 ? ' ' + row3[4].color : '') }>{ (row3 && row3[4].letter) || (row2 && letters[4]) }</div>

    <div className={ "box" + (row4 ? ' ' + row4[0].color : '') }>{ (row4 && row4[0].letter) || (row3 && letters[0]) }</div>
    <div className={ "box" + (row4 ? ' ' + row4[1].color : '') }>{ (row4 && row4[1].letter) || (row3 && letters[1]) }</div>
    <div className={ "box" + (row4 ? ' ' + row4[2].color : '') }>{ (row4 && row4[2].letter) || (row3 && letters[2]) }</div>
    <div className={ "box" + (row4 ? ' ' + row4[3].color : '') }>{ (row4 && row4[3].letter) || (row3 && letters[3]) }</div>
    <div className={ "box" + (row4 ? ' ' + row4[4].color : '') }>{ (row4 && row4[4].letter) || (row3 && letters[4]) }</div>

    <div className={ "box" + (row5 ? ' ' + row5[0].color : '') }>{ (row5 && row5[0].letter) || (row4 && letters[0]) }</div>
    <div className={ "box" + (row5 ? ' ' + row5[1].color : '') }>{ (row5 && row5[1].letter) || (row4 && letters[1]) }</div>
    <div className={ "box" + (row5 ? ' ' + row5[2].color : '') }>{ (row5 && row5[2].letter) || (row4 && letters[2]) }</div>
    <div className={ "box" + (row5 ? ' ' + row5[3].color : '') }>{ (row5 && row5[3].letter) || (row4 && letters[3]) }</div>
    <div className={ "box" + (row5 ? ' ' + row5[4].color : '') }>{ (row5 && row5[4].letter) || (row4 && letters[4]) }</div>
    
    <div className={ "box" + (row6 ? ' ' + row6[0].color : '') }>{ (row6 && row6[0].letter) || (row5 && letters[0]) }</div>
    <div className={ "box" + (row6 ? ' ' + row6[1].color : '') }>{ (row6 && row6[1].letter) || (row5 && letters[1]) }</div>
    <div className={ "box" + (row6 ? ' ' + row6[2].color : '') }>{ (row6 && row6[2].letter) || (row5 && letters[2]) }</div>
    <div className={ "box" + (row6 ? ' ' + row6[3].color : '') }>{ (row6 && row6[3].letter) || (row5 && letters[3]) }</div>
    <div className={ "box" + (row6 ? ' ' + row6[4].color : '') }>{ (row6 && row6[4].letter) || (row5 && letters[4]) }</div>
  </div>
  )
}

export default Responses;
