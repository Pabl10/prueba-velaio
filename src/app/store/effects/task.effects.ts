import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TaskService } from '../../services/task.service';
import * as TaskActions from '../actions/task.actions';
import { catchError, map, mergeMap, of } from "rxjs";
import { Task } from "src/app/models/task.model";


@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  loadTasks$ = createEffect(() => 
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() => 
        this.taskService.getTasks()
        .pipe(
          map((tasks: Task[]) => TaskActions.loadTaskSuccess({ tasks })),
          catchError((error) =>
            of(TaskActions.loadTaskFailure({ error: error.message }))
          )
        )
      )
    )
  )
}