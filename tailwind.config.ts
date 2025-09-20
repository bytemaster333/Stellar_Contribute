import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        // Custom dark theme colors
        dark: {
          50: "hsl(210, 40%, 98%)",
          100: "hsl(210, 40%, 78%)",
          200: "hsl(240, 7%, 55%)",
          300: "hsl(240, 6%, 42%)",
          400: "hsl(240, 5%, 28%)",
          500: "hsl(240, 4%, 19%)",
          600: "hsl(240, 6%, 13%)",
          700: "hsl(240, 9%, 11%)",
          800: "hsl(240, 10%, 7%)",
          900: "hsl(240, 27%, 3%)",
        },
        // Stellar brand colors
        stellar: {
          50: "hsl(207, 100%, 97%)",
          100: "hsl(207, 100%, 94%)",
          400: "hsl(207, 90%, 60%)",
          500: "hsl(207, 100%, 50%)",
          600: "hsl(207, 90%, 54%)",
          700: "hsl(207, 80%, 48%)",
        },
        // Soroban brand colors
        soroban: {
          400: "hsl(258, 84%, 70%)",
          500: "hsl(258, 84%, 61%)",
          600: "hsl(258, 75%, 55%)",
          700: "hsl(258, 66%, 49%)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
