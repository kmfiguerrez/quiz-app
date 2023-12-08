// Custom Providers.
import SelectedChoiceProvider from "@/context/choice-provider"

// Custom Components.
import Question from "./question"

// Data.
import Questions from '@/utils/data'


const Quiz = () => {
  return (
    <SelectedChoiceProvider>
      <Question question={Questions[0]} />
    </SelectedChoiceProvider>
  )
}

export default Quiz