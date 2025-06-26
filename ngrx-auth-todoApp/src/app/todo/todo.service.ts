import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, Observable, switchMap, throwError } from "rxjs";
import { Todo } from "./todo.model";
import {v4 as uuidv4} from 'uuid'

@Injectable({
    providedIn:'root'
})
export class TodoService{
    private http = inject(HttpClient)
    private todoUrl = 'http://localhost:3000/todos'

    // listTodo
    //add todo
    //edit todo
    //delete todo

    listAllTodo(userId:string):Observable<Todo[]> {
        return this.http.get<Todo[]>(`${this.todoUrl}/${userId}`).pipe(
            catchError(this.handleError)
        )
    }

    addTodo(userId:string, todo:Todo):Observable<Todo>{
       const newTodo:Todo = {
          id : uuidv4(),
          userid:todo.userid,
          task:todo.task,
          completed:todo.completed,
          createdAt:todo.createdAt
       }
       return this.http.post<Todo>(this.todoUrl, newTodo).pipe(
         catchError(this.handleError)
       )
    }

    //due to partial, id is mandatory thats mentioned here
    updateTodo(userId:string, todoUpdate:Partial<Todo> & {id:string} ):Observable<Todo>{
        return this.http.get<Todo>(`${this.todoUrl}/${userId}`).pipe(
           map(todo => 
             {if(todo.userid !== userId){
               throw new Error('You are not authorized to update todo')
             }
             return todo;
           }),
           switchMap(()=>
            this.http.patch<Todo>(`${this.todoUrl}/${todoUpdate.id}`, todoUpdate ).pipe(
                catchError(this.handleError)
            )
         )
        )
    }

       deleteTodo(userId:string, todoId:string):Observable<{}>{
        return this.http.get<Todo>(`${this.todoUrl}/${userId}`).pipe(
           map(todo => 
             {if(todo.userid !== userId){
               throw new Error('You are not authorized to delete todo')
             }
             return todo;
           }),
           switchMap(()=>
            this.http.delete<Todo>(`${this.todoUrl}/${todoId}`).pipe(
                catchError(this.handleError)
            )
         )
        )
    }

   

    handleError(error:any):Observable<never>{
        console.log('todo service error',error)
        return throwError(()=> new Error(error.message || 'todo service error'))
    }
}