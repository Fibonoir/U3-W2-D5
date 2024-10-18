import { Component, OnInit } from '@angular/core';
import { MergedDataService } from '../../services/merged-data.service';
import { iUsers } from '../../interfaces/iusers';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  updatedUsers: iUsers[] = []
  searchText:string = ""
  loading:boolean = true

  constructor(private MergedDataS: MergedDataService){}

  ngOnInit(): void {
    this.MergedDataS.getUsWithTd()
    this.MergedDataS.updatedUsers$.subscribe(u => {
      this.updatedUsers = u
      this.loading = false
      console.log(this.updatedUsers);
    })

  }

  filteredTodos(): iUsers[] {
    if (!this.searchText) {
      return this.updatedUsers;
    }
    const searchTerm = this.searchText.toLowerCase();

    return this.updatedUsers.filter(task =>
      (task.firstName?.toLowerCase().includes(searchTerm) || task.lastName?.toLowerCase().includes(searchTerm))
    );
  }

  toggleTodoCompletion(todoId: number, isCompleted: boolean): void {
    this.MergedDataS.updateTodoStatus(todoId, isCompleted);
  }

}
