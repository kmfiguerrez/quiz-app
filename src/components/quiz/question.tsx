'use client'

import { Dispatch, ReactNode, SetStateAction, useReducer, useRef, useState } from "react"

// Custom types.
import type { TChoice, TQuestion, TQuizData } from "@/utils/definition"

// Custom Providers.
import { useSelectedChoiceContext } from "@/context/choice-provider"

// Custom SVG icons.
import CheckIcon from "../svg/check-icon"
import Xicon from "../svg/x-icon"

// Custom utils.
import cn from "@/utils/cn"
import getPrefixSymbols from "@/utils/prefix-symbols"

// Reducers.
import answersReducer, { TSelectedAnswersAction } from "@/reducers/ma-reducer"
import answerReducer, { TSelectedAnsAction } from "@/reducers/sa-reducer"
import { getScore } from "@/utils/score"
import { getNextSelectedAnswers } from "@/utils/next-state"



type TQuestionProps = {
  question: TQuestion
  quizData: TQuizData
}

type TChoicesProps = {
  children: ReactNode
}

type TChoiceProps = {
  quizData: TQuizData
  choice: TChoice
  prefixSymbol: string
  questionData: {
    questionId: string
    numOfAnswers: number    
    hasSelectedAnswer: boolean    
    selectedAnswerState: {
      selectedAnswer: TChoice | null
      onDispatch1: Dispatch<TSelectedAnsAction>
    }
    selectedAnswersArrayState: {
      selectedAnswersArray: Array<TChoice>,
      onDispatch2: Dispatch<TSelectedAnswersAction>
    }
    questionIncluded: {
      isQuestionIncluded: boolean
      onSetIsQuestionIncluded: Dispatch<SetStateAction<boolean>>
    }
  }
}


const Question = ({ question, quizData }: TQuestionProps) => {  
    // Choose the reducer function based on the number of correct answers.  
  const [selectedAnswer, dispatch1] = useReducer(answerReducer, null)
  const [selectedAnswersArray, dispatch2] = useReducer(answersReducer, [])
  // Determine if question already included in the quiz component's 
  // questionsResult state.
  const [isQuestionIncluded, setIsQuestionIncluded] = useState(false)

  // Quiz component data.
  const {quizStatus} = quizData.quizState
  

  // Determine if user has selected an answer(s).
  let hasSelectedAnswer = false
  // Determine the score
  let score = 0

  // For question that has multiple correct answers.
  if (question.answers > 1) {
    // If user has selected an answer.
    if (selectedAnswersArray.length) {
      // If selectedAnswersArray is not zero, then user has chosen an answer.
      hasSelectedAnswer = true
    
      // Determine the score.      
      score = getScore({selectedAnswers: selectedAnswersArray, correctAnswers: question.answers})            
    }    
  }
  // For question that has only one correct answer.
  if (question.answers === 1) {
    // If user has selected an answer.
    if (selectedAnswer) {
      hasSelectedAnswer = true  
    
      // Determine the score.      
      score = getScore(selectedAnswer)      
    }
  }  

  // Used for getting prefix symbols.
  let index = 0

  // For error message.
  const showErrorMessage = quizData.hasChecked && !hasSelectedAnswer
  
  // Get span with letter f.
  const letterF = useRef(null)

  return (
    <>
      <p>{`Selected answer: ${selectedAnswer?.prefixSymbol}`}</p>

      {/* Display Question */}
      <div
        className="border p-1"
      >
        {/* Question text */}
        <p className="mb-1">
          <span>
            {question.questionText}
          </span>

          {/* Error Message */}          
          {showErrorMessage &&
            <span className="text-red-400">
              {question.answers > 1 ? (
                  ` - Select ${question.answers} answers.`
                ) : (
                  ' - Select an answer.'
                )
              }
            </span>
          }

          {/* Show score */}
          {quizStatus === "checked" && !showErrorMessage && 
            <span className="text-blue-500">
              {` ${score} point`}
            </span>
          }
          
        </p>

        <Choices>
          {/* Passing choice component as a children prevents its
              parent component (choices) accepting props that it's
              never gonna use. See React context api doc.
          */}                    
          {question.choices.map(choice => {
              const c =  <Choice 
                  key={choice.prefixSymbol} 
                  quizData={quizData}
                  prefixSymbol={getPrefixSymbols("letters", index)} 
                  choice={choice}                  
                  questionData={{
                    questionId: question.id,
                    numOfAnswers: question.answers,                    
                    hasSelectedAnswer,                    
                    selectedAnswerState: {selectedAnswer, onDispatch1: dispatch1},
                    selectedAnswersArrayState:{selectedAnswersArray, onDispatch2: dispatch2},
                    questionIncluded:{isQuestionIncluded, onSetIsQuestionIncluded: setIsQuestionIncluded}
                  }}
                />
              index++
              return c
            })
          }
          
        </Choices>
      </div>
      
    </>
  )
}


const Choices = ({ children }: TChoicesProps) => {
  return (
    <div className="ps-1 grid grid-cols-1 gap-y-2">
      {children}
    </div>  
  )
}


