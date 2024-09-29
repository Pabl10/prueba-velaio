import { createAction, props } from "@ngrx/store";
import { DataAdapter } from "src/app/models/data-adapter.model";
import { Task } from "src/app/models/task.model";


export const loadTasks = createAction(
  '[Tasks] Load Tasks'
)

export const loadTaskSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: DataAdapter[] }>()
)

export const loadTaskFailure = createAction(
  '[Tasks] Load Tasks Failure',
  props<{ error: string }>()
)


export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ task: DataAdapter }>()
)

export const toggleStatusTask = createAction(
  '[Tasks] Toggle Status Task',
  props<{ id: string | number }>()
)