import React, { useState, useMemo } from 'react';
import QuestionCard from './components/QuestionCard';
import { GlobalStyle, Wrapper } from './App.styles';
import { fetchQuizQuestions, Difficulty, QuestionsState } from './API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)
    try {
      const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
      setQuestions(newQuestions)
      setScore(0)
      setUserAnswers([])
      setNumber(0)
      setLoading(false)

    } catch (error) {
      alert(error)
    }
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      const correct = questions[number].correct_answer === answer
      if (correct) {
        setScore(prev => prev + 1)
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject])
    }

  }
  const nextQuestion = () => {
    if (number + 1 !== TOTAL_QUESTIONS) {
      setNumber(prev => prev + 1)
    } else {
      setGameOver(true)
    }
  }
  return (
    <>
      <GlobalStyle />
      <Wrapper className="App">
        <h1>React Quiz</h1>
        {(gameOver || userAnswers.length === TOTAL_QUESTIONS) &&
          <button className="start" onClick={startTrivia}>Start</button>
        }
        {!gameOver && <p className="score">Score: {score}</p>}
        {loading && <p>Loading Questions...</p>}

        {!loading && !gameOver &&
          <QuestionCard
            questionNum={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers && userAnswers[number]}
            callback={checkAnswer}
          />
        }


        {(!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1)
          && (<button className="next" onClick={nextQuestion} > Next Question</button>)}
      </Wrapper>
    </>
  );
}

export default App;
