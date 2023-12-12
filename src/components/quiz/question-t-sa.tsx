
import { Dispatch, useReducer } from 'react'

// Shared component.
import ChoicesContainer from './choices-container'

// Custom types.
import type { TChoice, TColorVariants, TQuestion, TQuizData } from '@/utils/definition'

// Reducer function.
import answerReducer, { TSelectedAnsAction } from '@/reducers/sa-reducer'

// Custom SVG icons.
import CheckIcon from "../svg/check-icon"
import Xicon from "../svg/x-icon"

// Custom utils.
import cn from '@/utils/cn'
import getPrefixSymbols from '@/utils/prefix-symbols'
import { getScore } from '@/utils/score'




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
    selectedAnswerState: {
      selectedAnswer: TChoice | null
      onDispatch: Dispatch<TSelectedAnsAction>
    }
  }
}



// TSA means Type Single Answer.
const QuestionTSA = ({question, quizData, colorVariant, className}: TQuestionTSAProps) => {
  const [selectedAnswer, dispatch] = useReducer(answerReducer, null)

  // Quiz component data.
  const {quizStatus} = quizData.quizState


  // Determine if user has selected an answer(s).
  let hasSelectedAnswer = !!selectedAnswer
  // Determine the score
  let score = getScore(selectedAnswer)
  
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
            {` - Select an answer.`}
          </span>
        }

        {/* Show score */}
        {quizStatus === "checked" && !showErrorMessage &&
          <span className="text-blue-500">
            {` - ${score} point`}
          </span>
        }
      </p>

      <ChoicesContainer>
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
                hasSelectedAnswer,
                colorVariant,
                selectedAnswerState: {selectedAnswer, onDispatch: dispatch}
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
    colorVariant='white',        
    selectedAnswerState,        
  } = questionData  
  const {selectedAnswer, onDispatch} = selectedAnswerState

  
  // Determine if the question is included in the Quiz's selectedQuestions state.
  const isQuestionIncluded = !!(selectedQuestions.find(q => q.questionId === questionId))

  // Determine if this choice is selected.
  let selected = selectedAnswer?.prefixSymbol === prefixSymbol
  
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
        "text-red-500": checkedAnswers && hasSelectedAnswer && !choice.isCorrect        
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
        const nextSelectedAnswer = choice

        // Update the quiz state only if the check button has been clicked.
        quizData.hasChecked && onSetQuizStatus("answering")

        // 1. Set the selected answer.
        onDispatch({type: 'changed_selection', payload: {...choice, prefixSymbol}})

        // 2. Add the question results(question id and score) to Quiz's selectedQuestions state.
        if (isQuestionIncluded) {
          // Changed the question's payload results.
          return onSetSelectedQuestions({type: 'changed_question', payload: {questionId, score: getScore(nextSelectedAnswer)}})
        }
        // Otherwise not yet include.
        onSetSelectedQuestions({type: 'added_question', payload:{questionId, score: getScore(nextSelectedAnswer)}})
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

export default QuestionTSA