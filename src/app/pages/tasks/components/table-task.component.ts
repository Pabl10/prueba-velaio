import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TaskMock } from 'src/mocks/task.mock';
import { DataAdapter } from 'src/models/data-adapter.model';
import { Task } from 'src/models/task.model';
import { AdapterTask } from 'src/utils/adapterTask';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-table-task',
  templateUrl: './table-task.component.html',
  standalone: true,
  styleUrls: ['./table-task.component.scss'],
  imports: [NzTableModule, CommonModule, NzButtonModule, NzTagModule, NzDropDownModule],
})
export class TableTaskComponent implements OnInit {
  
  @Input() data: Task[] = [];
  tasks: DataAdapter[] = [];

  filteredTasks: any[] = [];

  constructor() { }

  ngOnInit() {
    this.tasks = AdapterTask(this.data, TaskMock);
    this.resetFilters();
  }

  sortByCompleted(): void {
    this.filteredTasks = this.tasks.filter(task => task.completed);
  }

  sortByPending(): void {
    this.filteredTasks = this.tasks.filter(task => !task.completed);
  }

  resetFilters(): void {
    this.filteredTasks = this.tasks;
  }

}
