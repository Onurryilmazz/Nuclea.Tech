import {
  Component,
  signal,
  computed,
  HostListener,
  HostBinding,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ButtonComponent, IconComponent } from '../../shared/components';
import { SmoothScrollService } from '../../shared/services/smooth-scroll.service';

interface NavItem {
  label: string;
  href: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent, IconComponent],
  template: `
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [ngClass]="{
        'bg-slate-dark-900/90 backdrop-blur-lg border-b border-electric/10': isScrolled()
      }"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center justify-between h-20">
          <!-- Logo -->
          <a
            href="#home"
            class="flex items-center gap-2 group"
            (click)="scrollTo($event, 'home')"
          >
            <div class="relative">
              <!-- Nucleus icon -->
              <div
                class="w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-electric-dark
                       flex items-center justify-center shadow-glow-sm
                       group-hover:shadow-glow-md transition-shadow duration-300"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-white">
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                  <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.8"/>
                  <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6" transform="rotate(60 12 12)"/>
                  <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4" transform="rotate(120 12 12)"/>
                </svg>
              </div>
              <!-- Glow effect -->
              <div
                class="absolute inset-0 rounded-xl bg-electric/30 blur-xl opacity-0
                       group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </div>
            <span class="font-heading text-xl font-bold text-white">
              Nuclea
            </span>
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex items-center gap-8">
            @for (item of navItems; track item.href) {
              <a
                [href]="item.href"
                class="text-slate-300 hover:text-white transition-colors duration-200
                       relative group py-2"
                (click)="scrollTo($event, item.href.slice(1))"
              >
                {{ item.label }}
                <span
                  class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-electric to-accent-cyan
                         group-hover:w-full transition-all duration-300"
                ></span>
              </a>
            }
          </div>

          <!-- CTA Button (Desktop) -->
          <div class="hidden lg:block">
            <app-button
              variant="primary"
              size="md"
              (clicked)="scrollTo($event, 'contact')"
            >
              Get a Quote
            </app-button>
          </div>

          <!-- Mobile Menu Button -->
          <button
            class="lg:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
            (click)="toggleMobileMenu()"
            [attr.aria-expanded]="isMobileMenuOpen()"
            aria-label="Toggle navigation menu"
          >
            <app-icon
              [name]="isMobileMenuOpen() ? 'x' : 'menu'"
              [size]="24"
            />
          </button>
        </nav>
      </div>

      <!-- Mobile Menu -->
      @if (isMobileMenuOpen()) {
        <div
          class="lg:hidden absolute top-full left-0 right-0 bg-slate-dark-800/95 backdrop-blur-lg
                 border-b border-electric/10"
          [@mobileMenu]="'open'"
        >
          <div class="container mx-auto px-4 py-6">
            <div class="flex flex-col gap-4">
              @for (item of navItems; track item.href) {
                <a
                  [href]="item.href"
                  class="text-lg text-slate-300 hover:text-white py-2 transition-colors"
                  (click)="scrollTo($event, item.href.slice(1)); closeMobileMenu()"
                >
                  {{ item.label }}
                </a>
              }
              <div class="pt-4 border-t border-white/10">
                <app-button
                  variant="primary"
                  size="md"
                  [fullWidth]="true"
                  (clicked)="scrollTo($event, 'contact'); closeMobileMenu()"
                >
                  Get a Quote
                </app-button>
              </div>
            </div>
          </div>
        </div>
      }
    </header>

    <!-- Spacer for fixed header -->
    <div class="h-20"></div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  animations: [
    trigger('headerState', [
      state('top', style({
        backgroundColor: 'transparent',
        backdropFilter: 'none',
      })),
      state('scrolled', style({
        backgroundColor: 'rgba(11, 13, 23, 0.9)',
        backdropFilter: 'blur(12px)',
      })),
      transition('top <=> scrolled', animate('0.3s ease-out')),
    ]),
    trigger('mobileMenu', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('0.2s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('0.2s ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ]),
    ]),
  ],
})
export class HeaderComponent {
  private smoothScroll = inject(SmoothScrollService);
  private platformId = inject(PLATFORM_ID);

  readonly navItems: NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'AI Solutions', href: '#ai-solutions' },
    { label: 'Enterprise Software', href: '#enterprise' },
    { label: 'Methodology', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  @HostBinding('@headerState')
  get headerAnimationState() {
    return this.isScrolled() ? 'scrolled' : 'top';
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled.set(window.scrollY > 50);
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault();
    this.smoothScroll.scrollToElement(sectionId);
  }
}
