import type { TSelectedQuestionAction } from "@/reducers/questions-reducer"
import { Dispatch, SetStateAction } from "react"

type TLetter = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" |
                "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" |
                "t" | "u" | "v" | "w" | "x" | "y" | "z"

type TColorVariants = "blue" | "orange" | "pink" | "yellow" | "purple" | "white"

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
  questionText: string
  choices: Array<TChoice>
  type: TQuestionType
  answers: number
}

type TQuestions = Array<TQuestion>

type TQuizStatus = 'answering' | 'checked'

// Quiz component holds this data
type TQuestionResult = {
  questionId: string
  score: number
}

type TQuizData = {
  quizState: {
    quizStatus: TQuizStatus
    onSetQuizStatus: Dispatch<SetStateAction<TQuizStatus>>
  }
  quizSelectedQuestions: {
    selectedQuestions: Array<TQuestionResult>
    onSetSelectedQuestions: Dispatch<TSelectedQuestionAction>
  }
  hasChecked: boolean  
}



export type {
  TQuestions, 
  TQuestion, 
  TChoice,
  TQuizStatus,
  TQuizData,
  TQuestionResult,
  TColorVariants
}