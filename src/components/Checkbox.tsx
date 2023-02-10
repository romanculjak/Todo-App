import React from 'react'
import { FaBeer, FaCheck, FaPen, FaTrash } from 'react-icons/fa';


type Props = {
    checked: boolean
    onClick: ()=>void
}

function Checkbox({checked, onClick}: Props) {
  return (
    <div className={`h-6 w-6 p-1 rounded-md ${checked ? 'bg-purple-500 md:hover:bg-purple-700' :'bg-slate-300 md:hover:bg-slate-500'} `} onClick={onClick}>
        {checked && <FaCheck className='w-full h-full text-white'/>}
    </div>
  )
}

export default Checkbox