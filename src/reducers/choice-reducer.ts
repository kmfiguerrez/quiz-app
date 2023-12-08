import type { TChoice } from "@/utils/definition"



type TChoiceAction = {
  type: 'changed_selection'
  payload: TChoice
}

const answerReducer = (state: TChoice | null, action: TChoiceAction): TChoice | null => {
  switch(action.type) {
    case 'changed_selection': {
      return action.payload
    }
    default: {
      // throw new Error("Unknown action")
      return null
    }
  }
}

// type TQuestionReducer = ReturnType<typeof choiceReducer>

export default answerReducer
export type { TChoiceAction }