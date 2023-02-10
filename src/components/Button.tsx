import React,{ReactNode,ReactElement } from 'react'



function Button({children, ...rest} : {children?: ReactNode, rest:any[]}) : ReactElement {
  return (
    <button className='bg-slate-200 rounded-lg' {...rest}>
      {children}
    </button>
  )
}

export default Button

const log = (message : string) : void => {
    console.log(message)
}