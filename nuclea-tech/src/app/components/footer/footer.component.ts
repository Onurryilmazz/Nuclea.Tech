import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components';
import { SmoothScrollService } from '../../shared/services/smooth-scroll.service';

interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <footer class="relative bg-slate-dark-900 border-t border-white/5">
      <!-- Gradient accent -->
      <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent"></div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <!-- Brand Column -->
          <div class="lg:col-span-1">
            <!-- Logo -->
            <a
              href="#home"
              class="flex items-center gap-2 group mb-6"
              (click)="scrollTo($event, 'home')"
            >
              <div class="relative">
                <div
                  class="w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-electric-dark
                         flex items-center justify-center"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-white">
                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.8"/>
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6" transform="rotate(60 12 12)"/>
                    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4" transform="rotate(120 12 12)"/>
                  </svg>
                </div>
              </div>
              <span class="font-heading text-xl font-bold text-white">Nuclea</span>
            </a>

            <p class="text-slate-400 text-sm mb-6 max-w-xs">
              Empowering enterprises with AI-driven intelligence and scalable software solutions.
            </p>

            <!-- Social Links -->
            <div class="flex items-center gap-3">
              @for (social of socials; track social.name) {
                <a
                  [href]="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  [attr.aria-label]="social.name"
                  class="w-10 h-10 rounded-lg bg-white/5 border border-white/10
                         flex items-center justify-center
                         hover:bg-electric/20 hover:border-electric/30
                         transition-all duration-200"
                >
                  <app-icon [name]="social.icon" [size]="18" class="text-slate-400"/>
                </a>
              }
            </div>
          </div>

          <!-- Link Columns -->
          @for (section of footerSections; track section.title) {
            <div>
              <h4 class="font-heading font-semibold text-white mb-4">{{ section.title }}</h4>
              <ul class="space-y-3">
                @for (link of section.links; track link.label) {
                  <li>
                    @if (link.isExternal) {
                      <a
                        [href]="link.href"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-slate-400 hover:text-white transition-colors text-sm
                               inline-flex items-center gap-1"
                      >
                        {{ link.label }}
                        <app-icon name="external-link" [size]="12"/>
                      </a>
                    } @else {
                      <a
                        [href]="link.href"
                        class="text-slate-400 hover:text-white transition-colors text-sm"
                        (click)="scrollTo($event, link.href.slice(1))"
                      >
                        {{ link.label }}
                      </a>
                    }
                  </li>
                }
              </ul>
            </div>
          }
        </div>

        <!-- Bottom Bar -->
        <div class="mt-16 pt-8 border-t border-white/5">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-slate-500 text-sm">
              © {{ currentYear }} Nuclea Teknoloji. All rights reserved.
            </p>

            <div class="flex items-center gap-6">
              <a href="#" class="text-slate-500 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" class="text-slate-500 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class FooterComponent {
  private smoothScroll = inject(SmoothScrollService);

  readonly currentYear = new Date().getFullYear();

  readonly socials = [
    { name: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com' },
    { name: 'Twitter', icon: 'twitter', href: 'https://twitter.com' },
    { name: 'GitHub', icon: 'github', href: 'https://github.com' },
  ];

  readonly footerSections: FooterSection[] = [
    {
      title: 'Services',
      links: [
        { label: 'AI Solutions', href: '#ai-solutions' },
        { label: 'Enterprise Software', href: '#enterprise' },
        { label: 'Technical Consulting', href: '#contact' },
        { label: 'Custom Development', href: '#enterprise' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#capabilities' },
        { label: 'Our Process', href: '#process' },
        { label: 'Contact', href: '#contact' },
        { label: 'Careers', href: '#contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#', isExternal: true },
        { label: 'API Reference', href: '#', isExternal: true },
        { label: 'Blog', href: '#', isExternal: true },
        { label: 'Support', href: '#contact' },
      ],
    },
  ];

  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault();
    this.smoothScroll.scrollToElement(sectionId);
  }
}
