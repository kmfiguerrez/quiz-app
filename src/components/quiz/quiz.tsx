'use client'

import { useReducer, useState } from "react"

// Custom Providers.
import SelectedAnswerProvider from "@/context/choice-provider"

// Custom Components.
import QuestionTSA from "./question-t-sa"
import QuestionTMA from "./question-t-ma"

// Data.
import questions from '@/utils/data'

// Custom types.
import { TColorVariants, TQuizStatus } from "@/utils/definition"
import questionsReducer from "@/reducers/questions-reducer"

// Custom utilities.
import {getTotalScore} from "@/utils/score"
import ColorVariantSwitcher from "../theme-switcher"



const Quiz = () => {
  const [quizStatus, setQuizStatus] = useState<TQuizStatus>('answering')
  // questionResult state will be used to calculate the total score.
  const [selectedQuestions, dispatch] = useReducer(questionsReducer, [])  
  const [error, setError] = useState('')
  const [totalScore, setTotalScore] = useState(0)
  // Determine if the user has clicked the checked button.
  const [hasChecked, sethasChecked] = useState(false)
  // console.log('score: ', totalScore)
  // Color variants for prefix symbols, default is white.
  const [colorVariant, setColorVariant] = useState<TColorVariants>('white')

  const singleQuestion = [questions[3]]

  

  return (
    <SelectedAnswerProvider>
      <ColorVariantSwitcher selectedColor={colorVariant} onSetColorVariant={setColorVariant} />
      <button
        onClick={() => {
          // Reset the error status first.
          setError('')
          
          // The check button has been clicked.
          sethasChecked(true)

          // Set status.
          setQuizStatus('checked')
          
          // Check if all questions have answered.
          // if (questionsResult.length !== Questions.length) {
          //   // Update the error state.
          //   setError('All questions must be answered')
          //   // Update the quiz status.
          //   setQuizStatus("answering")
          //   // exit
          //   return
          // }
          
          // If everything is ok.
          // Calculate the total score.
          console.log('questions: ', selectedQuestions)
          setTotalScore(getTotalScore(selectedQuestions))
        }}
      >
        Check
      </button>      

      <p>{`Error: ${error}`}</p>
      
      <div className="flex justify-between">
        <p>
          {`Selected questions: ${selectedQuestions.map(q => q.questionId)}`}
        </p>

        <p>{`State: ${quizStatus}`}</p>

        <p>
          {`Score: ${totalScore}`}
        </p>
      </div>

      <ul className="list-decimal">
        {questions.map(question => (
            <li>
              {/* Determine which Question component to use. */}
              {question.answers > 1 &&
                <QuestionTMA
                  question={question}
                  colorVariant={colorVariant}
                  quizData={{
                    quizState: {quizStatus, onSetQuizStatus: setQuizStatus},
                    quizSelectedQuestions: {selectedQuestions, onSetSelectedQuestions: dispatch},
                    hasChecked
                  }}
                  className="mb-8"
                />
              }

              {question.answers === 1 &&
                <QuestionTSA
                  question={question}
                  colorVariant={colorVariant}
                  quizData={{
                    quizState: {quizStatus, onSetQuizStatus: setQuizStatus},
                    quizSelectedQuestions: {selectedQuestions, onSetSelectedQuestions: dispatch},
                    hasChecked
                  }}
                  className="mb-8"
                />
              }
            </li>
          ))
        }        
      </ul>


    </SelectedAnswerProvider>
  )
}

export default Quiz