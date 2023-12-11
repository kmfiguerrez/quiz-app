import type { TChoice, TQuestionResult } from "./definition";

type TAnswers = {
  selectedAnswers: Array<TChoice>
  correctAnswers: number
}

type TAnswer = TAnswers | TChoice


const getScore = (answer: TAnswer): number => {
  let score = 0

  // For multiple correct answers.
  if ("selectedAnswers" in answer)  {    
    const {selectedAnswers, correctAnswers} = answer
    let incorrectSelectedAnswers = 0
    let correctSelectedAnswers = 0

    // If selected answers is empty.
    if (!selectedAnswers.length) return score
    
    // Get the number of selected correct and incorrect numbers.
    selectedAnswers.map(a => {
      a.isCorrect ? correctSelectedAnswers++ : incorrectSelectedAnswers++      
    })
    // console.log('correct selected ans: ',correctSelectedAnswers)
    score = Number((correctSelectedAnswers / correctAnswers).toFixed(2))
    // console.log('score: ', score)
    return score
  }

  // For one correct answers only.
  return score = answer.isCorrect ? 1 : 0
}

const getTotalScore = (selectedQuestions: Array<TQuestionResult>): number => {
  let totalScore = 0
  // console.log('questions: ',selectedQuestions)
  selectedQuestions.map(question => {
    totalScore += question.score
  })
  console.log('score: ', totalScore)
  return totalScore
}



export  {getTotalScore, getScore}