'use client'

import clsx from "clsx"
import { Dispatch, ReactNode, useReducer, useState } from "react"

// Custom types.
import type { TChoice, TQuestion, TQuizStatus } from "@/utils/definition"

// Custom Providers.
import { useSelectedChoiceContext } from "@/context/choice-provider"

// Custom SVG icons.
import CheckIcon from "./svg/check-icon"
import Xicon from "./svg/x-icon"

// Custom utils.
import cn from "@/utils/cn"
import answersReducer, { TSelectedAnswersAction } from "@/reducers/answers-reducer"
import answerReducer from "@/reducers/answer-reducer"



type TQuestionProps = {
  question: TQuestion
  quizStatus: TQuizStatus
}

type TChoicesProp = {
  children: ReactNode
}

type TChoiceProp = {
  quizStatus: TQuizStatus
  choice: TChoice
  prefixSymbol: string
  numOfQuestion: number
  selectedAnswersState: {
    selectedAnswers: Array<TChoice>,
    onDispatch2: Dispatch<TSelectedAnswersAction>
  }
}


const Question = ({ question, quizStatus }: TQuestionProps) => {    
    // Choose the reducer function based on the number of correct answers.
  const reducer = question.answers > 1 ? answersReducer : answerReducer
  const [selectedAnswer, dispatch1] = useReducer(reducer, null)
  const [selectedAnswers, dispatch2] = useReducer(answersReducer, [])
  
  // const {selectedAnswer} = useSelectedChoiceContext()
  // const [isAnsCorrect, setIsAnsCorrect] = useState(false)  
  const [questionError, setQuestionError] = useState('')
  // console.log('Selected choice: ', selectedAnswer)
  // console.log('Error: ', error)

  // Check answer.
  const handleCheckAnswer = () => {
    // If haven't selected an asnwer yet.
    if (!selectedAnswer) {
      // return setError('Select an answer first.')
    }

    // Determine if selected answer is correct.
    // selectedAnswer?.isCorrect ? setIsAnsCorrect(true) : setIsAnsCorrect(false)

    // Set status.
    
  }

  return (
    <>

      {/* Display Question */}
      <div
        className="border p-1"
      >
        {/* Question text */}
        <p className="mb-1">
          <span>
            {question.question}
          </span>

          {/* Error Message */}          
          {quizStatus === "checked" && !selectedAnswer &&
            <span className="text-red-400">
              {question.answers > 1 ? (
                  ` - Select ${question.answers} answers.`
                ) : (
                  ' - Select an answer.'
                )
              }
            </span>
          }
          
        </p>

        <Choices>
          {/* Passing choice component as a children prevents its
              parent component (choices) accepting props that it's
              never gonna use. See React context api doc.
          */}
          {question.choices.map(choice => (
            <Choice 
              key={choice.prefixSymbol} 
              quizStatus={quizStatus} 
              prefixSymbol="" 
              choice={choice}
              numOfQuestion={question.answers}
              selectedAnswersState={{selectedAnswers, onDispatch2: dispatch2}}
            />
          ))
          }
        </Choices>
      </div>
      
    </>
  )
}


const Choices = ({ children }: TChoicesProp) => {
  return (
    <div className="ps-1 grid grid-cols-1 gap-y-2">
      {children}
    </div>  
  )
}


const Choice = ({ choice, quizStatus, numOfQuestion, selectedAnswersState }: TChoiceProp) => {
  const {selectedAnswer, dispatch} = useSelectedChoiceContext()
  const {selectedAnswers, onDispatch2} = selectedAnswersState
  // console.log('selected: ', selectedAnswer)
  // For question that has only one answer.
  const selected = selectedAnswer?.prefixSymbol === choice.prefixSymbol
  
  return (
    <button      
      disabled={quizStatus === 'checked'}
      className={cn("flex items-center hover:bg-zinc-800/90 p-1 rounded-md",      
      {
        "text-green-500": quizStatus === "checked" && choice.isCorrect,
        "text-red-500": quizStatus === "checked" && !choice.isCorrect        
      }
      )}
      onClick={() => {
        // Unselect the answer.
        // if (selected) return dispatch({type: "removed_selection"})
        // const isEqual = selectedAnswer?.text === choice.text
        // console.log('is equal: ', isEqual)

        // To do
        // If clicked again.
        if ()

        
        // Set the selected answer.

        // For question that has multiple correct answers.
        if (numOfQuestion > 1) return onDispatch2({type:"added_answer", payload: choice})
        
        // For question that has one correct answer only.
        return dispatch({type:"changed_selection", payload: choice})
      }}
    >

      {/* Result symbol */}
      {quizStatus === "checked" && choice.isCorrect &&
        <CheckIcon />        
      }

      {quizStatus === "checked" && !choice.isCorrect &&
        <Xicon />        
      }


      {/* Prefix symbol */}
      <span        
        className={cn(
          "ms-1 me-3 rounded-full bg-gray-800 px-2 align-middle text-blue-500",
          {
            "outline outline-2 outline-offset-2 outline-blue-500": selected
          }
        )}
      >
        {choice.prefixSymbol}
      </span>

      {/* Text */}
      <span className={cn("",
          {
            
          }
        )}
      >
        {choice.text}
      </span>

    </button>
  )
}

export default Question