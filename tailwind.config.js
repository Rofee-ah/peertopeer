/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {

      // ─── COLOR TOKENS ───────────────────────────────────────────
      colors: {
        primary: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',   // Main CTA
          600: '#2563EB',   // Hover
          700: '#1D4ED8',   // Pressed
          900: '#1E3A8A',   // Footer / dark sections
        },
        neutral: {
          0:   '#FFFFFF',
          50:  '#F8FAFC',   // Page background
          100: '#F1F5F9',   // Card / section fill
          200: '#E2E8F0',   // Dividers
          400: '#94A3B8',   // Muted / placeholder
          600: '#475569',   // Secondary body text
          900: '#0F172A',   // Headings / primary text
        },
        accent: {
          soft: '#EFF6FF',  // Section tint (replaces peach)
          mid:  '#BFDBFE',  // Badge backgrounds
          text: '#1D4ED8',  // Text on accent backgrounds
        },
        star: '#FBBF24',    // Rating stars — keep amber
      },

      // ─── TYPOGRAPHY ─────────────────────────────────────────────
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', '"Helvetica Neue"', 'sans-serif'],
      },
      fontSize: {
        'xs':   ['12px', { lineHeight: '1.55' }],
        'sm':   ['13px', { lineHeight: '1.55' }],
        'base': ['15px', { lineHeight: '1.55' }],
        'md':   ['17px', { lineHeight: '1.55' }],
        'lg':   ['20px', { lineHeight: '1.3'  }],
        'xl':   ['24px', { lineHeight: '1.3'  }],
        '2xl':  ['32px', { lineHeight: '1.15' }],
        '3xl':  ['42px', { lineHeight: '1.15' }],
        '4xl':  ['56px', { lineHeight: '1.1'  }],
      },

      // ─── SPACING ────────────────────────────────────────────────
      spacing: {
        '1':  '4px',
        '2':  '8px',
        '3':  '12px',
        '4':  '16px',
        '5':  '20px',
        '6':  '24px',
        '8':  '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },

      // ─── BORDER RADIUS ──────────────────────────────────────────
      borderRadius: {
        'sm':   '6px',
        'md':   '10px',
        'lg':   '16px',
        'xl':   '24px',
        '2xl':  '32px',
        'full': '9999px',
      },

      // ─── BOX SHADOWS ────────────────────────────────────────────
      boxShadow: {
        'xs':      '0 1px 3px rgba(15,23,42,0.06)',
        'sm':      '0 2px 8px rgba(15,23,42,0.08)',
        'md':      '0 4px 16px rgba(15,23,42,0.10)',
        'lg':      '0 8px 32px rgba(15,23,42,0.12)',
        'xl':      '0 16px 48px rgba(15,23,42,0.14)',
        'primary': '0 8px 24px rgba(37,99,235,0.25)',
      },

      // ─── TRANSITIONS ────────────────────────────────────────────
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring':  'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'out':     'cubic-bezier(0, 0, 0.2, 1)',
      },
      transitionDuration: {
        'fast':   '150ms',
        'base':   '250ms',
        'slow':   '350ms',
        'drawer': '320ms',
      },

      // ─── MAX WIDTH ──────────────────────────────────────────────
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
};
  