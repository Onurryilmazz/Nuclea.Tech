import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main class="min-h-screen bg-slate-dark-900">
      <router-outlet />
    </main>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class AppComponent {}
