// tailwind.config.js
// Add this to your Tailwind configuration for the complete luxury color scheme

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Luxury Color Palette
        'greed-gold': {
          50: '#fef9f3',
          100: '#fdf2e4',
          200: '#fbe4c4',
          300: '#f8d19e',
          400: '#f5b567',
          500: '#f59e0b', // Primary Gold
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        'greed-amber': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Amber accent
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        'greed-slate': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a', // Dark background
          950: '#020617', // Darker background
        },
        'greed-green': '#10b981', // Keep as accent if needed
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        'gold-gradient': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)',
        'amber-shine': 'linear-gradient(to right, #f59e0b, #fbbf24, #fcd34d)',
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(245, 158, 11, 0.3)',
        'gold-lg': '0 10px 40px rgba(245, 158, 11, 0.4)',
        'luxury': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}

/* 
LUXURY COLOR USAGE GUIDE
========================

PRIMARY COLORS:
- Slate 950/900: Main dark backgrounds (#020617, #0f172a)
- Amber 500: Primary accent color (#f59e0b)
- Amber 400: Hover states (#fbbf24)
- Amber 300: Light accents (#fcd34d)

USAGE EXAMPLES:

1. BACKGROUNDS:
   - Main dark: bg-slate-950 or bg-slate-900
   - Gradient dark: bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950
   - Cards: bg-slate-900/50 or bg-slate-800/30

2. TEXT:
   - Headings: text-amber-500 or use gradient text:
     bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 bg-clip-text text-transparent
   - Body text: text-gray-300 or text-gray-400
   - Muted text: text-gray-500

3. BUTTONS:
   - Primary: bg-gradient-to-r from-amber-600 to-amber-500 text-white
   - Hover: hover:from-amber-500 hover:to-amber-400
   - With shadow: shadow-lg shadow-amber-500/30

4. BORDERS:
   - Subtle: border border-amber-900/20
   - Prominent: border-amber-700/30
   - Hover: hover:border-amber-500/50

5. ICONS:
   - Primary: text-amber-500
   - Secondary: text-amber-400
   - Muted: text-gray-400

6. HOVER EFFECTS:
   - Text: hover:text-amber-400
   - Background: hover:bg-amber-900/20
   - Shadow: hover:shadow-lg hover:shadow-amber-500/20

7. GLASSMORPHISM:
   - backdrop-blur-xl bg-slate-900/95

COMPLETE REPLACEMENT GUIDE:
============================
Replace all instances of "greed-green" with these luxury alternatives:

OLD: bg-greed-green
NEW: bg-gradient-to-r from-amber-600 to-amber-500

OLD: text-greed-green
NEW: text-amber-500

OLD: hover:bg-green-900
NEW: hover:bg-amber-900/20 or hover:from-amber-500 hover:to-amber-400

OLD: border-greed-green
NEW: border-amber-700/30

This creates a cohesive luxury aesthetic with:
- Deep, sophisticated dark backgrounds
- Rich amber/gold accents for premium feel
- Smooth gradients and transitions
- Subtle transparency and glass effects
- Professional shadows and glows
*/