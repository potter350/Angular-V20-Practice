
import { createReducer, on } from '@ngrx/store'
import * as todoActions from './todo.actions'
import {TodoState}  from './todo.model'

export const todoFeatureKey = 'todos'

export const initialState : TodoState = {
    item : [],
    isLoading : false,
    error:null
}

export const todosReducer = createReducer(
    initialState,

    //when action happnes, how to update state based on actions
    on(todoActions.loadTodos, (state) => ({
       ...state,
       isLoading:true,
       error:null
    }) ),

    on(todoActions.loadTodosSuccess, (state, {todo}) => ({
        ...state,
        isLoading:false,
        item : todo
    }) ),

    on(todoActions.addTodoFailure, (state , {error}) => ({
        ...state,
        isLoading:false,
        error: error.message || 'Failed to load Todos'
    })),

    on(todoActions.addTodo, (state)=>({
        ...state,
        isLoading:true,
        error:null
    })),

    on(todoActions.addTodoSuccess, (state, {todo}) => ({
         ...state,
         item: [...state.item, todo],
         isLoading:false
    }) ),

    on(todoActions.addTodoFailure, (state, {error})=>({
        ...state,
        isLoading:false,
        error: error.message || 'Failed to Add Your Todo'
    }) ),

    on(todoActions.editTodo, (state)=> ({
        ...state,
        isLoading:true,
        error:null
    })),

    on(todoActions.addTodoSuccess, (state, {todo} )=>({
        ...state,
        isLoading:false,
        item : state.item.map( (item) => item.id === todo.id ? todo : item )
    })),

    on(todoActions.loadTodoFailure, (state, {error})=>({
        ...state,
        isLoading:false,
        error: error.message || 'failed to update your todo'
    }) ),

    on(todoActions.deleteTodo, (state) =>({
        ...state,
        isLoading:true,
        error:null
    })),

    on(todoActions.deleteTodoSuccess, (state, {todoId})=>({
        ...state,
        isLoading:false,
        item : state.item.filter((item)=> item.id !== todoId )
    })),

    on(todoActions.deleteTodoFailure, (state, {error})=>({
        ...state,
        isLoading:false,
        error: error.message || 'failed to delete your todo'
    }))

    



)