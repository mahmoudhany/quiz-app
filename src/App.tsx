import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import './style.css';
import { fetchQuizQuestions, Difficulty } from './API';

const TOTAL_QUESTIONS = 10
function App() {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM)
  const startTrivia = async () => {
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
  }
  const nextQuestion = () => {

  }
  return (
    <div className="App">
      <h1>React Quiz</h1>
      <button className="start" onClick={checkAnswer}>Start</button>
      <p className="score">Score:</p>
      <p>Loading Questions...</p>

      {/* <QuestionCard
        questionNum={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : null}
        callback={checkAnswer}
      /> */}

      <button className="next" onClick={nextQuestion}>Next Question</button>
    </div>
  );
}

export default App;
