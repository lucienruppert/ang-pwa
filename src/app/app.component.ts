import { Component, Inject } from '@angular/core';
import { DataService, Joke } from '../data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public joke: string | undefined;
  public pwaInstallStatus: boolean | undefined = false;
  public isNonDesktop: boolean | undefined;
  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.loadJoke();
    this.setPWAInstallStatus();
    this.setIsNonDesktop();
  }

  private setIsNonDesktop(): void {
    this.isNonDesktop =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
  }

  private setPWAInstallStatus(): void {
    this.pwaInstallStatus =
      window.matchMedia('(display-mode: standalone)').matches ||
      ((window.navigator as any).standalone as boolean);
    if (this.pwaInstallStatus === undefined) this.pwaInstallStatus = false;
  }

  private loadJoke(): void {
    try {
      this.data
        .getJoke()
        .subscribe((result: Joke) => (this.joke = result['value']));
    } catch (error) {
      console.log(error);
    }
  }

  public handleTouchStart(): void {
    this.loadJoke();
  }

  public handleClick(): void {
    this.loadJoke();
  }
}
