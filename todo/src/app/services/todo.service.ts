import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { iTodo } from '../interfaces/itodo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoUrl:string ="todos.json"
  todos: iTodo[] = []
  constructor(private http: HttpClient){}

  getTodo(): Observable<iTodo[]> {
    return this.http.get<iTodo[]>(this.todoUrl)
    .pipe(
      tap(
        todos => this.todos = todos
      )
    )
  }

  updateTodoStatus(updatedTodo: iTodo): Observable<iTodo> {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
    this.todos[index].completed = updatedTodo.completed;
    return new Observable<iTodo>(observer => {
      observer.next(updatedTodo);
      observer.complete();
    });
  }
}
