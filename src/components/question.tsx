'use client'

import clsx from "clsx"
import { ReactNode, useState } from "react"

// Custom types.
import type { TChoice, TQuestion } from "@/utils/definition"

// Custom Providers.
import { useSelectedChoiceContext } from "@/context/choice-provider"

// Custom SVG icons.
import CheckIcon from "./svg/check-icon"
import Xicon from "./svg/x-icon"

// Custom utils.
import cn from "@/utils/cn"



type TQuestionProps = {
  question: TQuestion
}

type TQuestionStatus = 'answering' | 'checked'

type TChoicesProp = {
  children: ReactNode
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
        {/* Question text */}
        <p className="mb-1">
          {question.question}
        </p>        

        <Choices>
          {/* Passing choice component as a children prevents its
              parent component (choices) accepting props that it's
              never gonna use. See React context api doc.
          */}
          {question.choices.map(choice => (
            <Choice key={choice.prefixSymbol} questionStatus={status} prefixSymbol="" choice={choice} />
          ))
          }
        </Choices>
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


const Choices = ({ children }: TChoicesProp) => {
  return (
    <div className="ps-1 grid grid-cols-1 gap-y-2">
      {children}
    </div>  
  )
}


const Choice = ({ choice, questionStatus }: TChoiceProp) => {
  const {selectedAnswer, dispatch} = useSelectedChoiceContext()
  const selected = selectedAnswer?.prefixSymbol === choice.prefixSymbol

  return (
    <button      
      disabled={questionStatus === 'checked'}
      className={cn("flex items-center max-w-max hover:bg-zinc-800/90 p-1 rounded-md",      
      {
        "text-green-500": questionStatus === "checked" && choice.isCorrect,
        "text-red-500": questionStatus === "checked" && !choice.isCorrect
        
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
      <span className={cn(" ",
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