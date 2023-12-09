type TLetter = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "f" | "h" | "i"

// mc stands for: multiple choice, and tof for: true or false
type TQuestionType = 'mc' | "tof"

type TChoice = {
  questionOwner?: string // id of the question it belongs to.
  prefixSymbol?: TLetter,
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

export type {TQuestions, TQuestion, TChoice}