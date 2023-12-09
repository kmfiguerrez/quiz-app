import { Dispatch, SetStateAction } from "react"

type TLetter = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" |
                "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" |
                "t" | "u" | "v" | "w" | "x" | "y" | "z"

// mc stands for: multiple choice, and tof for: true or false
type TQuestionType = 'mc' | "tof"

type TChoice = {
  questionOwner?: string // id of the question it belongs to.
  prefixSymbol?: string,
  text: string
  isCorrect: boolean
}

type TQuestion = {
  id: string
  question: string
  choices: Array<TChoice>
  type: TQuestionType
  answers: number
}

type TQuestions = Array<TQuestion>

type TQuizStatus = 'answering' | 'checked'

type TQuizState = {
  quizStatus: TQuizStatus
  onSetQuizStatus: Dispatch<SetStateAction<TQuizStatus>>
}

export type {
  TQuestions, 
  TQuestion, 
  TChoice,
  TQuizStatus,
  TQuizState
}