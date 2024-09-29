import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos'

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
}