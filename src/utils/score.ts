import type { TChoice, TQuestionResult } from "./definition";

type TMultipleAnswer = {
  selectedAnswers: Array<TChoice>
  correctAnswers: number
}

type TSingleAnswer = TChoice | null

type TAnswer = TMultipleAnswer | TSingleAnswer


const getScore = (answer: TAnswer): number => {
  let score = 0

    // If answer is null or undefined, return 0.
    if (!answer) return score

  // For multiple correct answers.
  if ("selectedAnswers" in answer)  {    
    const {selectedAnswers, correctAnswers} = answer
    let incorrectSelectedAnswers = 0
    let correctSelectedAnswers = 0

    // If selected answers is empty, return 0.
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