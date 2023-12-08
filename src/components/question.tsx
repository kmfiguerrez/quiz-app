'use client'

import clsx from "clsx"
import { useState } from "react"

// Custom types.
import type { TChoice, TQuestion } from "@/utils/definition"

// Custom Providers.
import { useSelectedChoiceContext } from "@/context/choice-provider"



type TQuestionProps = {
  question: TQuestion
}

type TChoicesProp = {
  choices: Array<TChoice>
}

type TChoiceProp = {
  choice: TChoice
  prefixSymbol: string
}


const Question = ({ question }: TQuestionProps) => {    
  const {selectedChoice} = useSelectedChoiceContext()
  const [isCorrect, setIsCorrect] = useState(false)
  const [status, setStatus] = useState<'answering' | 'checked'>('answering')
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
        className="border p-1 min-w-fit"
      >
        <p className="">
          {question.question}
        </p>
        <Choices choices={question.choices} />
      </div>
      
      {/* Check button */}
      <button
        onClick={() => {
          // Reset the error first.
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


const Choices = ({ choices }: TChoicesProp) => {
  return (
    <div className="ps-3">
      {choices.map(choice => (
          <Choice key={choice.prefixSymbol} prefixSymbol="" choice={choice} />
        ))
      }
    </div>  
  )
}


const Choice = ({ choice }: TChoiceProp) => {
  const {selectedChoice, dispatch} = useSelectedChoiceContext()

  return (
    <button      
      className={clsx("block",
      {
        "text-green-500" : selectedChoice?.prefixSymbol === choice.prefixSymbol
      }
      )}
      onClick={() => {
        // console.log(choice)
        dispatch({type:"changed_selection", payload: choice})
      }}
    >
      {/* Prefix symbol */}
      <span>{choice.prefixSymbol}</span>.
      {/* Text */}
      <span className="ms-1">
        {choice.text}
      </span>
    </button>
  )
}

export default Question