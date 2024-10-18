import { MergedDataService } from './../../services/merged-data.service';
import { Component, OnInit } from '@angular/core';
import { iTodo } from '../../interfaces/itodo';
import { iUsers } from '../../interfaces/iusers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  todos: iTodo[] = []
  users: iUsers[] = []
  searchText: string = ""

  isLoadingUsers: boolean = true;
  isLoadingTodos: boolean = true;

  constructor(
    private MergedDataS: MergedDataService
  ){}

  ngOnInit(): void {
    this.MergedDataS.getUsWithTd();
    this.MergedDataS.updatedUsers$.subscribe(u => {
      this.users = u
      this.isLoadingUsers = false
    })
    this.MergedDataS.getTdWithUs();
    this.MergedDataS.updatedTodo$.subscribe(t => {
      this.todos = t
      this.isLoadingTodos = false
    })


  }



  filteredTodos(): iTodo[] {
    if (!this.searchText) {
      return this.todos;
    }
    const searchTerm = this.searchText.toLowerCase();
    return this.todos.filter(task =>
      task.userName?.toLowerCase().includes(searchTerm)
    );
  }

  toggleTodoCompletion(todoId: number, isCompleted: boolean): void {
    this.MergedDataS.updateTodoStatus(todoId, isCompleted);
  }
}


