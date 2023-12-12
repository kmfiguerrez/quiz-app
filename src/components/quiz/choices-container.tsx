import cn from "@/utils/cn"
import { ReactNode } from "react"

type TChoicesProps = {
  children: ReactNode
  hasSelectedAnswer?: boolean
}

const ChoicesContainer = ({children, hasSelectedAnswer}: TChoicesProps) => {
  return (
    <div className={cn("pt-1",
        {
          "space-y-2": hasSelectedAnswer === true
        }
      )}
    >
      {children}
    </div>
  )
}

export default ChoicesContainer