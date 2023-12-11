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

// Custom utilities.
import {getTotalScore} from "@/utils/score"


const Quiz = () => {
  const [quizStatus, setQuizStatus] = useState<TQuizStatus>('answering')
  // questionResult state will be used to calculate the total score.
  const [questionsResult, dispatch] = useReducer(questionsReducer, [])  
  const [error, setError] = useState('')
  const [totalScore, setTotalScore] = useState(0)
  // Determine if the user has clicked the checked button.
  const [hasChecked, sethasChecked] = useState(false)
  // console.log('score: ', totalScore)

  return (
    <SelectedAnswerProvider>

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
          console.log('questions: ', questionsResult)
          setTotalScore(getTotalScore(questionsResult))
        }}
      >
        Check
      </button>      

      <p>{`Error: ${error}`}</p>
      
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


    </SelectedAnswerProvider>
  )
}

export default Quiz