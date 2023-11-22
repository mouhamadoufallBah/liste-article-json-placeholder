import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Article } from '../models/article';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]>{
    return this.http.get<Article[]>(`https://jsonplaceholder.typicode.com/posts`);
  }

  addArticle(articleData: any): Observable<any>{
    return this.http.post<any>(`https://jsonplaceholder.typicode.com/posts`, articleData)
  }

}
