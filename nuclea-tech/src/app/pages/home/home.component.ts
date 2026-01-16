import { Component, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  HeaderComponent,
  HeroComponent,
  ServicesComponent,
  CapabilitiesComponent,
  ProcessComponent,
  ContactComponent,
  FooterComponent,
} from '../../components';
import { ScrollAnimationService } from '../../shared/services/scroll-animation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    CapabilitiesComponent,
    ProcessComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <div class="relative">
      <!-- Fixed Header -->
      <app-header />

      <!-- Main Content -->
      <main>
        <!-- Hero Section -->
        <app-hero />

        <!-- Services Section (AI Solutions + Enterprise) -->
        <app-services />

        <!-- Capabilities Section -->
        <app-capabilities />

        <!-- Process Section -->
        <app-process />

        <!-- Contact Section -->
        <app-contact />
      </main>

      <!-- Footer -->
      <app-footer />
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class HomeComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private scrollAnimation = inject(ScrollAnimationService);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Refresh scroll triggers after view is initialized
      setTimeout(() => {
        this.scrollAnimation.refresh();
      }, 100);
    }
  }

  ngOnDestroy(): void {
    // Clean up scroll triggers
    this.scrollAnimation.killAll();
  }
}
