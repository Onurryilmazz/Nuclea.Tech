import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  state,
  keyframes,
} from '@angular/animations';

// Fade in animation
export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.5s ease-out', style({ opacity: 1 })),
  ]),
]);

// Fade in up animation
export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(30px)' }),
    animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

// Fade in down animation
export const fadeInDown = trigger('fadeInDown', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-30px)' }),
    animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

// Slide in from left
export const slideInLeft = trigger('slideInLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-50px)' }),
    animate('0.6s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
]);

// Slide in from right
export const slideInRight = trigger('slideInRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(50px)' }),
    animate('0.6s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
]);

// Scale in animation
export const scaleIn = trigger('scaleIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.9)' }),
    animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
]);

// Stagger children animation
export const staggerFadeIn = trigger('staggerFadeIn', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        stagger('100ms', [
          animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);

// Glow pulse animation
export const glowPulse = trigger('glowPulse', [
  state('default', style({ boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' })),
  state('active', style({ boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' })),
  transition('default <=> active', animate('1s ease-in-out')),
]);

// Hover lift animation
export const hoverLift = trigger('hoverLift', [
  state('default', style({ transform: 'translateY(0)' })),
  state('hovered', style({ transform: 'translateY(-8px)' })),
  transition('default <=> hovered', animate('0.3s ease-out')),
]);

// Card reveal animation for bento grid
export const cardReveal = trigger('cardReveal', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(40px) scale(0.95)' }),
    animate(
      '0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      style({ opacity: 1, transform: 'translateY(0) scale(1)' })
    ),
  ]),
]);

// Logo spin animation
export const logoSpin = trigger('logoSpin', [
  transition(':enter', [
    animate(
      '1.5s ease-out',
      keyframes([
        style({ transform: 'rotate(0deg) scale(0)', opacity: 0, offset: 0 }),
        style({ transform: 'rotate(360deg) scale(1.1)', opacity: 1, offset: 0.8 }),
        style({ transform: 'rotate(360deg) scale(1)', opacity: 1, offset: 1 }),
      ])
    ),
  ]),
]);
