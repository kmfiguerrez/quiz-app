type TLetter = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "f" | "h" | "i"

// mc stands for: multiple choice, and tof for: true or false
type TQuestionType = 'mc' | "tof"

type TChoice = {
  prefixSymbol?: TLetter,
  text: string
  isCorrect: boolean
}

type TQuestion = {
  question: string
  choices: Array<TChoice>
  type: TQuestionType
  answers: number

}

type TQuestions = Array<TQuestion>

export type {TQuestions, TQuestion, TChoice}