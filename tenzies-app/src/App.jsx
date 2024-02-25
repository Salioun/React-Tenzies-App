import './App.css'
import { useState, useEffect } from 'react';
import Die from './components/Die'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {

  const MAX = 6;


  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * MAX),
      isHeld: false,
      id: nanoid()
    }
  }

  const allNewDice = (n) => Array.from({ length: n }, () => (
    generateNewDie()
  ));

  const [dice, setDice] = useState(allNewDice(10));
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const areAllHeld = dice.every((die) => die.isHeld === true)
    const haveSameValue = dice.every((die) => die.value === dice[0].value)
    if (areAllHeld && haveSameValue) {
      setTenzies(true)
    }
  }, [dice])


  function rollDice() {
    if (tenzies) {
      setTenzies(false)
      setDice(allNewDice(10))
    } else {
      setDice(prevDice => {
        return prevDice.map(die => {
          return die.isHeld ? die : generateNewDie();
        })
      })
    }
  }
  function holdDice(id) {
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    })
  }

  const diceComponents = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={holdDice}
    />))

  return (
    <>
      {tenzies && <Confetti />}
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze </p>
        <div className='die-wrapper'>
          {diceComponents}
        </div>
        <button className='roll-btn' onClick={rollDice}>{tenzies ? 'New Game': 'Roll'}</button>
      </main>
    </>
  )
}

export default App
