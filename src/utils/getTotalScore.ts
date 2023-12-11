import { TQuestionResult } from "./definition";

const getTotalScore = (selectedQuestions: Array<TQuestionResult>) => {
  let totalScore = 0

  selectedQuestions.map(question => {
    totalScore =+ question.score
  })

  return totalScore
}


export default getTotalScore