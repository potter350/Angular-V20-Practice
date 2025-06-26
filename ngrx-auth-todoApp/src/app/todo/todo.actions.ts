import { createAction, props } from "@ngrx/store";
import { Todo } from "./todo.model";


//actions for loading todo
export const loadTodos = createAction(
    '[Todo Page] Load all Todo '
)

export const loadTodosSuccess = createAction(
    '[Todo Api] Todo load success',
    props<{todo:Todo[]}>()
)

export const loadTodoFailure = createAction(
    '[Todo API] Todo load failure ',
    props<{error:any}>()
)

//add todo
export const addTodo = createAction( '[Todo Api] add new todo ', props<{task:string}>() )
export const addTodoSuccess = createAction( '[Todo Api] add new todo success ', props<{todo: Todo}>() )
export const addTodoFailure = createAction( '[Todo Api] add new todo failure', props<{error:any}>() )

//edit todo
export const editTodo = createAction( '[Todo Api] edit todo', props<{todo:Partial<Todo>, id : string }>() )
export const editTodoSuccess = createAction( '[Todo Api]edit todo success ', props<{todo : Todo}>() )
export const editTodoFailure = createAction( '[Todo Api] edit todo failure', props<{error:any}>() )

// delete todo
export const deleteTodo = createAction( '[Todo Api] delete todo', props<{todoId:string}>() )
export const deleteTodoSuccess = createAction( '[Todo Api] delete todo success', props<{todoId:string}>() )
export const deleteTodoFailure = createAction( '[Todo Api] delete todo failure', props<{error:any}>() )