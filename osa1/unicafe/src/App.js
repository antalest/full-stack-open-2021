import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value, unit }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
    <td>{unit}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const goodValue = 1;
  const neutralValue = 0;
  const badValue = -1;

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>No feedback given</div>
    )
  } else {
      return (
        <div>
          <table>
            <tbody>
              <StatisticLine text="good" value={good}/>
              <StatisticLine text="neutral" value={neutral}/>
              <StatisticLine text="bad" value={bad}/>
              <StatisticLine text="all" value={good + neutral + bad}/>
              <StatisticLine text="average" value={(good * goodValue + neutral * neutralValue + bad * badValue )/(good + neutral + bad)}/>
              <StatisticLine text="positive" value={good / (good + neutral + bad) * 100} unit="%"/>
            </tbody>
          </table>
        </div>
      )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
