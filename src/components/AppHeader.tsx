import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { add, getLocalTodos } from '../features/todo/todoSlice';

type Props = {}

function AppHeader({}: Props) {


  const dispatch = useDispatch()
  
  //delete this this is testing code
  useEffect(() => {
    
    
    // dispatch(add({id:1, title: 'bogus Title', status:'Incompleted'}))


    console.log(getLocalTodos());

    
  }, [])
  
  return (
    <div className='flex justify-center py-8 px-2'>
      <div className='text-center'>
        <h1 className='text-xl'>Simple todo app.</h1>
      </div>
      

    </div>
  )
}

export default AppHeader