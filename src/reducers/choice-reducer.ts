import type { TChoice } from "@/utils/definition"

type TRemoveAction = {
  type: 'removed_selection'
}

type TSelectedAnsAction = TRemoveAction | {
  type: 'changed_selection'
  payload: TChoice
}

const answerReducer = (state: TChoice | null, action: TSelectedAnsAction): TChoice | null => {
  switch(action.type) {
    case 'changed_selection': {
      return action.payload
    }
    case 'removed_selection': {
      return null
    }
    default: {
      // throw new Error("Unknown action")
      return null
    }
  }
}

// type TQuestionReducer = ReturnType<typeof choiceReducer>

export default answerReducer
export type { TSelectedAnsAction }