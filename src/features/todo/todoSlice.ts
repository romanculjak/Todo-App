import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";


export type Status = "Completed" | "Incompleted"

export interface Todo {
    id: string,
    title: string,
    status: Status
}

export type TodosState = {
    allTodos: Todo[]
}

export const getLocalTodos = (): Todo[] =>{


    const localTodoList = window.localStorage.getItem('todoList');
    if(localTodoList){
        return JSON.parse(localTodoList) as Todo[]
    }

    return []
}

const initialValue : TodosState = {
    allTodos: getLocalTodos()
}


export const todoSlice = createSlice({
    name: 'todos',
    initialState: initialValue,
    reducers:{
        add: (state, action:PayloadAction<Todo>) =>{
            state.allTodos.push(action.payload)
            window.localStorage.setItem('todoList', JSON.stringify(state.allTodos))
        },
        update: (state, action:PayloadAction<Todo>)=>{
            const newAllTodos = state.allTodos.map((todo) => {
                if(todo.id === action.payload.id){
                    console.log('todo id is: ', todo.id, 'payload id: ', action.payload.id)
                    return action.payload
                }
                else{
                    return todo
                }
            })

            state.allTodos = newAllTodos
         
            window.localStorage.setItem('todoList', JSON.stringify(state.allTodos))

        },
        deleteItem: (state, action:PayloadAction<Todo>)=>{
            const newAllTodos = state.allTodos.filter((todo) => {
                return todo.id !== action.payload.id
            })

            state.allTodos = newAllTodos
         
            window.localStorage.setItem('todoList', JSON.stringify(state.allTodos))

        },
        changeStatus:(state, action:PayloadAction<string>)=>{
            const newAllTodos = state.allTodos.map((todo) => {
                if(todo.id === action.payload){
                    console.log('todo id is: ', todo.id, 'payload id: ', action.payload)

                    const updatedTodo: Todo = {
                        ...todo,
                        status: todo.status === "Completed" ? "Incompleted" : "Completed"
                    }

                    return updatedTodo
                }
                else{
                    return todo
                }
            })

            state.allTodos = newAllTodos
         
            window.localStorage.setItem('todoList', JSON.stringify(state.allTodos))
        },

    }

})

export const {add, update, changeStatus,deleteItem} = todoSlice.actions 
export default todoSlice.reducer

