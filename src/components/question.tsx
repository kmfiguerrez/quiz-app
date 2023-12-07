'use client'

import type { TChoice, TQuestion } from "@/utils/definition"
import { useState } from "react"

type TQuestionProps = {
  question: TQuestion
}

type TChoicesProp = {
  choices: Array<TChoice>
}

type TChoiceProp = {
  choice: TChoice
}

const Question = ({ question }: TQuestionProps) => {
  return (
    <div
      className="border p-1 min-w-fit"
    >
      <p className="border w-max">
        {question.question}
      </p>
      <Choices choices={question.choices} />
    </div>
  )
}

const Choices = ({ choices }: TChoicesProp) => {
  return (
    <div>
      {choices.map(choice => (
          <Choice choice={choice} />
        ))
      }
    </div>  
  )
}

const Choice = ({ choice }: TChoiceProp) => {
  const [isClicked, setIsClicked] = useState(false)

  return (
    <button 
      className="block"
      onClick={() => setIsClicked(true)}
    >
      <span>{choice.prefixSymbol}</span>.
      <span className="ms-1">
        {choice.text}
      </span>
    </button>
  )
}

export default Question