import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Task } from 'src/models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = []
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTasks()
  }

  getTasks() {
    this.http.get<Task[]>("https://jsonplaceholder.typicode.com/todos")
      .pipe(take(1))
      .subscribe({
        next: (response: Task[]) => {
          this.tasks = response;
        },
        error: (err) => { }
      })
  }

}
