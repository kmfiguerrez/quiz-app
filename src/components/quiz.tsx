'use client'

import { useReducer, useState } from "react"

// Custom Providers.
import SelectedAnswerProvider from "@/context/choice-provider"

// Custom Components.
import Question from "./question"

// Data.
import Questions from '@/utils/data'
import MyCheckboxGroup from "./checkbox-group"


// Custom types.
import { TQuizStatus } from "@/utils/definition"
import questionsReducer from "@/reducers/questions-reducer"
import getTotalScore from "@/utils/getTotalScore"


const Quiz = () => {
  const [quizStatus, setQuizStatus] = useState<TQuizStatus>('answering')
  // questionResult state will be used to calculate the total score.
  const [questionsResult, dispatch] = useReducer(questionsReducer, [])  
  const [error, setError] = useState('')
  const [totalScore, setTotalScore] = useState(0)
  // Determine if the user has clicked the checked button.
  const [hasChecked, sethasChecked] = useState(false)
  console.log('score: ', totalScore)

  return (
    <SelectedAnswerProvider>
      
      <div className="flex justify-between">
        <p>
          {`Selected questions: ${questionsResult.map(q => q.questionId)}`}
        </p>

        <p>{`State: ${quizStatus}`}</p>

        <p>
          {`Score: ${totalScore}`}
        </p>
      </div>

      <ul className="list-decimal">
        {Questions.map(question => (
            <li>
              <Question 
                question={question} 
                quizData={{
                  quizState: {quizStatus, onSetQuizStatus: setQuizStatus},
                  quizSelectedQuestions: {questionsResult, onSetQuestionsResult: dispatch},
                  hasChecked
                }}
              />
              {/* <MyCheckboxGroup question={Questions[0]} /> */}
            </li>
          ))
        }        
      </ul>

      <button
        onClick={() => {
          // Reset the status.
          // setQuizStatus("listing")
          
          // The check button has been clicked.
          sethasChecked(true)

          // Set status.
          setQuizStatus('checked')
          
          // Check if all questions have answered.
          if (questionsResult.length !== Questions.length) return setError('All questions must be answered')
          console.log('questions: ', questionsResult.length !== Questions.length)
          // If everything is ok.
          // Calculate the total score.
          setTotalScore(getTotalScore(questionsResult))
        }}
      >
        Check
      </button>
    </SelectedAnswerProvider>
  )
}

export default Quiz