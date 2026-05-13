import cn from '@/src/@libs/utils/_cn'
import React from 'react'
import { ClassNameValue } from 'tailwind-merge'
interface IProps{
  className?:ClassNameValue
}
const ContactPage:React.FC<IProps> = ({className}) => {
  return (
    <div className={cn(className)}>ContactPage</div>
  )
}

export default ContactPage