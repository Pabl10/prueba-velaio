import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Store } from '@ngrx/store';
import { toggleStatusTask } from 'src/app/store/actions/task.actions';
import { DataAdapter } from 'src/app/models/data-adapter.model';

@Component({
  selector: 'app-table-task',
  templateUrl: './table-task.component.html',
  standalone: true,
  styleUrls: ['./table-task.component.scss'],
  imports: [NzTableModule, CommonModule, NzButtonModule, NzTagModule, NzDropDownModule],
})
export class TableTaskComponent {
  
  tasks$: DataAdapter[] = []
  filteredTasks: DataAdapter[] = [];

  constructor(private store: Store<{ tasks: { tasks: DataAdapter[] } }>) { 
    this.store.select('tasks').subscribe(( tasksState: { tasks: DataAdapter[] }) => {
      this.tasks$ = tasksState.tasks;
      this.resetFilters();
    })
  }

  sortByCompleted(): void {
    this.filteredTasks = this.tasks$.filter(task => task.completed);
  }

  sortByPending(): void {
    this.filteredTasks = this.tasks$.filter(task => !task.completed);
  }

  resetFilters(): void {
    this.filteredTasks = this.tasks$;
  }

  toggleStatusTask(data: DataAdapter): void {
    this.store.dispatch(toggleStatusTask({ id: data.id }))
  }
}
