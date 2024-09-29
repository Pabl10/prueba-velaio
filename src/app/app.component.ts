import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadTasks } from './store/actions/task.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;

  constructor(private store: Store){
    this.store.dispatch(loadTasks());
  }
}
