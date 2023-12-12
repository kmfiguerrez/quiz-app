import type { TChoice } from "./definition"
  


const getNextSelectedAnswers = (currentState: Array<TChoice>, selectedAnswer: TChoice): Array<TChoice> => {
  let nextState: Array<TChoice> = []  

  // If array is empty.
  if (!currentState.length) return nextState = [selectedAnswer]

  // Check if already exists.
  const found = currentState.find(answer => answer.prefixSymbol === selectedAnswer.prefixSymbol)


  // If it doesn't exists, add it.
  if (!found) return nextState = [...currentState, selectedAnswer]

  // If already exists, remove it.  
  nextState = currentState.filter(answer => answer.prefixSymbol !== selectedAnswer.prefixSymbol )

  return nextState

}

export { getNextSelectedAnswers }