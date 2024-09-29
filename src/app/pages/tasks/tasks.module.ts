import { NgModule } from '@angular/core';

import { TasksRoutingModule } from './tasks-routing.module';

import { TasksComponent } from './tasks.component';


@NgModule({
  imports: [TasksRoutingModule],
  declarations: [TasksComponent],
  exports: [TasksComponent]
})
export class TasksModule { }
