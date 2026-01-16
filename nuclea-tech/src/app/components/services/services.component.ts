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

interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  size: 'default' | 'large' | 'wide' | 'tall';
  accent: 'purple' | 'cyan' | 'gradient';
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, GlassCardComponent, SectionHeadingComponent, IconComponent],
  template: `
    <section id="ai-solutions" class="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      <!-- Enhanced Background -->
      <div class="absolute inset-0 bg-slate-dark-900"></div>
      
      <!-- Animated Gradient Mesh -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-electric/20 rounded-full blur-[120px] animate-pulse"></div>
        <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-cyan/15 rounded-full blur-[100px] animate-pulse" style="animation-delay: 1s"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-electric/10 rounded-full blur-[150px]"></div>
      </div>
      
      <!-- Grid Pattern Overlay -->
      <div class="absolute inset-0 bg-grid-pattern opacity-30"></div>
      
      <!-- Floating Particles -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        @for (i of [1,2,3,4,5,6]; track i) {
          <div 
            class="particle absolute w-1 h-1 bg-electric/60 rounded-full animate-float"
            [style.left.%]="10 + i * 15"
            [style.top.%]="20 + (i % 3) * 25"
            [style.animation-delay]="i * 0.5 + 's'"
          ></div>
        }
      </div>

      <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Enhanced Section Header -->
        <div #sectionHeader class="mb-20 text-center">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/30 mb-6">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-electric"></span>
            </span>
            <span class="text-sm font-medium text-electric-light tracking-wider uppercase">AI Services</span>
          </div>
          
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            AI-Powered
            <span class="relative inline-block">
              <span class="bg-gradient-to-r from-electric via-electric-light to-accent-cyan bg-clip-text text-transparent">
                Solutions
              </span>
              <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 4 100 4 150 6C200 8 250 4 298 8" stroke="url(#underline-gradient)" stroke-width="3" stroke-linecap="round"/>
                <defs>
                  <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#8B5CF6"/>
                    <stop offset="50%" stop-color="#A78BFA"/>
                    <stop offset="100%" stop-color="#06B6D4"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
          
          <p class="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Harness the power of artificial intelligence to transform your business operations,
            automate workflows, and unlock data-driven insights.
          </p>
        </div>
        <!-- Featured Hero Card -->
        <div #bentoGrid class="max-w-7xl mx-auto">
          <!-- Main Featured Service -->
          <div class="bento-item mb-8">
            <div class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-dark-800/90 via-slate-dark-700/50 to-slate-dark-800/90 border border-white/10 p-8 md:p-12">
              <!-- Animated Background Gradient -->
              <div class="absolute inset-0 bg-gradient-to-r from-electric/10 via-transparent to-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <!-- Floating Orbs -->
              <div class="absolute top-10 right-10 w-32 h-32 bg-electric/20 rounded-full blur-3xl animate-pulse"></div>
              <div class="absolute bottom-10 left-20 w-24 h-24 bg-accent-cyan/15 rounded-full blur-2xl animate-pulse" style="animation-delay: 0.5s"></div>
              
              <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <!-- Left Content -->
                <div>
                  <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric/20 border border-electric/30 mb-6">
                    <app-icon name="sparkles" [size]="16" class="text-electric-light"/>
                    <span class="text-xs font-semibold text-electric-light uppercase tracking-wider">Featured Solution</span>
                  </div>
                  
                  <h3 class="text-3xl md:text-4xl font-heading font-bold text-white mb-4 group-hover:text-electric-light transition-colors duration-300">
                    LLM Integration & <br/>
                    <span class="bg-gradient-to-r from-electric-light to-accent-cyan bg-clip-text text-transparent">RAG Systems</span>
                  </h3>
                  
                  <p class="text-slate-400 text-lg leading-relaxed mb-8">
                    Seamlessly integrate large language models into your existing systems for intelligent document processing, conversational AI, and automated content generation with enterprise-grade security.
                  </p>
                  
                  <!-- Feature Pills -->
                  <div class="flex flex-wrap gap-3 mb-8">
                    @for (feature of ['GPT-4 & Claude', 'Custom Fine-tuning', 'RAG Architecture', 'Vector Databases']; track feature) {
                      <span class="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-electric/10 hover:border-electric/30 transition-all duration-300">
                        {{ feature }}
                      </span>
                    }
                  </div>
                  
                  <button class="group/btn inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-electric to-electric-dark text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-electric/30 hover:-translate-y-0.5">
                    <span>Explore LLM Solutions</span>
                    <app-icon name="arrow-right" [size]="18" class="transition-transform duration-300 group-hover/btn:translate-x-1"/>
                  </button>
                </div>
                
                <!-- Right Visual -->
                <div class="relative hidden lg:block">
                  <div class="relative rounded-2xl bg-slate-dark-900/80 border border-white/10 p-6 backdrop-blur-sm">
                    <!-- Code-like Visual -->
                    <div class="space-y-4">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-400/60"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-400/60"></div>
                        <div class="w-3 h-3 rounded-full bg-green-400/60"></div>
                      </div>
                      <div class="space-y-3 font-mono text-sm">
                        <div class="flex gap-3">
                          <span class="text-electric-light">const</span>
                          <span class="text-accent-cyan">ai</span>
                          <span class="text-white">=</span>
                          <span class="text-electric-light">await</span>
                          <span class="text-accent-cyan-light">nuclea</span>
                          <span class="text-white">.</span>
                          <span class="text-electric-light">init</span>
                          <span class="text-slate-400">()</span>
                        </div>
                        <div class="flex gap-3">
                          <span class="text-electric-light">const</span>
                          <span class="text-accent-cyan">response</span>
                          <span class="text-white">=</span>
                          <span class="text-electric-light">await</span>
                          <span class="text-accent-cyan-light">ai</span>
                          <span class="text-white">.</span>
                          <span class="text-electric-light">query</span>
                          <span class="text-slate-400">(</span>
                        </div>
                        <div class="pl-6 text-accent-cyan">"Analyze sales data..."</div>
                        <div class="text-slate-400">)</div>
                        <div class="h-px bg-gradient-to-r from-electric/50 to-transparent my-4"></div>
                        <div class="flex items-center gap-2 text-green-400/80">
                          <app-icon name="check-circle" [size]="16"/>
                          <span class="text-slate-300">Response in 0.4s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Decorative Elements -->
                  <div class="absolute -top-4 -right-4 w-20 h-20 bg-electric/20 rounded-full blur-xl"></div>
                  <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-accent-cyan/20 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Service Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @for (service of otherAiServices; track service.id; let i = $index) {
              <div class="bento-item group relative">
                <!-- Card -->
                <div class="relative h-full rounded-2xl overflow-hidden">
                  <!-- Gradient Border on Hover -->
                  <div class="absolute inset-0 p-[1px] rounded-2xl bg-gradient-to-br from-electric/50 via-transparent to-accent-cyan/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div class="w-full h-full rounded-2xl bg-slate-dark-800"></div>
                  </div>
                  
                  <div class="relative h-full bg-slate-dark-800/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6 group-hover:border-transparent transition-all duration-500">
                    <!-- Icon with Gradient Background -->
                    <div class="relative w-14 h-14 rounded-xl mb-5 overflow-hidden">
                      <div 
                        class="absolute inset-0 opacity-100 group-hover:scale-110 transition-transform duration-500"
                        [ngClass]="{
                          'bg-gradient-to-br from-electric to-electric-dark': service.accent === 'purple',
                          'bg-gradient-to-br from-accent-cyan to-accent-cyan/70': service.accent === 'cyan',
                          'bg-gradient-to-br from-electric via-electric-light to-accent-cyan': service.accent === 'gradient'
                        }"
                      ></div>
                      <div class="absolute inset-0 flex items-center justify-center">
                        <app-icon [name]="service.icon" [size]="24" class="text-white"/>
                      </div>
                    </div>
                    
                    <!-- Content -->
                    <h4 class="text-xl font-heading font-semibold text-white mb-3 group-hover:text-electric-light transition-colors duration-300">
                      {{ service.title }}
                    </h4>
                    <p class="text-slate-400 text-sm leading-relaxed mb-5">
                      {{ service.description }}
                    </p>
                    
                    <!-- Feature Tags -->
                    <div class="flex flex-wrap gap-2">
                      @for (feature of service.features; track feature) {
                        <span class="px-2.5 py-1 text-xs rounded-md bg-white/5 text-slate-400 border border-white/5">
                          {{ feature }}
                        </span>
                      }
                    </div>
                    
                    <!-- Hover Arrow -->
                    <div class="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-2">
                      <app-icon name="arrow-right" [size]="18" class="text-electric-light"/>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Enterprise Software Section -->
    <section id="enterprise" class="relative py-24 md:py-32 overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 bg-gradient-to-b from-slate-dark-900 via-slate-dark-800 to-slate-dark-900"></div>
      <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-3xl"></div>

      <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div #enterpriseHeader class="mb-16">
          <app-section-heading
            title="Enterprise"
            highlight="Software"
            subtitle="Battle-tested solutions designed for scale. Our enterprise systems handle
                     millions of transactions while maintaining rock-solid reliability."
            badge="Custom Development"
            [centered]="true"
            size="lg"
          />
        </div>

        <!-- Enterprise Grid -->
        <div #enterpriseGrid class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          @for (service of enterpriseServices; track service.id) {
            <app-glass-card
              [size]="service.size"
              [accent]="service.accent"
              padding="large"
            >
              <div class="h-full flex flex-col">
                <!-- Icon -->
                <div
                  class="w-14 h-14 rounded-xl flex items-center justify-center mb-6
                         bg-gradient-to-br from-accent-cyan/20 to-electric/10"
                >
                  <app-icon [name]="service.icon" [size]="28" class="text-accent-cyan-light"/>
                </div>

                <!-- Content -->
                <h3 class="text-xl md:text-2xl font-heading font-semibold text-white mb-3">
                  {{ service.title }}
                </h3>
                <p class="text-slate-400 mb-6 flex-grow">
                  {{ service.description }}
                </p>

                <!-- Features -->
                <ul class="space-y-2">
                  @for (feature of service.features; track feature) {
                    <li class="flex items-center gap-2 text-sm text-slate-300">
                      <app-icon name="check" [size]="16" class="text-accent-cyan flex-shrink-0"/>
                      {{ feature }}
                    </li>
                  }
                </ul>
              </div>
            </app-glass-card>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .bento-item {
      opacity: 0;
      transform: translateY(30px);
    }
  `],
})
export class ServicesComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private scrollAnimation = inject(ScrollAnimationService);

  @ViewChild('sectionHeader') sectionHeader!: ElementRef;
  @ViewChild('bentoGrid') bentoGrid!: ElementRef;
  @ViewChild('enterpriseHeader') enterpriseHeader!: ElementRef;
  @ViewChild('enterpriseGrid') enterpriseGrid!: ElementRef;

  readonly aiServices: ServiceItem[] = [
    {
      id: 'llm',
      icon: 'brain',
      title: 'LLM Integration',
      description: 'Seamlessly integrate large language models into your existing systems for intelligent document processing, conversational AI, and automated content generation.',
      features: ['GPT-4 & Claude Integration', 'Custom Fine-tuning', 'RAG Systems'],
      size: 'large',
      accent: 'purple',
    },
    {
      id: 'agents',
      icon: 'bot',
      title: 'AI Automation Agents',
      description: 'Deploy autonomous agents that handle complex workflows, from customer support to data processing.',
      features: ['Multi-step Reasoning', 'Tool Integration', 'Self-correction'],
      size: 'default',
      accent: 'cyan',
    },
    {
      id: 'predictive',
      icon: 'trending-up',
      title: 'Predictive Analytics',
      description: 'Machine learning models that forecast trends and optimize decision-making.',
      features: ['Demand Forecasting', 'Risk Assessment', 'Anomaly Detection'],
      size: 'default',
      accent: 'gradient',
    },
    {
      id: 'nlp',
      icon: 'sparkles',
      title: 'NLP Solutions',
      description: 'Natural language processing for sentiment analysis, entity extraction, and intelligent search.',
      features: ['Sentiment Analysis', 'Named Entity Recognition', 'Semantic Search'],
      size: 'wide',
      accent: 'purple',
    },
  ];

  // Get all AI services except the first one (featured)
  get otherAiServices(): ServiceItem[] {
    return this.aiServices.slice(1);
  }

  readonly enterpriseServices: ServiceItem[] = [
    {
      id: 'crm',
      icon: 'users',
      title: 'CRM Systems',
      description: 'Custom CRM solutions that scale with your business, featuring advanced analytics and automation.',
      features: ['360° Customer View', 'Sales Pipeline Automation', 'Integration APIs'],
      size: 'default',
      accent: 'cyan',
    },
    {
      id: 'erp',
      icon: 'layers',
      title: 'ERP Platforms',
      description: 'End-to-end enterprise resource planning systems handling millions of daily transactions.',
      features: ['Real-time Inventory', 'Financial Management', 'Supply Chain'],
      size: 'default',
      accent: 'purple',
    },
    {
      id: 'cms',
      icon: 'database',
      title: 'CMS Architecture',
      description: 'Headless and hybrid content management systems built for performance and flexibility.',
      features: ['Headless API', 'Multi-tenant Support', 'CDN Integration'],
      size: 'default',
      accent: 'gradient',
    },
    {
      id: 'mobile',
      icon: 'globe',
      title: 'Web & Mobile Apps',
      description: 'High-performance applications using modern frameworks and cloud-native architecture.',
      features: ['Cross-platform', 'Offline-first', 'Real-time Sync'],
      size: 'wide',
      accent: 'cyan',
    },
    {
      id: 'data',
      icon: 'bar-chart',
      title: 'Data Platforms',
      description: 'Big data processing pipelines and analytics dashboards for data-driven decisions.',
      features: ['ETL Pipelines', 'Data Lakes', 'BI Dashboards'],
      size: 'default',
      accent: 'purple',
    },
  ];

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
    }
  }

  private initScrollAnimations(): void {
    // Animate section headers
    this.scrollAnimation.fadeInOnScroll(this.sectionHeader.nativeElement, { y: 40 });
    this.scrollAnimation.fadeInOnScroll(this.enterpriseHeader.nativeElement, { y: 40 });

    // Animate bento grid items with stagger
    this.scrollAnimation.staggerOnScroll(
      this.bentoGrid.nativeElement,
      '.bento-item',
      { stagger: 0.1, y: 40 }
    );

    this.scrollAnimation.staggerOnScroll(
      this.enterpriseGrid.nativeElement,
      'app-glass-card',
      { stagger: 0.1, y: 40 }
    );
  }
}
