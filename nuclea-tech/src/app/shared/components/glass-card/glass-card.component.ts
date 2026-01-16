import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

type CardSize = 'default' | 'large' | 'wide' | 'tall';
type AccentColor = 'purple' | 'cyan' | 'gradient';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="glass-card-inner h-full"
      [class.p-6]="padding === 'default'"
      [class.p-8]="padding === 'large'"
      [class.p-4]="padding === 'small'"
      [@hoverState]="isHovered ? 'hovered' : 'default'"
      (mouseenter)="isHovered = true"
      (mouseleave)="isHovered = false"
    >
      <!-- Glow effect -->
      <div
        class="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500"
        [class.opacity-100]="isHovered"
        [ngClass]="glowClass"
      ></div>

      <!-- Top gradient line -->
      <div
        class="absolute top-0 left-0 right-0 h-px"
        [ngClass]="topLineClass"
      ></div>

      <!-- Content -->
      <div class="relative z-10">
        <ng-content></ng-content>
      </div>

      <!-- Corner accent -->
      @if (showCornerAccent) {
        <div
          class="absolute top-0 right-0 w-20 h-20 opacity-30"
          [ngClass]="cornerAccentClass"
        ></div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
    }

    .glass-card-inner {
      position: relative;
      overflow: hidden;
      border-radius: 1rem;
      background: rgba(28, 32, 51, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(139, 92, 246, 0.15);
      transition: all 0.3s ease;
    }

    :host:hover .glass-card-inner {
      border-color: rgba(139, 92, 246, 0.3);
      transform: translateY(-4px);
    }
  `],
  animations: [
    trigger('hoverState', [
      state('default', style({
        transform: 'translateY(0)',
      })),
      state('hovered', style({
        transform: 'translateY(-4px)',
      })),
      transition('default <=> hovered', animate('0.3s ease-out')),
    ]),
  ],
})
export class GlassCardComponent {
  @Input() size: CardSize = 'default';
  @Input() accent: AccentColor = 'purple';
  @Input() padding: 'small' | 'default' | 'large' = 'default';
  @Input() showCornerAccent = false;
  @Input() interactive = true;

  isHovered = false;

  @HostBinding('class') get hostClasses(): string {
    const sizeClasses: Record<CardSize, string> = {
      default: '',
      large: 'col-span-1 md:col-span-2 row-span-1 md:row-span-2',
      wide: 'col-span-1 md:col-span-2',
      tall: 'row-span-1 md:row-span-2',
    };
    return sizeClasses[this.size];
  }

  get glowClass(): string {
    const classes: Record<AccentColor, string> = {
      purple: 'bg-gradient-radial from-electric/20 to-transparent',
      cyan: 'bg-gradient-radial from-accent-cyan/20 to-transparent',
      gradient: 'bg-gradient-radial from-electric/15 via-accent-cyan/10 to-transparent',
    };
    return classes[this.accent];
  }

  get topLineClass(): string {
    const classes: Record<AccentColor, string> = {
      purple: 'bg-gradient-to-r from-transparent via-electric/50 to-transparent',
      cyan: 'bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent',
      gradient: 'bg-gradient-to-r from-electric/50 via-accent-cyan/50 to-electric/50',
    };
    return classes[this.accent];
  }

  get cornerAccentClass(): string {
    const classes: Record<AccentColor, string> = {
      purple: 'bg-gradient-to-bl from-electric/30 to-transparent',
      cyan: 'bg-gradient-to-bl from-accent-cyan/30 to-transparent',
      gradient: 'bg-gradient-to-bl from-electric/20 via-accent-cyan/20 to-transparent',
    };
    return classes[this.accent];
  }
}
