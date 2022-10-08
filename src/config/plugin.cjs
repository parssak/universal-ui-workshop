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

const themes = [
  {
    name: "default",
    colors: {
      "text-base": colors.neutral["800"],
      "text-muted": colors.neutral["500"],
      "text-inverted": colors.neutral["100"],
      "bg-base": colors.neutral["100"],
      "bg-inverted": colors.neutral["800"],
      "border-base": colors.neutral["300"],
      "border-inverted": colors.neutral["600"]
    }
  },
  {
    name: "dark",
    colors: {
      "text-base": colors.neutral["100"],
      "text-muted": colors.neutral["400"],
      "text-inverted": colors.neutral["800"],
      "bg-base": colors.neutral["800"],
      "bg-inverted": colors.neutral["100"],
      "border-base": colors.neutral["600"],
      "border-inverted": colors.neutral["300"]
    }
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
            base: "rgb(var(--color-bg-base) / <alpha-value>)",
            inverted: "rgb(var(--color-bg-inverted) / <alpha-value>)"
          }
        },
        borderColor: {
          theme: {
            base: "rgb(var(--color-border-base) / <alpha-value>)",
            inverted: "rgb(var(--color-border-inverted) / <alpha-value>)"
          }
        }
      }
    }
  }
);
