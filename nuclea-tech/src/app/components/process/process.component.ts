import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SectionHeadingComponent, IconComponent } from '../../shared/components';
import { ScrollAnimationService } from '../../shared/services/scroll-animation.service';

interface ProcessStep {
  id: number;
  icon: string;
  title: string;
  description: string;
  color: 'purple' | 'cyan';
}

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, IconComponent],
  template: `
    <section id="process" class="relative py-24 md:py-32 overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 bg-gradient-to-b from-slate-dark-900 via-slate-dark-800 to-slate-dark-900"></div>

      <!-- Animated gradient orb -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
        <div class="absolute inset-0 bg-gradient-radial from-electric/10 via-transparent to-transparent animate-pulse"></div>
      </div>

      <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div #header class="mb-20">
          <app-section-heading
            title="Our"
            highlight="Methodology"
            subtitle="A proven approach that combines deep analysis with rapid iteration
                     to deliver AI-powered solutions that drive real business impact."
            badge="How We Work"
            [centered]="true"
            size="lg"
          />
        </div>

        <!-- Process Steps -->
        <div #processStepsContainer class="relative max-w-5xl mx-auto">
          <!-- Connection Line (Desktop) -->
          <div class="hidden md:block absolute top-24 left-0 right-0 h-0.5">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-electric/30 to-transparent"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            @for (step of processSteps; track step.id; let i = $index; let last = $last) {
              <div class="process-step relative">
                <!-- Step Card -->
                <div class="relative flex flex-col items-center text-center">
                  <!-- Step Number & Icon -->
                  <div class="relative mb-6">
                    <!-- Outer glow ring -->
                    <div
                      class="absolute inset-0 rounded-full blur-md animate-pulse"
                      [ngClass]="step.color === 'purple' ? 'bg-electric/30' : 'bg-accent-cyan/30'"
                    ></div>

                    <!-- Icon container -->
                    <div
                      class="relative w-20 h-20 rounded-full flex items-center justify-center
                             border-2 transition-all duration-300 hover:scale-110"
                      [ngClass]="{
                        'bg-slate-dark-800 border-electric/50 hover:border-electric': step.color === 'purple',
                        'bg-slate-dark-800 border-accent-cyan/50 hover:border-accent-cyan': step.color === 'cyan'
                      }"
                    >
                      <app-icon
                        [name]="step.icon"
                        [size]="32"
                        [ngClass]="step.color === 'purple' ? 'text-electric-light' : 'text-accent-cyan-light'"
                      />
                    </div>

                    <!-- Step number badge -->
                    <div
                      class="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center
                             text-sm font-bold text-white"
                      [ngClass]="step.color === 'purple' ? 'bg-electric' : 'bg-accent-cyan'"
                    >
                      {{ step.id }}
                    </div>
                  </div>

                  <!-- Content -->
                  <h3 class="text-xl font-heading font-semibold text-white mb-3">
                    {{ step.title }}
                  </h3>
                  <p class="text-slate-400 text-sm leading-relaxed max-w-xs">
                    {{ step.description }}
                  </p>

                  <!-- Arrow (not on last item, desktop only) -->
                  @if (!last) {
                    <div class="hidden md:block absolute top-8 -right-4 text-electric/30">
                      <app-icon name="chevron-right" [size]="24"/>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Bottom CTA -->
        <div #bottomCta class="mt-20 text-center">
          <div class="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl
                      bg-gradient-to-r from-electric/10 to-accent-cyan/10
                      border border-electric/20">
            <div class="text-center sm:text-left">
              <p class="text-white font-medium">Ready to start your project?</p>
              <p class="text-slate-400 text-sm">Let's discuss how we can help transform your business.</p>
            </div>
            <a
              href="#contact"
              class="btn-glow px-6 py-3 rounded-lg font-medium text-white whitespace-nowrap"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .process-step {
      opacity: 0;
      transform: translateY(30px);
    }
  `],
})
export class ProcessComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private scrollAnimation = inject(ScrollAnimationService);

  @ViewChild('header') header!: ElementRef;
  @ViewChild('processStepsContainer') processStepsContainer!: ElementRef;
  @ViewChild('bottomCta') bottomCta!: ElementRef;

  readonly processSteps: ProcessStep[] = [
    {
      id: 1,
      icon: 'search',
      title: 'Analysis',
      description: 'Deep dive into your business processes, data flows, and strategic objectives to identify AI opportunities.',
      color: 'purple',
    },
    {
      id: 2,
      icon: 'lightbulb',
      title: 'AI Integration',
      description: 'Design and prototype AI solutions tailored to your specific use cases and technical environment.',
      color: 'cyan',
    },
    {
      id: 3,
      icon: 'code',
      title: 'Development',
      description: 'Agile development with continuous integration, testing, and stakeholder feedback loops.',
      color: 'purple',
    },
    {
      id: 4,
      icon: 'rocket',
      title: 'Scale',
      description: 'Deploy, monitor, and continuously optimize for performance, reliability, and business impact.',
      color: 'cyan',
    },
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
    }
  }

  private initScrollAnimations(): void {
    this.scrollAnimation.fadeInOnScroll(this.header.nativeElement, { y: 40 });
    this.scrollAnimation.staggerOnScroll(
      this.processStepsContainer.nativeElement,
      '.process-step',
      { stagger: 0.2, y: 40 }
    );
    this.scrollAnimation.fadeInOnScroll(this.bottomCta.nativeElement, { y: 30, delay: 0.5 });
  }
}
