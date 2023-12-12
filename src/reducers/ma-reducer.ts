import type { TChoice } from "@/utils/definition"

type TRemoveAction = {
  type: 'removed_answer'
  payload: {
    prefixSymbol: string
  }
}

type TSelectedAnswersAction = TRemoveAction | {
  type: 'added_answer'
  payload: TChoice
}

type TSelectedAnswers = Array<TChoice>

const answersReducer = (selectedAnswers: TSelectedAnswers, action: TSelectedAnswersAction): Array<TChoice> => {
  switch(action.type) {
    case 'added_answer': {
      return [
        ...selectedAnswers,
        action.payload
      ]
    }
    case 'removed_answer': {
      return selectedAnswers.filter(ans => ans.prefixSymbol !== action.payload.prefixSymbol)
    }
    default: {
      throw new Error("Unknown action")
      // return null
    }
  }
}

// type TQuestionReducer = ReturnType<typeof choiceReducer>

export default answersReducer
export type { TSelectedAnswersAction }