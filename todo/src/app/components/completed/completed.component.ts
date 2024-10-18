import { Component, OnInit, NgModule } from '@angular/core';
import { MergedDataService } from '../../services/merged-data.service';
import { iTodo } from '../../interfaces/itodo';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss'
})
export class CompletedComponent implements OnInit{
  completedTasks: iTodo[] = []
  constructor(private MergedDataS: MergedDataService){}

  ngOnInit(): void {
    this.MergedDataS.getTdWithUs()
    this.MergedDataS.updatedTodo$.subscribe(t => {
      this.completedTasks = t.filter(todo => todo.completed);
    })
  }

  toggleTodoCompletion(todoId: number, isCompleted: boolean): void {
    this.MergedDataS.updateTodoStatus(todoId, isCompleted);
  }
}
