import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/model/comment';  // <-- IMPORTANT

const URL = 'http://localhost:4000/comments';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  
  constructor(private http:HttpClient) { }

  getComments():Observable<Comment[]>{
      return this.http.get<Comment[]>(URL);
  }

  getCommentsByFoodId(foodId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${URL}?foodId=${foodId}`);
  }

  addComment(c:Comment):Observable<Comment>{
    return this.http.post<Comment>(URL, c);
  }
}
