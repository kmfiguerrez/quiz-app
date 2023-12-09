'use client'

import clsx from "clsx"
import { useState } from "react"

// Custom types.
import type { TChoice, TQuestion } from "@/utils/definition"

// Custom Providers.
import { useSelectedChoiceContext } from "@/context/choice-provider"

// Custom SVG icons.
import CheckIcon from "./svg/check-icon"
import Xicon from "./svg/x-icon"



type TQuestionProps = {
  question: TQuestion
}

type TQuestionStatus = 'answering' | 'checked'

type TChoicesProp = {
  choices: Array<TChoice>
  questionStatus: TQuestionStatus
}

type TChoiceProp = {
  choice: TChoice
  prefixSymbol: string
  questionStatus: TQuestionStatus
}


const Question = ({ question }: TQuestionProps) => {    
  const {selectedAnswer} = useSelectedChoiceContext()
  const [isAnsCorrect, setIsAnsCorrect] = useState(false)
  const [status, setStatus] = useState<TQuestionStatus>('answering')
  const [error, setError] = useState('')
  // console.log('Selected choice: ', selectedAnswer)
  // console.log('Error: ', error)

  // Check answer.
  const handleCheckAnswer = () => {
    // If haven't selected an asnwer yet.
    if (!selectedAnswer) {
      return setError('Select an answer first.')
    }

    // Determine if selected answer is correct.
    selectedAnswer?.isCorrect ? setIsAnsCorrect(true) : setIsAnsCorrect(false)

    // Set status.
    setStatus("checked")
  }

  return (
    <>
      {/* Error Message */}
      {error &&
        <p
          className="text-red-500 text-lg text-center"
        >
          {error}
        </p>
      }

      {/* Status Message*/}
      {status === "checked" && 
        <p
          className={clsx("text-lg text-center", {
            "text-green-500": isAnsCorrect,
            "text-red-500": !isAnsCorrect
          })}
        >
          {isAnsCorrect ? "Correct" : "Wrong"}
        </p>
      }

      {/* Display Question */}
      <div
        className="border p-1"
      >
        <p className="mb-1">
          {question.question}
        </p>
        <Choices choices={question.choices} questionStatus={status} />
      </div>
      
      {/* Check button */}
      <button
        onClick={() => {
          // Reset the error.
          setError('')

          // Reset status.
          setStatus("answering")

          handleCheckAnswer()
        }}
      >
        Check
      </button>
    </>
  )
}


const Choices = ({ choices, questionStatus }: TChoicesProp) => {
  return (
    <div className="ps-1 grid grid-cols-1 gap-y-2">
      {choices.map(choice => (
          <Choice key={choice.prefixSymbol} questionStatus={questionStatus} prefixSymbol="" choice={choice} />
        ))
      }
    </div>  
  )
}


const Choice = ({ choice, questionStatus }: TChoiceProp) => {
  const {selectedAnswer, dispatch} = useSelectedChoiceContext()
  const selected = selectedAnswer?.prefixSymbol === choice.prefixSymbol

  return (
    <button      
      disabled={questionStatus === 'checked'}
      className={clsx("flex items-center max-w-max hover:bg-zinc-800/90 p-1 rounded-md",      
      {
        // "text-green-500": questionStatus === "checked" && choice.isCorrect,
        // "text-red-400": questionStatus === "checked" && !choice.isCorrect
        
      }
      )}
      onClick={() => {
        // console.log(choice)
        dispatch({type:"changed_selection", payload: choice})
      }}
    >

      {/* Result symbol */}
      {questionStatus === "checked" && choice.isCorrect &&
        <CheckIcon />        
      }

      {questionStatus === "checked" && !choice.isCorrect &&
        <Xicon />        
      }

      {/* Prefix symbol */}
      <span        
        className={clsx(
          "ms-1 rounded-full bg-gray-800 px-2 align-middle text-blue-500",
          {
            "outline outline-2 outline-offset-2 outline-blue-500": selected
          }
        )}
      >
        {choice.prefixSymbol}
      </span>

      {/* Text */}
      <span className={clsx("ms-2 ",
          {
            "text-green-500": questionStatus === "checked" && choice.isCorrect,
            "text-red-400": questionStatus === "checked" && !choice.isCorrect
          }
        )}
      >
        {choice.text}
      </span>

    </button>
  )
}

export default Question