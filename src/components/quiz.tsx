// Custom Providers.
import SelectedAnswerProvider from "@/context/choice-provider"

// Custom Components.
import Question from "./question"

// Data.
import Questions from '@/utils/data'
import MyCheckboxGroup from "./checkbox-group"



const Quiz = () => {
  return (
    <SelectedAnswerProvider>
      <Question question={Questions[0]} />
      {/* <MyCheckboxGroup question={Questions[0]} /> */}
    </SelectedAnswerProvider>
  )
}

export default Quiz