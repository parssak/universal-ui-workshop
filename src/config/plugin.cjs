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
  const STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

  const C = colors[color];
  const cMap = (l, d) => C[STEPS[isDark ? d : l]];

  return {
    "text-base": cMap(8, 0),
    "text-inverted": cMap(0, 8),
    "text-muted": cMap(5, 3),
    "text-active": cMap(9, 1),
    "bg-pure": isDark ? colors.black : colors.white,
    "bg-base": cMap(0, 8),
    "bg-inverted": cMap(8, 0),
    "bg-active": cMap(2, 6),
    "border-base": cMap(4, 5),
    "border-inverted": cMap(5, 4),
    "border-active": cMap(3, 5)
  };
};

const THEMES_CONFIG = [
  {
    name: "neutral",
    color: "gray"
  },
  {
    name: "brand",
    color: "indigo"
  },
  {
    name: "error",
    color: "rose"
  },
  {
    name: "success",
    color: "emerald"
  },
  {
    name: "warning",
    color: "orange"
  },
  {
    name: "info",
    color: "sky"
  }
];

const SIZES_CONFIG = [
  {
    name: "xs",
    sizes: {
      px: "0.25rem",
      py: "0.125rem",
      text: "0.75rem",
      line: "1rem"
    }
  },
  {
    name: "sm",
    sizes: {
      px: "0.5rem",
      py: "0.25rem",
      text: "0.875rem",
      line: "1.25rem"
    }
  },
  {
    name: "md",
    sizes: {
      px: "0.75rem",
      py: "0.375rem",
      text: "1rem",
      line: "1.5rem"
    }
  },
  {
    name: "lg",
    sizes: {
      px: "1rem",
      py: "0.375rem",
      text: "1.125rem",
      line: "1.5rem"
    }
  },
  {
    name: "xl",
    sizes: {
      px: "1.25rem",
      py: "0.5rem",
      text: "1.25rem",
      line: "1.5rem"
    }
  }
];

// Create light/dark themes for each color
const themes = THEMES_CONFIG.reduce((acc, theme) => {
  const { name, color } = theme;
  return [
    ...acc,
    {
      name,
      colors: getColorsForTheme(color)
    },
    {
      name: `${name}-dark`,
      colors: getColorsForTheme(color, true)
    }
  ];
}, []);

const sizes = SIZES_CONFIG;

// -----------------------------------------------------------------
// Tailwind CSS plugin
// -----------------------------------------------------------------

module.exports = plugin(
  function ({ addBase, addVariant }) {
    // -----------------------------------------------------------------
    // Root scope CSS variables
    // -----------------------------------------------------------------

    const defaultColors = themes[0].colors;
    const defaultSizes = sizes[2].sizes;

    const getCSSColorVariables = (colors) => {
      return Object.fromEntries(
        Object.entries(colors).map(([name, value]) => {
          return [[`--color-${name}`], getRgbChannels(value)];
        })
      );
    };

    const getCSSSizeVariables = (sizes) => {
      return Object.fromEntries(
        Object.entries(sizes).map(([name, value]) => {
          return [[`--size-${name}`], value];
        })
      );
    };

    addBase({
      ":root": {
        ...getCSSColorVariables(defaultColors),
        ...getCSSSizeVariables(defaultSizes)
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

    sizes.forEach((size) => {
      const { sizes, name } = size;
      addBase({
        [`[data-size=${name}]`]: {
          ...getCSSSizeVariables(sizes)
        }
      });
    });

    // -----------------------------------------------------------------
    // BONUS: Add theme-specific variant for bespoke theming overrides
    // -----------------------------------------------------------------

    themes.forEach((theme) => {
      addVariant(`theme-${theme.name}`, `[data-theme=${theme.name}] &`);
    });

    sizes.forEach((size) => {
      addVariant(`size-${size.name}`, `[data-size=${size.name}] &`);
    });
  },

  // -----------------------------------------------------------------
  // Add semantic color names to Tailwind's color palette
  // -----------------------------------------------------------------

  {
    theme: {
      extend: {
        colors: {
          // All the colors for good measure, for unique use-cases.
          ...themes.reduce((acc, theme) => {
            return {
              ...acc,
              [`${theme.name}-base`]: theme.colors["bg-base"],
              [`${theme.name}-active`]: theme.colors["bg-active"],
              [`${theme.name}-inverted`]: theme.colors["bg-inverted"],
              [`${theme.name}-pure`]: theme.colors["bg-pure"],
              [`${theme.name}-text-base`]: theme.colors["text-base"],
              [`${theme.name}-text-active`]: theme.colors["text-active"],
              [`${theme.name}-text-inverted`]: theme.colors["text-inverted"],
              [`${theme.name}-border-base`]: theme.colors["border-base"],
              [`${theme.name}-border-active`]: theme.colors["border-active"],
              [`${theme.name}-border-inverted`]: theme.colors["border-inverted"]
            };
          }, {})
        },
        textColor: {
          theme: {
            base: "rgb(var(--color-text-base) / <alpha-value>)",
            inverted: "rgb(var(--color-text-inverted) / <alpha-value>)",
            active: "rgb(var(--color-text-active) / <alpha-value>)",
            muted: "rgb(var(--color-text-muted) / <alpha-value>)"
          }
        },
        backgroundColor: {
          theme: {
            pure: "rgb(var(--color-bg-pure) / <alpha-value>)",
            base: "rgb(var(--color-bg-base) / <alpha-value>)",
            inverted: "rgb(var(--color-bg-inverted) / <alpha-value>)",
            active: "rgb(var(--color-bg-active) / <alpha-value>)"
          }
        },
        borderColor: {
          theme: {
            base: "rgb(var(--color-border-base) / <alpha-value>)",
            inverted: "rgb(var(--color-border-inverted) / <alpha-value>)",
            active: "rgb(var(--color-border-active) / <alpha-value>)"
          }
        },
        padding: {
          "size-x": "var(--size-px)",
          "size-y": "var(--size-py)"
        },
        fontSize: {
          size: "var(--size-text)"
        },
        lineHeight: {
          size: "var(--size-line)"
        }
      }
    }
  }
);
