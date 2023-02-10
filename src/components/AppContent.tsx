import React, {useState} from 'react'
import TodoItem from './TodoItem'
import AddTaskModal from './AddTaskModal'
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

type Props = {}

function AppContent({}: Props) {

  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

  const allTodos = useSelector((state: RootState) => state.todos.allTodos)

  const reversedAllTodos = [...allTodos].reverse();

  return (
    <>
      <AddTaskModal isOpen={addModalOpen} setOpen={setAddModalOpen}/>
      <div>
        <div className='mx-auto max-w-lg flex flex-col gap-2 bg-slate-300 p-4 rounded-lg '>
          <div className='flex justify-between'>
            <button className='button button--primary' onClick={()=>setAddModalOpen(true)}>Add Task</button>
          </div>
          {/* <TodoItem id={'sdada'} />
          <TodoItem id={'sdada'} />
          <TodoItem id={'sdada'} />
          <TodoItem id={'sdada'} /> */}
          {reversedAllTodos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo}/>
          })}
        </div>
      </div>
    </>
  )
}

export default AppContent