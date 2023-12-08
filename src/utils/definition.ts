type TLetter = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "f" | "h" | "i"

type TChoice = {
  prefixSymbol?: TLetter,
  text: string
  isCorrect: boolean
}

type TQuestion = {
  question: string
  choices: Array<TChoice>  
}

type TQuestions = Array<TQuestion>

export type {TQuestions, TQuestion, TChoice}