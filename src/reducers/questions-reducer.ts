import type { TQuestionsResult } from "@/utils/definition"

type TRemoveAction = {
  type: 'removed_question'
  payload: {
    questionId: string
  }
}

type TSelectedQuestionAction = TRemoveAction | {
  type: 'added_question'
  payload: TQuestionsResult
}

type TSelectedQuestions = Array<TQuestionsResult>

const questionsReducer = (selectedQuestions: TSelectedQuestions, action: TSelectedQuestionAction): Array<TQuestionsResult> => {
  switch(action.type) {
    case 'added_question': {
      return [
        ...selectedQuestions,
        action.payload
      ]
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