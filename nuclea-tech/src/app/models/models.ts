// Service card model
export interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  size?: 'default' | 'large' | 'wide' | 'tall';
  accentColor?: 'purple' | 'cyan' | 'gradient';
}

// Navigation item model
export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

// Process step model
export interface ProcessStep {
  id: number;
  icon: string;
  title: string;
  description: string;
}

// Capability item model
export interface Capability {
  icon: string;
  title: string;
  description: string;
  stats?: string;
}

// Footer link group
export interface FooterLinkGroup {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

// Contact form model
export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  message: string;
  service?: string;
}