const Choice = ({ 
    choice,
    prefixSymbol, 
    quizData,     
    questionData 
  }: TChoiceProps) => {

  // Quiz component data.
  const {quizStatus, onSetQuizStatus} = quizData.quizState
  const {onSetSelectedQuestions} = quizData.quizSelectedQuestions
  // Qustion component data.
  const {
    questionId,
    hasSelectedAnswer,        
    numOfAnswers,
    selectedAnswerState,
    selectedAnswersArrayState,
    questionIncluded
  } = questionData

  const {selectedAnswer, onDispatch1} = selectedAnswerState
  const {selectedAnswersArray, onDispatch2} = selectedAnswersArrayState
  const {isQuestionIncluded, onSetIsQuestionIncluded} = questionIncluded

  
  // Determine if this choice is selected.
  let selected = false
  // For question that has multiple correct answers.
  if (numOfAnswers > 1) {
    const found = selectedAnswersArray.find(c => c.prefixSymbol === prefixSymbol)
    // found returns undefined if none of the elements satisfies the
    // condition. So used the !! operator to make undefined a boolean false
    // and turn the return value to boolean true.
    selected = !!found
  }  
  // For question that has only one answer.
  if (numOfAnswers === 1) {
    selected = selectedAnswer?.prefixSymbol === prefixSymbol
  }


  return (
    <button
      // Disable only if user has selected an answer and quiz component
      // has finished checking.
      disabled={quizStatus === 'checked' && hasSelectedAnswer}
      className={cn("flex items-center hover:bg-zinc-800/90 p-1 rounded-md max-w-max pe-3",      
      {
        "text-green-500": quizStatus === "checked" && hasSelectedAnswer && choice.isCorrect,
        "text-red-500": quizStatus === "checked" && hasSelectedAnswer && !choice.isCorrect        
      }
      )}
      onClick={() => {
        /**
         * This event handler function has two tasks.
         * 1. Set the selected answer in the Question component's 
         *    states(selectedAnswer and selectedAnswersArray).
         * 2. Include the question(question id and score) in the
         *    Quiz component's questionsResult.
         * Note:
         *    At initial render, selectedAnswer is equal to null         
         *    and selectedAnswersArray is equal to []. So we have
         *    to get around this to get the correct score.
        */
        
        // Here's the solution to get the correct score.
        const nextSelectedAnswer = choice
        // Get the previous selected answers array and the selected answer.
        const nextSelectedAnswersArray: Array<TChoice> = getNextSelectedAnswers(selectedAnswersArray, {...choice, prefixSymbol})        

        // Update the quiz state only if the check button has been clicked.
        quizData.hasChecked && onSetQuizStatus("answering")
      
        // Set the selected answer.

        // For question that has multiple correct answers.
        if (numOfAnswers > 1) {
          // If choice already selected and clicked (selected answer) again.
          if (selected) {
            // Removed the answer.
            onDispatch2({type: "removed_answer", payload: {prefixSymbol}})     

            // Remove the question from the list if user hasn't
            // seleted an answer.
            if (!nextSelectedAnswersArray.length) {
              // Removed the question in the questionsResult state of 
              // quiz component.
              onSetSelectedQuestions({type: "removed_question", payload: {questionId}})
              // Update the state isQuestionIncluded.              
              onSetIsQuestionIncluded(false)
            }
            return
          }

          // Otherwise not yet selected.
          onDispatch2({type:"added_answer", payload: {...choice, prefixSymbol}})

          // Add the question result(question id and score) to questionsResult state of quiz component
          // if user has selected an answer.
          if (isQuestionIncluded) {
            // Changed the question's payload results.            
            return onSetSelectedQuestions({type: "changed_question", payload: {questionId, score: getScore({selectedAnswers: nextSelectedAnswersArray, correctAnswers: numOfAnswers})}})                    
          }
          // Otherwise not yet included.
          // console.log('ano na: ', getScore({selectedAnswers: nextSelectedAnswersArray, correctAnswers: numOfAnswers}))                    
          onSetSelectedQuestions({type: "added_question", payload: {questionId, score: getScore({selectedAnswers: nextSelectedAnswersArray, correctAnswers: numOfAnswers})}})  
          // Update the state isQuestionIncluded.
          return  onSetIsQuestionIncluded(true)
        }
        

        // Everything below is for question that has one correct answer only.
        
        // Set the selected answer for selectedAnswer state.
        onDispatch1({type:"changed_selection", payload: {...choice, prefixSymbol}})
        
        // Add the question result(question id and score) to questionsResult state of quiz component.                        
        if (isQuestionIncluded) {          
          // Changed the question's payload results.
          return onSetSelectedQuestions({type: "changed_question", payload: {questionId, score: getScore(nextSelectedAnswer)}})                    
        }
        
        // Otherwise not yet included.
        onSetSelectedQuestions({type: "added_question", payload: {questionId, score: getScore(nextSelectedAnswer)}})
        // Update the state isQuestionIncluded.
        return  onSetIsQuestionIncluded(true)
      }}
    >

      {/* Result symbol */}
      {quizStatus === "checked" && hasSelectedAnswer && choice.isCorrect &&
        <CheckIcon />        
      }

      {quizStatus === "checked" && hasSelectedAnswer && !choice.isCorrect &&
        <Xicon />        
      }


      {/* Prefix symbol */}
      <span
        
        className={cn(
          "ms-1 me-3 rounded-full bg-gray-800 px-2 align-middle text-blue-500",
          {
            "outline outline-2 outline-offset-2 outline-blue-500 ": selected,
            "ms-2": quizStatus === "checked" && hasSelectedAnswer
          }
        )}
      >
        {prefixSymbol}
      </span>

      {/* Text */}
      <span className={cn("",
          {
            
          }
        )}
      >
        {choice.text}
      </span>

    </button>
  )
}

export default Question