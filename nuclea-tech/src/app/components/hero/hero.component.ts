import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonComponent, IconComponent } from '../../shared/components';
import { SmoothScrollService } from '../../shared/services/smooth-scroll.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent, IconComponent],
  template: `
    <section
      id="home"
      class="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <!-- Background Elements -->
      <div class="absolute inset-0 bg-hero-gradient"></div>

      <!-- Animated Grid Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-30"></div>

      <!-- Floating Orbs -->
      <div #orb1 class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-electric/10 blur-3xl"></div>
      <div #orb2 class="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-cyan/10 blur-3xl"></div>
      <div #orb3 class="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-electric-dark/15 blur-2xl"></div>

      <!-- Nucleus Animation -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 600 600" class="animate-spin" style="animation-duration: 30s;">
          <ellipse cx="300" cy="300" rx="250" ry="80" fill="none" stroke="url(#gradient1)" stroke-width="1"/>
          <ellipse cx="300" cy="300" rx="250" ry="80" fill="none" stroke="url(#gradient2)" stroke-width="1" transform="rotate(60 300 300)"/>
          <ellipse cx="300" cy="300" rx="250" ry="80" fill="none" stroke="url(#gradient3)" stroke-width="1" transform="rotate(120 300 300)"/>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0"/>
              <stop offset="50%" stop-color="#8B5CF6" stop-opacity="1"/>
              <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0"/>
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#06B6D4" stop-opacity="0"/>
              <stop offset="50%" stop-color="#06B6D4" stop-opacity="0.7"/>
              <stop offset="100%" stop-color="#06B6D4" stop-opacity="0"/>
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#A78BFA" stop-opacity="0"/>
              <stop offset="50%" stop-color="#A78BFA" stop-opacity="0.5"/>
              <stop offset="100%" stop-color="#A78BFA" stop-opacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <!-- Content -->
      <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div class="max-w-5xl mx-auto text-center">
          <!-- Badge -->
          <div #badge class="inline-flex items-center gap-2 px-4 py-2 rounded-full
                     bg-electric/10 border border-electric/20 mb-8 opacity-0">
            <span class="w-2 h-2 rounded-full bg-electric animate-pulse"></span>
            <span class="text-sm text-electric-light font-medium">
              AI-Powered Enterprise Solutions
            </span>
          </div>

          <!-- Main Headline -->
          <h1
            #headline
            class="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold
                   leading-tight mb-6 opacity-0"
          >
            <span class="text-white">Empowering Enterprises with</span>
            <br/>
            <span class="gradient-text">AI-Driven Intelligence</span>
            <br/>
            <span class="text-white">& Scalable Software</span>
          </h1>

          <!-- Sub-headline -->
          <p
            #subheadline
            class="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 opacity-0"
          >
            From high-traffic ERP systems to next-gen AI agents.
            We build the <span class="text-electric-light">premium digital core</span> of your business.
          </p>

          <!-- CTA Buttons -->
          <div #ctas class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0">
            <app-button
              variant="primary"
              size="lg"
              (clicked)="scrollTo('ai-solutions')"
            >
              <span class="flex items-center gap-2">
                Explore AI Solutions
                <app-icon name="sparkles" [size]="20"/>
              </span>
            </app-button>
            <app-button
              variant="secondary"
              size="lg"
              (clicked)="scrollTo('enterprise')"
            >
              <span class="flex items-center gap-2">
                Our Expertise
                <app-icon name="arrow-right" [size]="20"/>
              </span>
            </app-button>
          </div>

          <!-- Stats Row -->
          <div #stats class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto opacity-0">
            @for (stat of heroStats; track stat.label) {
              <div class="text-center p-4 rounded-xl bg-white/5 border border-white/5 hover:border-electric/20 transition-colors">
                <div class="text-3xl md:text-4xl font-bold text-white mb-1">
                  {{ stat.value }}
                </div>
                <div class="text-sm text-slate-400">{{ stat.label }}</div>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div class="w-1 h-2 bg-electric rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .gradient-text {
      background: linear-gradient(135deg, #A78BFA 0%, #22D3EE 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `],
})
export class HeroComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private smoothScroll = inject(SmoothScrollService);

  @ViewChild('badge') badge!: ElementRef;
  @ViewChild('headline') headline!: ElementRef;
  @ViewChild('subheadline') subheadline!: ElementRef;
  @ViewChild('ctas') ctas!: ElementRef;
  @ViewChild('stats') statsEl!: ElementRef;
  @ViewChild('orb1') orb1!: ElementRef;
  @ViewChild('orb2') orb2!: ElementRef;
  @ViewChild('orb3') orb3!: ElementRef;

  readonly heroStats = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '10M+', label: 'Daily Transactions' },
    { value: '24/7', label: 'Enterprise Support' },
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
    }
  }

  private initAnimations(): void {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Staggered content reveal
    tl.fromTo(
      this.badge.nativeElement,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo(
      this.headline.nativeElement,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.3'
    )
    .fromTo(
      this.subheadline.nativeElement,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(
      this.ctas.nativeElement,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    )
    .fromTo(
      this.statsEl.nativeElement,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.2'
    );

    // Floating orb animations
    gsap.to(this.orb1.nativeElement, {
      x: 50,
      y: -30,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to(this.orb2.nativeElement, {
      x: -40,
      y: 40,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to(this.orb3.nativeElement, {
      x: 30,
      y: 50,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  scrollTo(sectionId: string): void {
    this.smoothScroll.scrollToElement(sectionId);
  }
}
