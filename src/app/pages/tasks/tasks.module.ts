import { NgModule } from '@angular/core';

import { TasksRoutingModule } from './tasks-routing.module';

import { TasksComponent } from './tasks.component';
import { TableTaskComponent } from './components/table-task.component';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [TasksRoutingModule, TableTaskComponent, CommonModule],
  declarations: [TasksComponent],
  exports: [TasksComponent, TableTaskComponent]
})
export class TasksModule { }
