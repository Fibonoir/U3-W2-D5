import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map } from 'rxjs';
import { UsersService } from './users.service';
import { TodoService } from './todo.service';
import { iTodo } from './../interfaces/itodo';
import { iUsers } from './../interfaces/iusers';

@Injectable({
  providedIn: 'root'
})
export class MergedDataService {

  private updatedUsersSubject = new BehaviorSubject<iUsers[]>([]);
  private updatedTodoSubject = new BehaviorSubject<iTodo[]>([]);
  private cachedUsers!: iUsers[];
  private cachedTodos!: iTodo[];

  updatedUsers$ = this.updatedUsersSubject.asObservable();
  updatedTodo$ = this.updatedTodoSubject.asObservable();

  constructor(
    private userS: UsersService,
    protected todoS: TodoService
  ) {}

  private fetchData() {
    return forkJoin([this.userS.getUsers(), this.todoS.getTodo()]);
  }

  getUsWithTd(): void {
    if (this.cachedUsers) {
      this.updatedUsersSubject.next(this.cachedUsers);
    } else {
      this.fetchData().pipe(
        map(([users, todos]) => users.map(user => ({
          ...user,
          todos: todos.filter(todo => todo.userId === user.id)
        })))
      ).subscribe(users => {
        this.cachedUsers = users;
        this.updatedUsersSubject.next(users);
      });
    }
  }

  getTdWithUs(): void {
    if (this.cachedTodos) {
      this.updatedTodoSubject.next(this.cachedTodos);
    } else {
      this.fetchData().pipe(
        map(([users, todos]) => {
          const userMap = new Map(users.map(user => [user.id, `${user.firstName} ${user.lastName}`]));
          return todos.map(todo => ({
            ...todo,
            userName: userMap.get(todo.userId)
          }));
        })
      ).subscribe(todos => {
        this.cachedTodos = todos;
        this.updatedTodoSubject.next(todos);
      });
    }
  }

  updateTodoStatus(todoId: number, isCompleted: boolean): void {
    if (this.cachedTodos) {
      const updatedTodos = this.cachedTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: isCompleted } : todo
      );
      this.cachedTodos = updatedTodos;
      this.updatedTodoSubject.next(updatedTodos);
    }

    if (this.cachedUsers) {
      const updatedUsers = this.cachedUsers.map(user => ({
        ...user,
        todos: user.todos?.map(todo =>
          todo.id === todoId ? { ...todo, completed: isCompleted } : todo
        )
      }));
      this.cachedUsers = updatedUsers;
      this.updatedUsersSubject.next(updatedUsers);
    }
  }
}
