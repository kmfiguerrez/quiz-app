'use client'

import { Dispatch, ReactNode, useReducer, useRef } from "react"

// Custom types.
import type { TChoice, TQuestion, TQuizState } from "@/utils/definition"

// Custom Providers.
import { useSelectedChoiceContext } from "@/context/choice-provider"

// Custom SVG icons.
import CheckIcon from "./svg/check-icon"
import Xicon from "./svg/x-icon"

// Custom utils.
import cn from "@/utils/cn"
import getPrefixSymbols from "@/utils/get-prefixsymbols"

// Reducers.
import answersReducer, { TSelectedAnswersAction } from "@/reducers/answers-reducer"
import answerReducer, { TSelectedAnsAction } from "@/reducers/answer-reducer"



type TQuestionProps = {
  question: TQuestion
  quizState: TQuizState
}

type TChoicesProps = {
  children: ReactNode
}

type TChoiceProps = {
  quizState: TQuizState
  choice: TChoice
  prefixSymbol: string
  numOfQuestion: number
  hasSelectedAnswer: boolean
  selectedAnswerState: {
    selectedAnswer: TChoice | null
    onDispatch1: Dispatch<TSelectedAnsAction>
  }
  selectedAnswersArrayState: {
    selectedAnswersArray: Array<TChoice>,
    onDispatch2: Dispatch<TSelectedAnswersAction>
  }
}


const Question = ({ question, quizState }: TQuestionProps) => {
  const {quizStatus, onSetQuizStatus} = quizState
  
    // Choose the reducer function based on the number of correct answers.  
  const [selectedAnswer, dispatch1] = useReducer(answerReducer, null)
  const [selectedAnswersArray, dispatch2] = useReducer(answersReducer, [])

  // Determine the score
  let score = 0
  // Determine if user has selected an answer(s).
  let hasSelectedAnswer = false

  // For question that has multiple correct answers.
  if (question.answers > 1) {
    // If user has selected an answer.
    if (selectedAnswersArray.length !== 0) hasSelectedAnswer = true

    // Determine the score.
    // Reset the score first.
    score = 0
    selectedAnswersArray.map(answer => {
      answer.isCorrect && score++
    })
    score = Number((score / question.answers).toFixed(2))
  }
  // For question that has only one correct answer.
  if (question.answers === 1) {
    // If user has selected an answer.
    if (selectedAnswer) hasSelectedAnswer = true

    // Determine the score.
    // Reset the score first.
    score = 0
    selectedAnswer?.isCorrect && score++
  }  

  // Used for getting prefix symbols.
  let index = 0

  // For error message.
  const showErrorMessage = quizStatus === "checked" && !hasSelectedAnswer
  
  // Get span with letter f.
  const letterF = useRef(null)

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
          {showErrorMessage &&
            <span className="text-red-400">
              {question.answers > 1 ? (
                  ` - Select ${question.answers} answers.`
                ) : (
                  ' - Select an answer.'
                )
              }
            </span>
          }

          {/* Show score */}
          {quizStatus === "checked" && !showErrorMessage && 
            <span className="text-blue-500">
              {` ${score} point`}
            </span>
          }
          
        </p>

        <Choices>
          {/* Passing choice component as a children prevents its
              parent component (choices) accepting props that it's
              never gonna use. See React context api doc.
          */}                    
          {question.choices.map(choice => {
              const c =  <Choice 
                  key={choice.prefixSymbol} 
                  quizState={quizState}
                  prefixSymbol={getPrefixSymbols("letters", index)} 
                  choice={choice}
                  numOfQuestion={question.answers}
                  hasSelectedAnswer={hasSelectedAnswer}
                  selectedAnswerState={{selectedAnswer, onDispatch1: dispatch1}}
                  selectedAnswersArrayState={{selectedAnswersArray, onDispatch2: dispatch2}}
                />
              index++
              return c
            })
          }
          
        </Choices>
      </div>
      
    </>
  )
}


const Choices = ({ children }: TChoicesProps) => {
  return (
    <div className="ps-1 grid grid-cols-1 gap-y-2">
      {children}
    </div>  
  )
}


const Choice = ({ 
    choice, 
    quizState, 
    numOfQuestion,
    hasSelectedAnswer,
    selectedAnswerState,
    selectedAnswersArrayState, 
    prefixSymbol 
  }: TChoiceProps) => {

  const {quizStatus, onSetQuizStatus} = quizState
  // const {selectedAnswer, dispatch} = useSelectedChoiceContext()
  const {selectedAnswer, onDispatch1} = selectedAnswerState
  const {selectedAnswersArray, onDispatch2} = selectedAnswersArrayState
  // console.log('selected array : ', selectedAnswersArray)
  // console.log('selected : ', selectedAnswer)
  
  // Determine if this choice is selected.
  let selected = false
  // For question that has multiple correct answers.
  if (numOfQuestion > 1) {
    const found = selectedAnswersArray.find(c => c.prefixSymbol === prefixSymbol)
    // found returns undefined if none of the elements satisfies the
    // condition. So used the !! operator to make undefined a boolean false
    // and turn the return value to boolean true.
    selected = !!found
  }  
  // For question that has only one answer.
  if (numOfQuestion === 1) {
    selected = selectedAnswer?.prefixSymbol === prefixSymbol
  }


  // console.log('has selected: ', hasSelectedAnswer)

  return (
    <button
      // Disable only if user has selected an answer and quiz component
      // has finished checking.
      disabled={quizStatus === 'checked' && hasSelectedAnswer}
      className={cn("flex items-center hover:bg-zinc-800/90 p-1 rounded-md max-w-max pe-3",      
      {
        "text-green-500": quizStatus === "checked" && hasSelectedAnswer && choice.isCorrect,
        "text-red-500": quizStatus === "checked" && hasSelectedAnswer && !choice.isCorrect        
      }
      )}
      onClick={() => {
        // Reset the quiz state first.
        onSetQuizStatus("answering")     
      
        // Set the selected answer.

        // For question that has multiple correct answers.
        if (numOfQuestion > 1) {
          // If choice already selected and clicked (selected answer) again.
          if (selected) return onDispatch2({type: "removed_answer", payload: {prefixSymbol}})

          // Otherwise not yet selected.
          return onDispatch2({type:"added_answer", payload: {...choice, prefixSymbol}})
        }
        
        // For question that has one correct answer only.
        return onDispatch1({type:"changed_selection", payload: {...choice, prefixSymbol}})
      }}
    >

      {/* Result symbol */}
      {quizStatus === "checked" && hasSelectedAnswer && choice.isCorrect &&
        <CheckIcon />        
      }

      {quizStatus === "checked" && hasSelectedAnswer && !choice.isCorrect &&
        <Xicon />        
      }


      {/* Prefix symbol */}
      <span
        
        className={cn(
          "ms-1 me-3 rounded-full bg-gray-800 px-2 align-middle text-blue-500",
          {
            "outline outline-2 outline-offset-2 outline-blue-500 ": selected,
            "ms-2": quizStatus === "checked" && hasSelectedAnswer
          }
        )}
      >
        {prefixSymbol}
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