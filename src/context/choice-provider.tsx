'use client'

import { Dispatch, ReactNode, createContext, useReducer, useContext } from "react"

// Custom types.
import type { TChoiceAction } from "@/reducers/choice-reducer"
import type { TChoice } from "@/utils/definition"

// Reducer functions.
import choiceReducer from "@/reducers/choice-reducer"


type TChoiceContextProviderProps = {
  children: ReactNode
}


type TChoiceContext = {
  selectedChoice: TChoice | null
  dispatch: Dispatch<TChoiceAction>
}


const SelectedChoiceContext = createContext<TChoiceContext | null>(null)


// Initial state doesn't really matter unless you're gonna use it.
const initialState:TChoice = {
  prefixSymbol:"i",
  text: '',
  isCorrect: false
}

const SelectedChoiceProvider = ({ children }: TChoiceContextProviderProps) => {
  const [selectedChoice, dispatch] = useReducer(choiceReducer, null)

  return (
    <SelectedChoiceContext.Provider value={{selectedChoice, dispatch}}>
      {children}
    </SelectedChoiceContext.Provider>
  )
}


// Custom hooks.
const useSelectedChoiceContext = () => {
  const choiceContext = useContext(SelectedChoiceContext)

  if (!choiceContext) throw new Error("ChoiceContext must be inside ChoiceContextProvider")

  return choiceContext
}


export default SelectedChoiceProvider
export { useSelectedChoiceContext }