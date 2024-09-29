import { createReducer, on } from "@ngrx/store";
import { addTask, loadTaskFailure, loadTasks, loadTaskSuccess, toggleStatusTask } from "../actions/task.actions";
import { DataAdapter } from "src/app/models/data-adapter.model";

export interface TaskState {
  tasks: DataAdapter[];
}

export const initialState: TaskState = {
  tasks: []
}

export const TaskReducer = createReducer(
  initialState,
  on(loadTasks, (state) => ({
    ...state,
    loading: true
  })),
  on(loadTaskSuccess, (state, { tasks }) =>({ 
    ...state, 
    tasks, 
    loading: false 
  })),

  on(loadTaskFailure, (state, { error }) => ({ 
    ...state, 
    error, 
    loading: false 
  })),

  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [task, ...state.tasks]
  })),
  on(toggleStatusTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.map((tasked) => (tasked.id === id ? { ...tasked, completed: !tasked.completed}: tasked))
  }))
)