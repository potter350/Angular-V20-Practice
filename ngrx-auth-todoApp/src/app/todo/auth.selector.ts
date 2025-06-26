import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TodoState } from "./todo.model";
import * as todoReducer from './todo.reducer'


export const todoAuthState = createFeatureSelector<TodoState>(todoReducer.todoFeatureKey)
//selector state - item,loading,error
export const selectAllTodo = createSelector(
    todoAuthState,
    (state)=> state.item
)
export const selectIsTodoLoading = createSelector(
    todoAuthState,
    (state)=> state.isLoading
)
export const selectTodoError = createSelector(
    todoAuthState,
    (state)=> state.error
)