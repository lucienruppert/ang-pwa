import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  joke: any;
  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.loadJoke();
  }

  public handleClick(): void {
    this.loadJoke();
  }

  private loadJoke(): void {
    this.data
      .getJokes()
      .subscribe((result: any) => (this.joke = result['value']));
  }
}
