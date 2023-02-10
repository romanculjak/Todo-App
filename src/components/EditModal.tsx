import { totalmem } from 'os';
import { toNamespacedPath } from 'path';
import React, {useState, useEffect} from 'react'
import { RxCross1 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { deleteItem, Status, Todo, update } from '../features/todo/todoSlice';
import {toast} from 'react-hot-toast'


type Props = {
    isOpen:boolean,
    setOpen: (open:boolean)=>void
    todo: Todo
}

function EditModal({isOpen, setOpen, todo}: Props) {

    const [titleHolder, setTitle] = useState<string>("")
    const [statusHolder, setStatus] = useState<Status>("Incompleted")

    const [errorMessage, setErrorMessage] = useState<string>("")


    const dispatch = useDispatch();

    const handleSubmit = (e : React.SyntheticEvent)=> {

        e.preventDefault();
        //if empty or not changed or shorter than 3 char
        console.log({titleHolder, statusHolder})
        console.log('submited')

        dispatch(update({...todo, title: titleHolder, status:statusHolder}))

        setTitle("")
        setStatus("Incompleted")
        setErrorMessage("")

        toast.success('Task edited')

        setOpen(false)

    }

    const deleteTask = () => {
        dispatch(deleteItem(todo))
        toast.success('Task deleted')

        setOpen(false)
        
    }


    const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        setTitle(e.target.value);
    }

    const statusChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        
        setStatus(e.target.value === 'completed' ? 'Completed' : 'Incompleted');
    }

    const editEnabled = titleHolder.length > 3 && (titleHolder !== todo.title || statusHolder !== todo.status);

    useEffect(()=>{

        setTitle(todo.title);
        setStatus(todo.status);

    },[todo])

    useEffect(()=>{

        if(titleHolder.length<=3){
            setErrorMessage("Title needs to be at least 3 character long!");
            
        }
        else if(titleHolder === todo.title && statusHolder === todo.status){
            setErrorMessage("At least one value needs to be updated!");

        }
        else{
            setErrorMessage("");  
        }

    },[titleHolder,statusHolder, todo])

  return (
    isOpen ?
    <div className='absolute top-0 left-0 bg-[#00000050] w-screen h-screen z-100'>
        <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg p-2'>
            <div className='bg-white p-4 w-full rounded-md'>
                <div className='flex justify-end'>
                    <button className='button button--exit' onClick={()=>setOpen(false)}><RxCross1 className='w-4 h-4'/></button>
                </div>
                <form className='flex flex-col gap-2' id='editForm' onSubmit={(e)=>handleSubmit(e)}>
                    <label className='flex flex-col gap-2'>
                        Title
                         <input type='text' value={titleHolder} onChange={(e)=>titleChange(e)} id='title' placeholder='Title' className='p-2 bg-slate-200 rounded-sm focus:outline-indigo-500' />
                    </label>
                    <label className='flex flex-col gap-2'> 
                        Status
                        <select value={statusHolder === "Completed" ? "completed" : "incompleted"} className='bg-slate-200 p-2 text-gray-800 focus:outline-indigo-500' onChange={(e)=>statusChanged(e)}>
                            <option value='incompleted' className='p-2'>Incompleted</option>
                            <option value='completed' className='p-2'>Completed</option>
                        </select>
                    </label>
                </form>
                {errorMessage.length>0 ? <div className='mt-2'>
                    <p className='text-red-400'>{errorMessage}</p>
                </div> : <></>}
                <div className='mt-8'>
                    <button className={`button button--primary ${!editEnabled ? 'button--disabled' : ''} mr-2`} disabled = {!editEnabled} type='submit' form='editForm'>Edit task</button>
                    <button className='button button--secondary mr-2' onClick={deleteTask}>Delete task</button>
                </div>
            </div>
        </div>
    </div>
    :
    <></>
  )
}

export default EditModal