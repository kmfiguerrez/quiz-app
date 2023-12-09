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


const Quiz = () => {
  const [quizStatus, setQuizStatus] = useState<TQuizStatus>('answering')
  // questionResult state will be used to calculate the total score.
  const [questionsResult, dispatch] = useReducer(questionsReducer, [])

  return (
    <SelectedAnswerProvider>
      
      {/* Status Message*/}
      {/* {quizStatus === "checked" && 
        <p
          className={clsx("text-lg text-center", {
            "text-green-500": isAnsCorrect,
            "text-red-500": !isAnsCorrect
          })}
        >
          {isAnsCorrect ? "Correct" : "Wrong"}
        </p>
      } */}

      <ul className="list-decimal">
        {Questions.map(question => (
            <li>
              <Question 
                question={question} 
                quizData={{
                  quizState: {quizStatus, onSetQuizStatus: setQuizStatus},
                  quizSelectedQuestions: {questionsResult, onSetQuestionsResult: dispatch}
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
          setQuizStatus("answering")

          // Set status.
          setQuizStatus('checked')      
        }}
      >
        Check
      </button>
    </SelectedAnswerProvider>
  )
}

export default Quiz