import { Component, Inject } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public joke: any;
  public pwaInstallStatus: Boolean | undefined = false;
  public isMobile: boolean | undefined;
  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.loadJoke();
    this.setPWAInstallStatus();
    this.setIsMobile();
  }

  private setIsMobile(): void {
    this.isMobile =
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
        .getJokes()
        .subscribe((result: any) => (this.joke = result['value']));
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
