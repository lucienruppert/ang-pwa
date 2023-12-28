import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Joke = {
  categories: Array<string>;
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: Date;
  url: string;
  value: string;
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getJoke() {
    return this.http.get<Joke>('https://api.chucknorris.io/jokes/random');
  }
}
