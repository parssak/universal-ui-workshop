const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const Color = require("color");

// -----------------------------------------------------------------
// Extract RGB channels from a color
// -----------------------------------------------------------------

function getRgbChannels(color) {
  return Color(color).rgb().array().join(" ");
}

// -----------------------------------------------------------------
// Themes definition
// -----------------------------------------------------------------

const getColorsForTheme = (color, isDark = false) => {
  return {
    "text-base": colors[color][isDark ? "50" : "800"],
    "text-muted": colors[color][isDark ? "200" : "500"],
    "text-inverted": colors[color][isDark ? "800" : "50"],
    "bg-pure": isDark ? colors.black : colors.white,
    "bg-base": colors[color][isDark ? "800" : "100"],
    "bg-muted": colors[color][isDark ? "600" : "200"],
    "bg-inverted": colors[color][isDark ? "100" : "800"],
    "border-base": colors[color][isDark ? "500" : "300"],
    "border-inverted": colors[color][isDark ? "300" : "500"],
    "border-muted": colors[color][isDark ? "500" : "400"]
  };
};

const themes = [
  {
    name: "default",
    colors: getColorsForTheme("neutral", false)
  },
  {
    name: "brand",
    colors: getColorsForTheme("indigo", true)
  },
  {
    name: "dark",
    colors: getColorsForTheme("neutral", true)
  },
  {
    name: "error",
    colors: getColorsForTheme("rose", true)
  },

  {
    name: "success",
    colors: getColorsForTheme("emerald", true)
  },
  {
    name: "warning",
    colors: getColorsForTheme("amber", true)
  },
  {
    name: "info",
    colors: getColorsForTheme("sky", true)
  }
];

// -----------------------------------------------------------------
// Tailwind CSS plugin
// -----------------------------------------------------------------

module.exports = plugin(
  function ({ addBase, addVariant }) {
    // -----------------------------------------------------------------
    // Root scope CSS variables
    // -----------------------------------------------------------------

    const defaultColors = themes[0].colors;

    const getCSSColorVariables = (colors) => {
      return Object.fromEntries(
        Object.entries(colors).map(([name, value]) => {
          return [[`--color-${name}`], getRgbChannels(value)];
        })
      );
    };

    addBase({
      ":root": {
        ...getCSSColorVariables(defaultColors)
      }
    });

    // -----------------------------------------------------------------
    // Redefine CSS variables for each theme
    // -----------------------------------------------------------------

    themes.forEach((theme) => {
      const { colors, name } = theme;
      addBase({
        [`[data-theme=${name}]`]: {
          ...getCSSColorVariables(colors)
        }
      });
    });

    // -----------------------------------------------------------------
    // BONUS: Add theme-specific variant for bespoke theming overrides
    // -----------------------------------------------------------------

    themes.forEach((theme) => {
      addVariant(`theme-${theme.name}`, `[data-theme=${theme.name}] &`);
    });
  },

  // -----------------------------------------------------------------
  // Add semantic color names to Tailwind's color palette
  // -----------------------------------------------------------------

  {
    theme: {
      extend: {
        textColor: {
          theme: {
            base: "rgb(var(--color-text-base) / <alpha-value>)",
            inverted: "rgb(var(--color-text-inverted) / <alpha-value>)",
            muted: "rgb(var(--color-text-muted) / <alpha-value>)"
          }
        },
        backgroundColor: {
          theme: {
            pure: "rgb(var(--color-bg-pure) / <alpha-value>)",
            base: "rgb(var(--color-bg-base) / <alpha-value>)",
            inverted: "rgb(var(--color-bg-inverted) / <alpha-value>)",
            muted: "rgb(var(--color-bg-muted) / <alpha-value>)"
          }
        },
        borderColor: {
          theme: {
            base: "rgb(var(--color-border-base) / <alpha-value>)",
            inverted: "rgb(var(--color-border-inverted) / <alpha-value>)",
            muted: "rgb(var(--color-border-muted) / <alpha-value>)"
          }
        }
      }
    }
  }
);
