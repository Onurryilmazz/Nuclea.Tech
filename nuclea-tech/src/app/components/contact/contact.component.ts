import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlassCardComponent, SectionHeadingComponent, IconComponent, ButtonComponent } from '../../shared/components';
import { ScrollAnimationService } from '../../shared/services/scroll-animation.service';

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, GlassCardComponent, SectionHeadingComponent, IconComponent, ButtonComponent],
  template: `
    <section id="contact" class="relative py-24 md:py-32 overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 bg-slate-dark-900"></div>
      <div class="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-electric/5 rounded-full blur-3xl"></div>
      <div class="absolute top-0 right-1/4 w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-3xl"></div>

      <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div #header class="mb-16">
          <app-section-heading
            title="Get in"
            highlight="Touch"
            subtitle="Ready to transform your business with AI? Let's discuss your project
                     and explore how we can help you achieve your goals."
            badge="Contact Us"
            [centered]="true"
            size="lg"
          />
        </div>

        <div #content class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <!-- Contact Form -->
          <div class="contact-item">
            <app-glass-card padding="large" accent="purple">
              <h3 class="text-2xl font-heading font-semibold text-white mb-6">
                Send us a message
              </h3>

              <form (ngSubmit)="handleSubmit()" #contactForm="ngForm" class="space-y-6">
                <!-- Name -->
                <div>
                  <label for="name" class="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    [(ngModel)]="formData.name"
                    required
                    class="w-full px-4 py-3 rounded-lg bg-slate-dark-700/50 border border-white/10
                           text-white placeholder-slate-500
                           focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric/50
                           transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    [(ngModel)]="formData.email"
                    required
                    class="w-full px-4 py-3 rounded-lg bg-slate-dark-700/50 border border-white/10
                           text-white placeholder-slate-500
                           focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric/50
                           transition-all duration-200"
                    placeholder="john@company.com"
                  />
                </div>

                <!-- Company -->
                <div>
                  <label for="company" class="block text-sm font-medium text-slate-300 mb-2">
                    Company <span class="text-slate-500">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    [(ngModel)]="formData.company"
                    class="w-full px-4 py-3 rounded-lg bg-slate-dark-700/50 border border-white/10
                           text-white placeholder-slate-500
                           focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric/50
                           transition-all duration-200"
                    placeholder="Your Company"
                  />
                </div>

                <!-- Service Interest -->
                <div>
                  <label for="service" class="block text-sm font-medium text-slate-300 mb-2">
                    Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    [(ngModel)]="formData.service"
                    class="w-full px-4 py-3 rounded-lg bg-slate-dark-700/50 border border-white/10
                           text-white
                           focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric/50
                           transition-all duration-200"
                  >
                    <option value="" class="bg-slate-dark-800">Select a service...</option>
                    <option value="ai-solutions" class="bg-slate-dark-800">AI Solutions</option>
                    <option value="enterprise-software" class="bg-slate-dark-800">Enterprise Software</option>
                    <option value="consulting" class="bg-slate-dark-800">Technical Consulting</option>
                    <option value="other" class="bg-slate-dark-800">Other</option>
                  </select>
                </div>

                <!-- Message -->
                <div>
                  <label for="message" class="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    [(ngModel)]="formData.message"
                    required
                    rows="4"
                    class="w-full px-4 py-3 rounded-lg bg-slate-dark-700/50 border border-white/10
                           text-white placeholder-slate-500 resize-none
                           focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric/50
                           transition-all duration-200"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <app-button
                  variant="primary"
                  size="lg"
                  type="submit"
                  [fullWidth]="true"
                  [loading]="isSubmitting()"
                  [disabled]="!contactForm.valid"
                >
                  @if (isSubmitted()) {
                    <span class="flex items-center gap-2">
                      <app-icon name="check-circle" [size]="20"/>
                      Message Sent!
                    </span>
                  } @else {
                    <span class="flex items-center gap-2">
                      Send Message
                      <app-icon name="arrow-right" [size]="20"/>
                    </span>
                  }
                </app-button>
              </form>
            </app-glass-card>
          </div>

          <!-- Contact Info -->
          <div class="contact-item space-y-6">
            <app-glass-card padding="large" accent="cyan">
              <h3 class="text-2xl font-heading font-semibold text-white mb-6">
                Contact Information
              </h3>

              <div class="space-y-6">
                @for (info of contactInfo; track info.label) {
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 rounded-xl bg-accent-cyan/20 flex items-center justify-center flex-shrink-0">
                      <app-icon [name]="info.icon" [size]="24" class="text-accent-cyan-light"/>
                    </div>
                    <div>
                      <p class="text-sm text-slate-400 mb-1">{{ info.label }}</p>
                      @if (info.href) {
                        <a
                          [href]="info.href"
                          class="text-white hover:text-electric-light transition-colors"
                        >
                          {{ info.value }}
                        </a>
                      } @else {
                        <p class="text-white">{{ info.value }}</p>
                      }
                    </div>
                  </div>
                }
              </div>
            </app-glass-card>

            <!-- Office Hours -->
            <app-glass-card padding="large" accent="gradient">
              <h4 class="text-lg font-heading font-semibold text-white mb-4">
                Office Hours
              </h4>
              <div class="space-y-2 text-slate-300">
                <div class="flex justify-between">
                  <span>Monday - Friday</span>
                  <span class="text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span>Saturday</span>
                  <span class="text-white">10:00 AM - 2:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span>Sunday</span>
                  <span class="text-slate-500">Closed</span>
                </div>
              </div>
              <p class="mt-4 text-sm text-slate-400">
                * All times are in Istanbul Time (GMT+3)
              </p>
            </app-glass-card>

            <!-- Social Links -->
            <div class="flex items-center gap-4">
              @for (social of socials; track social.name) {
                <a
                  [href]="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  [attr.aria-label]="social.name"
                  class="w-12 h-12 rounded-xl bg-white/5 border border-white/10
                         flex items-center justify-center
                         hover:bg-electric/20 hover:border-electric/30
                         transition-all duration-200"
                >
                  <app-icon [name]="social.icon" [size]="20" class="text-slate-300 hover:text-white"/>
                </a>
              }
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

    .contact-item {
      opacity: 0;
      transform: translateY(30px);
    }

    select option {
      background-color: #151929;
    }
  `],
})
export class ContactComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private scrollAnimation = inject(ScrollAnimationService);

  @ViewChild('header') header!: ElementRef;
  @ViewChild('content') content!: ElementRef;

  isSubmitting = signal(false);
  isSubmitted = signal(false);

  formData = {
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  };

  readonly contactInfo: ContactInfo[] = [
    {
      icon: 'mail',
      label: 'Email',
      value: 'hello@nuclea.tech',
      href: 'mailto:hello@nuclea.tech',
    },
    {
      icon: 'phone',
      label: 'Phone',
      value: '+90 (212) 123 4567',
      href: 'tel:+902121234567',
    },
    {
      icon: 'map-pin',
      label: 'Location',
      value: 'Istanbul, Turkey',
    },
  ];

  readonly socials = [
    { name: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com' },
    { name: 'Twitter', icon: 'twitter', href: 'https://twitter.com' },
    { name: 'GitHub', icon: 'github', href: 'https://github.com' },
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
    }
  }

  private initScrollAnimations(): void {
    this.scrollAnimation.fadeInOnScroll(this.header.nativeElement, { y: 40 });
    this.scrollAnimation.staggerOnScroll(
      this.content.nativeElement,
      '.contact-item',
      { stagger: 0.2, y: 40 }
    );
  }

  handleSubmit(): void {
    if (this.isSubmitting()) return;

    this.isSubmitting.set(true);

    // Simulate form submission
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);

      // Reset after 3 seconds
      setTimeout(() => {
        this.isSubmitted.set(false);
        this.formData = {
          name: '',
          email: '',
          company: '',
          service: '',
          message: '',
        };
      }, 3000);
    }, 1500);
  }
}
