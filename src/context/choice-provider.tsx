'use client'

import { Dispatch, ReactNode, createContext, useReducer, useContext } from "react"

// Custom types.
import type { TSelectedAnsAction } from "@/reducers/choice-reducer"
import type { TChoice } from "@/utils/definition"

// Reducer functions.
import answerReducer from "@/reducers/choice-reducer"


type TChoiceContextProviderProps = {
  children: ReactNode
}


type TChoiceContext = {
  selectedAnswer: TChoice | null
  dispatch: Dispatch<TSelectedAnsAction>
}


const SelectedAnswerContext = createContext<TChoiceContext | null>(null)


// Initial state doesn't really matter unless you're gonna use it.
const initialState:TChoice = {
  prefixSymbol:"i",
  text: '',
  isCorrect: false
}

const SelectedAnswerProvider = ({ children }: TChoiceContextProviderProps) => {
  const [selectedAnswer, dispatch] = useReducer(answerReducer, null)

  return (
    <SelectedAnswerContext.Provider value={{selectedAnswer, dispatch}}>
      {children}
    </SelectedAnswerContext.Provider>
  )
}


// Custom hooks.
const useSelectedChoiceContext = () => {
  const choiceContext = useContext(SelectedAnswerContext)

  if (!choiceContext) throw new Error("ChoiceContext must be inside ChoiceContextProvider")

  return choiceContext
}


export default SelectedAnswerProvider
export { useSelectedChoiceContext }