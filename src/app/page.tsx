import Question from '@/components/question'
import Image from 'next/image'
import Questions from '@/utils/data'

export default function Home() {
  return (
    <main className="">
      <Question question={Questions[0]} />
    </main>
  )
}
