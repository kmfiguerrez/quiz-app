'use client'

import {NextUIProvider as NUIProvider} from '@nextui-org/react'

const NextuiProvider = ({children}: { children: React.ReactNode }) => {
  return (
    <NUIProvider>
      {children}
    </NUIProvider>
  )
}

export default NextuiProvider