import React from "react";
import * as C from "../core";
import { useDarkMode } from "../hooks/useDarkMode";

export interface ButtonProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  theme?: "neutral" | "brand" | "error" | "success" | "warning" | "info";
  dark?: boolean;
  variant?: "solid" | "outline" | "ghost" | "inverted";
}

const DEFAULT_BUTTON_TAG = "button";

export const Button = C.forwardRefWithAs(function <
  TTag extends React.ElementType = typeof DEFAULT_BUTTON_TAG
>(
  { size, theme, variant = "solid", dark, className, ...props }: C.Props<TTag> & ButtonProps,
  ref: React.Ref<TTag>
) {
  const [enabled] = useDarkMode();

  const classNames = C.useClassNames(() => {
    const base = "font-medium tracking-tight rounded transition duration-75";
    const sizeClass = "pl-size-x pr-size-x pt-size-y pb-size-y text-size leading-size";
    const variants = {
      solid: `
      bg-theme-base hover:bg-theme-active
      text-theme-base
      border border-theme-base
    `,
      outline: `
      bg-transparent hover:bg-theme-active
      text-theme-base
      border border-theme-base
    `,
      ghost: `
      bg-transparent hover:bg-theme-active
      text-theme-base hover:text-theme-active
      border border-transparent
    `,
      inverted: `
      bg-theme-inverted hover:bg-theme-base
      text-theme-inverted hover:text-theme-active
      border border-theme-inverted
      `
    };
    return [base, sizeClass, variants[variant], className];
  }, [variant, className]);

  return C.render({
    props: {
      ref,
      className: classNames,
      "data-size": size,
      "data-theme": theme !== undefined ? (enabled || dark ? `${theme}-dark` : theme) : undefined,
      ...props
    },
    defaultTag: DEFAULT_BUTTON_TAG
  });
});
