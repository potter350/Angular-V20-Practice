import { inject, Injectable } from "@angular/core";
import { TodoService } from "./todo.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import * as fromTodoAction from './todo.actions'
import * as AuthSelector from './../auth/auth.selector'
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, filter, map, of, withLatestFrom } from "rxjs";

@Injectable()
export class TodoEffects {

    private action$ = inject(Actions)
    private apiService = inject(TodoService)
    private router = inject(Router)
    private store = inject(Store)

    //create effects for loadtodo...when loadtodo happens listen trigger side effetcs
    loadAllTodos$ = createEffect(() =>
        this.action$.pipe(
            ofType(fromTodoAction.loadTodos),
            withLatestFrom(this.store.select(AuthSelector.selectUserId)),
            filter(([action, userId]) => userId !== null),
            exhaustMap(([action, userId]) =>
                this.apiService.listAllTodo(userId!).pipe(
                    map(todo =>
                        fromTodoAction.loadTodosSuccess({ todo })
                    ),
                    catchError(error => of(fromTodoAction.loadTodoFailure({ error })))
                )
            )
        )
    )

    addTodo$ = createEffect(() => 
        this.action$.pipe(
            ofType(fromTodoAction.addTodo),
            withLatestFrom(this.store.select(AuthSelector.selectUserId)),
            filter(([action,userId])=> userId !== null),
            exhaustMap(([action,userId]) => 
                this.apiService.addTodo(userId!, action.task).pipe(
                    map(todo => 
                        fromTodoAction.addTodoSuccess({todo})
                    ),
                    catchError(error => of(fromTodoAction.addTodoFailure({error})))
                )
            )

        )
    )


    updateTodo$ = createEffect(() => 
        this.action$.pipe(
            ofType(fromTodoAction.editTodo),
            withLatestFrom(this.store.select(AuthSelector.selectUserId)),
            filter(([action,userId])=> Boolean(userId)),
            exhaustMap(([action,userId])=>
               this.apiService.updateTodo(userId!, {...action.todo, id:action.id} ).pipe(
                map(todo => 
                    fromTodoAction.editTodoSuccess({todo})
                ),
                catchError(error => of(fromTodoAction.editTodoFailure({error})))
               )
            )
        )
    )

    deleteTodo$ = createEffect(()=>
            this.action$.pipe(
                ofType(fromTodoAction.deleteTodo),
                withLatestFrom(this.store.select(AuthSelector.selectUserId)),
                filter(([action,userId])=> Boolean(userId)),
                exhaustMap(([action,userId])=> 
                    this.apiService.deleteTodo(userId!, action.todoId).pipe(
                        map(todoId => fromTodoAction.deleteTodoSuccess({todoId : action.todoId}) ),
                        catchError(error => of(fromTodoAction.deleteTodoFailure({error})) )
                    )
                )
            )
    )
}