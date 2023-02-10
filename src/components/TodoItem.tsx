import React, {useState} from 'react'
import { FaPen, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { changeStatus, deleteItem, Status, Todo, update } from '../features/todo/todoSlice';
import Checkbox from './Checkbox';
import EditModal from './EditModal';
import {toast} from 'react-hot-toast'



type Props = {
    todo: Todo
}


function TodoItem({todo}: Props) {

    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    const dispatch = useDispatch()


    const [checked, setChecked] = useState<boolean>(false)

    const [title, setTitle] = useState<string>("Task Title")
    const [status, setStatus] = useState<Status>("Incompleted")

    const handleCheck = ()=>{
        console.log("I got checked!");
        dispatch(changeStatus(todo.id))
    }

    const deleteTodo = ()=>{
        dispatch(deleteItem(todo))
        toast.success("Task deleted!")
    }


  return (
    <>
      <EditModal isOpen={editModalOpen} setOpen={setEditModalOpen} todo={todo}/>       
        <div className='bg-white p-4 rounded-md'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-4 flex-1'>
                    {/* <FaBeer className='h-8 w-8'/> */}
                    {/* <div className='h-6 w-6 rounded-md bg-slate-300'/> */}
                    <Checkbox checked={todo.status === "Completed" ? true : false} onClick={handleCheck}/>
                    <p className={`${todo.status === "Completed" ? 'line-through' : ''} inline-block`}>{todo.title}</p>
                </div>
                <div className='flex align-middle gap-4'>
                    <div className='p-2 md:hover:bg-slate-300 rounded-md' onClick={()=>deleteTodo()}>
                        <FaTrash className='h-6 w-6 text-red-500'/>
                    </div>
                    <div className='p-2 md:hover:bg-slate-300 rounded-md' onClick={()=>{setEditModalOpen((true))}}>
                        <FaPen className='h-6 w-6 text-blue-500'/>
                    </div>
                </div>
            </div>
        </div>
    </>
  ) 
}

export default TodoItem