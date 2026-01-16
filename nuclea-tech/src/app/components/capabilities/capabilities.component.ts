import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GlassCardComponent, SectionHeadingComponent, IconComponent } from '../../shared/components';
import { ScrollAnimationService } from '../../shared/services/scroll-animation.service';

interface Capability {
  icon: string;
  title: string;
  description: string;
  stats: string;
  statsLabel: string;
}

@Component({
  selector: 'app-capabilities',
  standalone: true,
  imports: [CommonModule, GlassCardComponent, SectionHeadingComponent, IconComponent],
  template: `
    <section id="capabilities" class="relative py-24 md:py-32 overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 bg-slate-dark-900"></div>
      <div class="absolute top-1/2 left-0 w-[500px] h-[500px] bg-electric/5 rounded-full blur-3xl -translate-y-1/2"></div>
      <div class="absolute top-1/3 right-0 w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-3xl"></div>

      <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div #header class="mb-16">
          <app-section-heading
            title="Why Choose"
            highlight="Nuclea?"
            subtitle="We combine enterprise-grade engineering with cutting-edge AI integration
                     to deliver solutions that scale with your ambitions."
            badge="Our Capabilities"
            [centered]="true"
            size="lg"
          />
        </div>

        <!-- Capabilities Grid -->
        <div #capabilitiesGrid class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          @for (capability of capabilities; track capability.title; let i = $index) {
            <div class="capability-item" [style.--delay]="i * 0.1 + 's'">
              <app-glass-card padding="large" [accent]="i % 2 === 0 ? 'purple' : 'cyan'">
                <div class="flex items-start gap-5">
                  <!-- Icon -->
                  <div
                    class="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                    [ngClass]="i % 2 === 0 ? 'bg-electric/20' : 'bg-accent-cyan/20'"
                  >
                    <app-icon
                      [name]="capability.icon"
                      [size]="32"
                      [ngClass]="i % 2 === 0 ? 'text-electric-light' : 'text-accent-cyan-light'"
                    />
                  </div>

                  <!-- Content -->
                  <div class="flex-grow">
                    <h3 class="text-xl font-heading font-semibold text-white mb-2">
                      {{ capability.title }}
                    </h3>
                    <p class="text-slate-400 mb-4">
                      {{ capability.description }}
                    </p>

                    <!-- Stats -->
                    <div class="flex items-baseline gap-2">
                      <span
                        class="text-3xl font-bold"
                        [ngClass]="i % 2 === 0 ? 'text-electric-light' : 'text-accent-cyan-light'"
                      >
                        {{ capability.stats }}
                      </span>
                      <span class="text-sm text-slate-500">{{ capability.statsLabel }}</span>
                    </div>
                  </div>
                </div>
              </app-glass-card>
            </div>
          }
        </div>

        <!-- Trust Badges - Auto Scrolling Marquee -->
        <div #trustBadges class="mt-24">
          <p class="text-slate-500 mb-10 text-sm uppercase tracking-wider text-center">Trusted Technologies</p>
          
          <!-- Marquee Container -->
          <div class="relative overflow-hidden">
            <!-- Gradient Fade Edges -->
            <div class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-dark-900 to-transparent z-10"></div>
            <div class="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-dark-900 to-transparent z-10"></div>
            
            <!-- Scrolling Track -->
            <div class="marquee-track flex gap-12 py-4">
              <!-- First Set -->
              <div class="marquee-content flex items-center gap-12 animate-marquee">
                @for (tech of technologies; track tech.name) {
                  <div class="flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-electric/10 hover:border-electric/30 transition-all duration-300 cursor-pointer group">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:from-electric/20 group-hover:to-electric/10 transition-all duration-300">
                      <app-icon [name]="tech.icon" [size]="22" class="text-slate-400 group-hover:text-electric-light transition-colors"/>
                    </div>
                    <span class="font-medium text-slate-300 group-hover:text-white transition-colors whitespace-nowrap">{{ tech.name }}</span>
                  </div>
                }
              </div>
              <!-- Duplicate Set for Seamless Loop -->
              <div class="marquee-content flex items-center gap-12 animate-marquee">
                @for (tech of technologies; track tech.name + '-dup') {
                  <div class="flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-electric/10 hover:border-electric/30 transition-all duration-300 cursor-pointer group">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:from-electric/20 group-hover:to-electric/10 transition-all duration-300">
                      <app-icon [name]="tech.icon" [size]="22" class="text-slate-400 group-hover:text-electric-light transition-colors"/>
                    </div>
                    <span class="font-medium text-slate-300 group-hover:text-white transition-colors whitespace-nowrap">{{ tech.name }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .capability-item {
      opacity: 0;
      transform: translateY(30px);
    }
  `],
})
export class CapabilitiesComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private scrollAnimation = inject(ScrollAnimationService);

  @ViewChild('header') header!: ElementRef;
  @ViewChild('capabilitiesGrid') capabilitiesGrid!: ElementRef;
  @ViewChild('trustBadges') trustBadges!: ElementRef;

  readonly capabilities: Capability[] = [
    {
      icon: 'server',
      title: 'High Scalability',
      description: 'Architecture designed to handle exponential growth. From startup to enterprise scale without rewrites.',
      stats: '10M+',
      statsLabel: 'requests per day',
    },
    {
      icon: 'database',
      title: 'Big Data Processing',
      description: 'Real-time processing pipelines that transform massive datasets into actionable insights.',
      stats: '500TB+',
      statsLabel: 'data processed monthly',
    },
    {
      icon: 'activity',
      title: 'Dynamic Architectures',
      description: 'Event-driven, microservices-based systems that adapt to changing business requirements.',
      stats: '99.99%',
      statsLabel: 'system uptime',
    },
    {
      icon: 'shield',
      title: 'Premium Code Quality',
      description: 'Test-driven development, comprehensive documentation, and rigorous code reviews.',
      stats: '90%+',
      statsLabel: 'test coverage',
    },
  ];

  readonly technologies = [
    { name: 'Angular', icon: 'code' },
    { name: 'React', icon: 'code' },
    { name: 'Vue.js', icon: 'code' },
    { name: 'Node.js', icon: 'server' },
    { name: '.NET Core', icon: 'server' },
    { name: 'Python', icon: 'cpu' },
    { name: 'Go', icon: 'cpu' },
    { name: 'PostgreSQL', icon: 'database' },
    { name: 'MongoDB', icon: 'database' },
    { name: 'Redis', icon: 'database' },
    { name: 'Kubernetes', icon: 'layers' },
    { name: 'Docker', icon: 'layers' },
    { name: 'AWS', icon: 'globe' },
    { name: 'Azure', icon: 'globe' },
    { name: 'GCP', icon: 'globe' },
    { name: 'TensorFlow', icon: 'cpu' },
    { name: 'PyTorch', icon: 'cpu' },
    { name: 'OpenAI', icon: 'sparkles' },
    { name: 'LangChain', icon: 'sparkles' },
    { name: 'Elasticsearch', icon: 'search' },
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
    }
  }

  private initScrollAnimations(): void {
    this.scrollAnimation.fadeInOnScroll(this.header.nativeElement, { y: 40 });
    this.scrollAnimation.staggerOnScroll(
      this.capabilitiesGrid.nativeElement,
      '.capability-item',
      { stagger: 0.15, y: 40 }
    );
    this.scrollAnimation.fadeInOnScroll(this.trustBadges.nativeElement, { y: 30, delay: 0.3 });
  }
}
