import Footer from '@/src/@base/layout/Footer'
import LandingHeader from '@/src/@base/layout/LandingHeader'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
      <main>
          <LandingHeader/>
          {children}
          <Footer/>
    </main>
  )
}

export default layout