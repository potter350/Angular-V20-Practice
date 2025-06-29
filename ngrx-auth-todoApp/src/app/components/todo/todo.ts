import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as todoSelector from './../../todo/todo.selector'
import * as todoAction from './../../todo/todo.actions'
import { Todo as TodoModel } from '../../todo/todo.model';

@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.html',
  styleUrl: './todo.css'
})
export class Todo {
  private store = inject(Store)
  todo$ : Observable<TodoModel[]> = this.store.select(todoSelector.selectAllTodo) 
  isLoading$ : Observable<boolean | null> = this.store.select(todoSelector.selectIsTodoLoading)
  isError$ : Observable<string | null> = this.store.select(todoSelector.selectTodoError)

  newTask = ''
  updatedTask = ''

  ngOnInit(){
    this.store.dispatch(todoAction.loadTodos())
  }

  //add new todo
  

}
