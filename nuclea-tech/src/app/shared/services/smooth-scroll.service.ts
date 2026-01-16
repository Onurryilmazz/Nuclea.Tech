import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SmoothScrollService {
  private platformId = inject(PLATFORM_ID);

  /**
   * Scroll to element by ID with smooth behavior
   */
  scrollToElement(elementId: string, offset: number = 80): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  /**
   * Scroll to top of page
   */
  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  /**
   * Get current scroll position
   */
  getScrollPosition(): number {
    if (!isPlatformBrowser(this.platformId)) return 0;
    return window.scrollY;
  }

  /**
   * Check if element is in viewport
   */
  isInViewport(element: Element, threshold: number = 0): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= -threshold &&
      rect.left >= -threshold &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) + threshold
    );
  }
}
