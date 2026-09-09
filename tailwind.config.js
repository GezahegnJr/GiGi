/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#0A0A0D',
          900: '#0F0F12',
          850: '#131317',
          800: '#18181E',
          700: '#22222B',
          600: '#32323E',
        },
        gold: {
          DEFAULT: '#D4AF37',
          50: '#FAF6E6',
          100: '#F5ECC8',
          200: '#EDDB92',
          300: '#E4CA5C',
          400: '#DCB92B',
          500: '#D4AF37',
          600: '#B08E19',
          700: '#846B13',
          800: '#58470C',
          900: '#2C2406',
        },
        earth: {
          50: '#FBF8F4',
          100: '#F4ECE3',
          200: '#E6D5C2',
          300: '#D4BA9F',
          400: '#BA9A7B',
          500: '#9B7B5B',
          600: '#7B5E43',
          700: '#5D4430',
          800: '#402D20',
          900: '#261A13',
        },
        spotify: '#1DB954',
        tiktok: {
          DEFAULT: '#FE2C55',
          cyan: '#25F4EE'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        ethiopic: ['"Noto Serif Ethiopic"', 'sans-serif']
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5D77F 0%, #D4AF37 50%, #8E701C 100%)',
        'subtle-radial': 'radial-gradient(circle at center, rgba(212, 175, 55, 0.08) 0%, rgba(15, 15, 18, 0) 70%)',
        'hero-gradient': 'linear-gradient(to bottom, rgba(15, 15, 18, 0.4) 0%, rgba(15, 15, 18, 0.85) 75%, #0F0F12 100%)',
      },
      boxShadow: {
        'gold-sm': '0 0 15px -3px rgba(212, 175, 55, 0.25)',
        'gold-md': '0 4px 25px 0 rgba(212, 175, 55, 0.2)',
        'gold-glow': '0 0 30px rgba(212, 175, 55, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'wave-bar': 'waveBar 1.2s ease-in-out infinite alternate',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        waveBar: {
          '0%': { height: '20%' },
          '100%': { height: '100%' },
        }
      }
    },
  },
  plugins: [],
}
