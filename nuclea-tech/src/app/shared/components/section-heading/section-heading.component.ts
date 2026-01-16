import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="alignmentClasses">
      @if (badge) {
        <span
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                 bg-electric/10 text-electric-light border border-electric/20 mb-4"
        >
          {{ badge }}
        </span>
      }

      <h2
        class="font-heading font-bold tracking-tight"
        [ngClass]="sizeClasses"
      >
        <span [class.gradient-text]="gradient" [class.text-white]="!gradient">
          {{ title }}
        </span>
        @if (highlight) {
          <span class="gradient-text"> {{ highlight }}</span>
        }
      </h2>

      @if (subtitle) {
        <p
          class="mt-4 text-slate-400 max-w-2xl"
          [class.mx-auto]="centered"
          [ngClass]="subtitleSizeClasses"
        >
          {{ subtitle }}
        </p>
      }
    </div>
  `,
  styles: [`
    .gradient-text {
      background: linear-gradient(135deg, #A78BFA 0%, #22D3EE 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `],
})
export class SectionHeadingComponent {
  @Input({ required: true }) title!: string;
  @Input() highlight?: string;
  @Input() subtitle?: string;
  @Input() badge?: string;
  @Input() centered = false;
  @Input() gradient = false;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'lg';

  get alignmentClasses(): string {
    return this.centered ? 'text-center' : '';
  }

  get sizeClasses(): string {
    const sizes = {
      sm: 'text-2xl md:text-3xl',
      md: 'text-3xl md:text-4xl',
      lg: 'text-3xl md:text-4xl lg:text-5xl',
      xl: 'text-4xl md:text-5xl lg:text-6xl',
    };
    return sizes[this.size];
  }

  get subtitleSizeClasses(): string {
    const sizes = {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-lg md:text-xl',
      xl: 'text-xl md:text-2xl',
    };
    return sizes[this.size];
  }
}
