import cn from '@/src/@libs/utils/_cn';
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'
interface IProps{
    className?: ClassNameValue;
}
const OfferPage :React.FC<IProps>= ({className}) => {
  return (
      <div className={cn(className, '')}>
          <h1 className='font-semibold text-2xl text-center mt-10'>There is no offer available at this moment !!!</h1>
    </div>
  )
}

export default OfferPage