import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root',
})
export class ScrollAnimationService {
  private platformId = inject(PLATFORM_ID);
  private initialized = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      this.initialized.set(true);
    }
  }

  /**
   * Fade in element when scrolled into view
   */
  fadeInOnScroll(
    element: Element | string,
    options?: {
      delay?: number;
      duration?: number;
      y?: number;
      start?: string;
    }
  ): void {
    if (!this.initialized()) return;

    const { delay = 0, duration = 0.8, y = 50, start = 'top 85%' } = options || {};

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  /**
   * Stagger animate children elements
   */
  staggerOnScroll(
    container: Element | string,
    childSelector: string,
    options?: {
      stagger?: number;
      duration?: number;
      y?: number;
      start?: string;
    }
  ): void {
    if (!this.initialized()) return;

    const { stagger = 0.1, duration = 0.6, y = 40, start = 'top 85%' } = options || {};

    // Handle both Element and string selectors
    const containerEl = typeof container === 'string'
      ? document.querySelector(container)
      : container;

    if (!containerEl) return;

    const children = containerEl.querySelectorAll(childSelector);
    if (children.length === 0) return;

    gsap.fromTo(
      children,
      {
        opacity: 0,
        y,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerEl,
          start,
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  /**
   * Scale and fade in effect
   */
  scaleInOnScroll(
    element: Element | string,
    options?: {
      delay?: number;
      duration?: number;
      scale?: number;
      start?: string;
    }
  ): void {
    if (!this.initialized()) return;

    const { delay = 0, duration = 0.8, scale = 0.9, start = 'top 85%' } = options || {};

    gsap.fromTo(
      element,
      {
        opacity: 0,
        scale,
      },
      {
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  /**
   * Parallax effect for background elements
   */
  parallax(element: Element | string, speed: number = 0.5): void {
    if (!this.initialized()) return;

    gsap.to(element, {
      y: () => window.innerHeight * speed * -1,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  /**
   * Text reveal animation
   */
  textReveal(element: Element | string, options?: { duration?: number; delay?: number }): void {
    if (!this.initialized()) return;

    const { duration = 1, delay = 0 } = options || {};

    gsap.fromTo(
      element,
      {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
      },
      {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        duration,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  /**
   * Counter animation for statistics
   */
  animateCounter(
    element: Element | string,
    endValue: number,
    options?: {
      duration?: number;
      prefix?: string;
      suffix?: string;
    }
  ): void {
    if (!this.initialized()) return;

    const { duration = 2, prefix = '', suffix = '' } = options || {};
    const counter = { value: 0 };

    gsap.to(counter, {
      value: endValue,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reset',
      },
      onUpdate: () => {
        const el = typeof element === 'string' ? document.querySelector(element) : element;
        if (el) {
          el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
        }
      },
    });
  }

  /**
   * Horizontal slide animation
   */
  slideInHorizontal(
    element: Element | string,
    direction: 'left' | 'right' = 'left',
    options?: { duration?: number; distance?: number }
  ): void {
    if (!this.initialized()) return;

    const { duration = 0.8, distance = 100 } = options || {};
    const x = direction === 'left' ? -distance : distance;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        x,
      },
      {
        opacity: 1,
        x: 0,
        duration,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  /**
   * Refresh ScrollTrigger (call after dynamic content changes)
   */
  refresh(): void {
    if (this.initialized()) {
      ScrollTrigger.refresh();
    }
  }

  /**
   * Kill all ScrollTrigger instances
   */
  killAll(): void {
    if (this.initialized()) {
      ScrollTrigger.killAll();
    }
  }
}
