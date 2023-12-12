
import { Dispatch, useReducer } from 'react'

// Shared component.
import ChoicesContainer from './choices-container'

// Custom types.
import type { TChoice, TColorVariants, TQuestion, TQuizData } from '@/utils/definition'

// Reducer function.
import answersReducer, { TSelectedAnswersAction } from '@/reducers/ma-reducer'

// Custom SVG icons.
import CheckIcon from "../svg/check-icon"
import Xicon from "../svg/x-icon"

// Custom utils.
import cn from '@/utils/cn'
import getPrefixSymbols from '@/utils/prefix-symbols'
import { getScore } from '@/utils/score'
import { getNextSelectedAnswers } from '@/utils/next-state'




type TQuestionTSAProps = {
  question: TQuestion
  quizData: TQuizData
  colorVariant?: TColorVariants
  className?: string
}

type TChoiceProps = {
  quizData: TQuizData
  choice: TChoice
  prefixSymbol: string
  questionData: {
    questionId: string   
    hasSelectedAnswer: boolean
    colorVariant?: TColorVariants  
    numOfCorrectAnswers: number
    selectedAnswersState: {
      selectedAnswers: Array<TChoice>
      onDispatch: Dispatch<TSelectedAnswersAction>
    }
  }
}



// TSA means Type Single Answer.
const QuestionTMA = ({question, quizData, colorVariant, className}: TQuestionTSAProps) => {
  const [selectedAnswers, dispatch] = useReducer(answersReducer, [])

  // Quiz component data.
  const {quizStatus} = quizData.quizState

  // Determine if user has selected an answer(s).
  let hasSelectedAnswer = !!selectedAnswers.length

  // Determine the score.
  let score = getScore({selectedAnswers, correctAnswers: question.answers})
  
  // For error message.
  const showErrorMessage = quizData.hasChecked && !hasSelectedAnswer

  // Used for getting prefix symbols.
  let index = 0  
  

  
  return (
    <div className={cn("", className)}
    >

      {/* Question text */}
      <p className="mb-1">
        <span>
          {question.questionText}
        </span>

        {/* Error Message */}
        {showErrorMessage &&
          <span className="text-red-400">
            {` - Select ${question.answers} answer.`}
          </span>
        }

        {/* Show score */}
        {quizStatus === "checked" && !showErrorMessage &&
          <span className="text-blue-500">
            {` - ${score} point`}
          </span>
        }
      </p>

      <ChoicesContainer hasSelectedAnswer={hasSelectedAnswer}>
        {/* Passing choice component as a children prevents its
            parent component (choices) accepting props that it's
            never gonna use. See React context api doc.
        */}         
        {question.choices.map(choice => {
            const prefixSymbol = getPrefixSymbols("letters", index)
            const c = <Choice 
              key={prefixSymbol}
              choice={choice} 
              prefixSymbol={prefixSymbol}
              quizData={quizData}
              questionData={{
                questionId: question.id,
                colorVariant,                
                hasSelectedAnswer,                
                numOfCorrectAnswers: question.answers,
                selectedAnswersState: {selectedAnswers, onDispatch: dispatch}
              }}
            />
            index++
            return c
          })
        }
      </ChoicesContainer>
    </div>
  )
}




const Choice = ({choice, prefixSymbol, questionData, quizData}: TChoiceProps) => {
  // Quiz component data.
  const {quizStatus, onSetQuizStatus} = quizData.quizState
  const {selectedQuestions, onSetSelectedQuestions} = quizData.quizSelectedQuestions
  // Qustion component data.  
  const {
    questionId,
    hasSelectedAnswer,
    numOfCorrectAnswers,
    colorVariant='white',
    selectedAnswersState,       
  } = questionData  
  const {selectedAnswers, onDispatch} = selectedAnswersState

  // Determine if the question is included in the Quiz's selectedQuestions state.
  const isQuestionIncluded = !!(selectedQuestions.find(q => q.questionId === questionId))

  // Determine if this choice is selected.
  let selected = !!(selectedAnswers.find(answer => answer.prefixSymbol === prefixSymbol))
  
  // Determine if it's time to check the answers.
  const checkedAnswers = quizStatus === "checked" && hasSelectedAnswer

  return (
    <button
      // Disable only if user has selected an answer and quiz component
      // has finished checking.
      disabled={checkedAnswers}
      className={cn("flex items-center hover:bg-zinc-800/90 p-1 rounded-md max-w-max pe-3",      
      {        
        "text-green-500": checkedAnswers && choice.isCorrect,
        "text-red-500": checkedAnswers && !choice.isCorrect,            
      }
      )}    
      onClick={() => {
        /**
         * This event handler function has two tasks.
         * 1. Set the selected answer in the Question component's 
         *    states(selectedAnswer).
         * 2. Include the question(question id and score) in the
         *    Quiz component's selectedQuestions.
         * Note:
         *    At initial render, selectedAnswer is equal to null.
         *    So we have to get around this to get the correct score.
         */

        // Here's the solution to get the correct score.
        // Get the previous selected answers array and the selected answer.
        const nextSelectedAnswers: Array<TChoice> = getNextSelectedAnswers(selectedAnswers, {...choice, prefixSymbol})  

        // Update the quiz state only if the check button has been clicked.
        quizData.hasChecked && onSetQuizStatus("answering")

        // 1. Set the selected answer.
        // If choice already selected and clicked (selected answer) again.
        if (selected) {
          // Remove the answer from the selected answers state.
          onDispatch({type: 'removed_answer', payload: {prefixSymbol}})

          // If the user hasn't selected an answer, remove the question from the selected questions state.
          if (!nextSelectedAnswers.length) onSetSelectedQuestions({type: 'removed_question', payload: {questionId}})

          // Exit.
          return 
        }
        // Otherwise not yet selected.
        onDispatch({type: 'added_answer', payload: {...choice, prefixSymbol}})

        // 2. Add the question results(question id and score) to Quiz's selectedQuestions state.
        if (isQuestionIncluded) {
          // Changed the payload: question's results.
          return onSetSelectedQuestions({type: 'changed_question', payload: {questionId, score: getScore({selectedAnswers: nextSelectedAnswers, correctAnswers: numOfCorrectAnswers})}})
        }
        // Otherwise not yet included.
        onSetSelectedQuestions({type: 'added_question', payload:{questionId, score: getScore({selectedAnswers: nextSelectedAnswers, correctAnswers: numOfCorrectAnswers})}})
        
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
          "ms-1 me-3 rounded-full bg-gray-800 px-2 align-middle",
          {
            "ms-2": quizStatus === "checked" && hasSelectedAnswer,
            "outline outline-2 outline-offset-2 outline-white": selected && colorVariant,
            "text-pink-500": colorVariant === 'pink',
            "outline-pink-500": selected && colorVariant === 'pink',
            "text-blue-500": colorVariant === 'blue',
            "outline-blue-500": selected && colorVariant === 'blue',
            "text-yellow-500": colorVariant === 'yellow',
            "outline-yellow-500": selected && colorVariant === 'yellow',
            "text-orange-500": colorVariant === 'orange',
            "outline-orange-500": selected && colorVariant === 'orange',
            "text-purple-500": colorVariant === 'purple',
            "outline-purple-500": selected && colorVariant === 'purple',
          }                      
        )}
      >
        {prefixSymbol}
      </span>

      {/* Text */}
      <p className={cn("text-sm")}>
        {choice.text}
      </p>

    </button>
  )
}

export default QuestionTMA