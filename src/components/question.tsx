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
  const {selectedChoice} = useSelectedChoiceContext()
  const [isCorrect, setIsCorrect] = useState(false)
  const [status, setStatus] = useState<TQuestionStatus>('answering')
  const [error, setError] = useState('')
  // console.log('Selected choice: ', selectedChoice)
  // console.log('Error: ', error)

  // Check answer.
  const handleCheckAnswer = () => {
    // If haven't selected an asnwer yet.
    if (!selectedChoice) {
      return setError('Select an answer first.')
    }

    // Determine if selected answer is correct.
    selectedChoice?.isCorrect ? setIsCorrect(true) : setIsCorrect(false)

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
            "text-green-500": isCorrect,
            "text-red-500": !isCorrect
          })}
        >
          {isCorrect ? "Correct" : "Wrong"}
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
    <div className="ps-1">
      {choices.map(choice => (
          <Choice key={choice.prefixSymbol} questionStatus={questionStatus} prefixSymbol="" choice={choice} />
        ))
      }
    </div>  
  )
}


const Choice = ({ choice, questionStatus }: TChoiceProp) => {
  const {selectedChoice, dispatch} = useSelectedChoiceContext()

  return (
    <button
      disabled={questionStatus === 'checked'}
      className={clsx("flex mb-1 items-center",      
      {
        "text-green-500": questionStatus === "checked" && choice.isCorrect,
        "text-red-400": questionStatus === "checked" && !choice.isCorrect
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
      <span className="ms-1">{choice.prefixSymbol}</span>.      
      {/* Text */}
      <span className="ms-1">
        {choice.text}
      </span>
      {selectedChoice?.prefixSymbol === choice.prefixSymbol &&
        <span className="text-white"> - you selected</span>
      }

    </button>
  )
}

export default Question