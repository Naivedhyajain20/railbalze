/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Core Colors */
        background: 'var(--color-background)', /* slate-50 */
        foreground: 'var(--color-foreground)', /* slate-900 */
        border: 'var(--color-border)', /* slate-200 */
        input: 'var(--color-input)', /* white */
        ring: 'var(--color-ring)', /* sky-500 */
        
        /* Card Colors */
        card: {
          DEFAULT: 'var(--color-card)', /* white */
          foreground: 'var(--color-card-foreground)' /* slate-900 */
        },
        
        /* Popover Colors */
        popover: {
          DEFAULT: 'var(--color-popover)', /* white */
          foreground: 'var(--color-popover-foreground)' /* slate-900 */
        },
        
        /* Muted Colors */
        muted: {
          DEFAULT: 'var(--color-muted)', /* slate-100 */
          foreground: 'var(--color-muted-foreground)' /* slate-600 */
        },
        
        /* Primary Colors */
        primary: {
          DEFAULT: 'var(--color-primary)', /* blue-800 */
          foreground: 'var(--color-primary-foreground)' /* white */
        },
        
        /* Secondary Colors */
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* slate-500 */
          foreground: 'var(--color-secondary-foreground)' /* white */
        },
        
        /* Accent Colors */
        accent: {
          DEFAULT: 'var(--color-accent)', /* sky-500 */
          foreground: 'var(--color-accent-foreground)' /* white */
        },
        
        /* Status Colors */
        success: {
          DEFAULT: 'var(--color-success)', /* emerald-600 */
          foreground: 'var(--color-success-foreground)' /* white */
        },
        
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber-600 */
          foreground: 'var(--color-warning-foreground)' /* white */
        },
        
        error: {
          DEFAULT: 'var(--color-error)', /* red-600 */
          foreground: 'var(--color-error-foreground)' /* white */
        },
        
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-600 */
          foreground: 'var(--color-destructive-foreground)' /* white */
        },
        
        /* Railway Specific Colors */
        'railway-safe': {
          DEFAULT: 'var(--color-railway-safe)', /* emerald-600 */
          foreground: 'var(--color-success-foreground)' /* white */
        },
        
        'railway-caution': {
          DEFAULT: 'var(--color-railway-caution)', /* amber-600 */
          foreground: 'var(--color-warning-foreground)' /* white */
        },
        
        'railway-danger': {
          DEFAULT: 'var(--color-railway-danger)', /* red-600 */
          foreground: 'var(--color-error-foreground)' /* white */
        },
        
        /* Surface Colors */
        surface: {
          DEFAULT: 'var(--color-surface)', /* white */
          foreground: 'var(--color-surface-foreground)' /* slate-900 */
        },
        
        /* Text Colors */
        'text-primary': 'var(--color-text-primary)', /* slate-900 */
        'text-secondary': 'var(--color-text-secondary)' /* slate-600 */
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace']
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }]
      },
      
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700'
      },
      
      borderRadius: {
        'sm': 'var(--radius-sm)', /* 4px */
        'DEFAULT': 'var(--radius-default)', /* 6px */
        'lg': 'var(--radius-lg)', /* 8px */
        'xl': 'var(--radius-xl)' /* 12px */
      },
      
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow-default)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)'
      },
      
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'pulse-alert': 'status-pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'tooltip-enter': 'tooltipEnter 150ms ease-out'
      },
      
      transitionDuration: {
        'fast': 'var(--duration-fast)', /* 150ms */
        'normal': 'var(--duration-normal)', /* 200ms */
        'slow': 'var(--duration-slow)', /* 300ms */
        'slower': 'var(--duration-slower)' /* 400ms */
      },
      
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px'
      },
      
      zIndex: {
        'navigation': '1000',
        'dropdown': '1100',
        'sidebar': '1200',
        'modal': '1300',
        'tooltip': '1400'
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      
      minHeight: {
        'touch': '48px'
      },
      
      minWidth: {
        'touch': '48px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ]
}