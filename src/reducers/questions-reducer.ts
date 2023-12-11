import type { TQuestionResult } from "@/utils/definition"

type TRemoveAction = {
  type: 'removed_question'
  payload: {
    questionId: string
  }
}

type TSelectedQuestionAction = TRemoveAction | {
  type: 'added_question' | 'changed_question'
  payload: TQuestionResult
}

type TSelectedQuestions = Array<TQuestionResult>

const questionsReducer = (selectedQuestions: TSelectedQuestions, action: TSelectedQuestionAction): Array<TQuestionResult> => {
  switch(action.type) {
    case 'added_question': {
      return [
        ...selectedQuestions,
        action.payload
      ]
    }
    case 'changed_question': {
      return selectedQuestions.map(question => {
        if (question.questionId === action.payload.questionId) {
          return action.payload
        } else {
          return question
        }
      })
    }
    case 'removed_question': {
      return selectedQuestions.filter(question => question.questionId !== action.payload.questionId)
    }
    default: {
      throw new Error("Unknown action")
      // return null
    }
  }
}

// type TQuestionReducer = ReturnType<typeof choiceReducer>

export default questionsReducer
export type { TSelectedQuestionAction }