import { ReactNode } from "react"

type TChoicesProps = {
  children: ReactNode
}

const ChoicesContainer = ({children}: TChoicesProps) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default ChoicesContainer