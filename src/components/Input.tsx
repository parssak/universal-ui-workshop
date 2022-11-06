// ! Don't implement until Button is 100% fleshed out.
import React from "react";
import { useConfig } from "../config/UniversalUIConfigContext";
import * as C from "../core";
import { useDarkMode } from "../hooks/useDarkMode";
import { Size, Theme, Variant } from "./types";

export interface InputProps {
  size?: Size;
  theme?: Theme;
  variant?: Variant;
  dark?: boolean;
}

const DEFAULT_INPUT_TAG = "input";

export const Input = C.forwardRefWithAs(function <
  TTag extends React.ElementType = typeof DEFAULT_INPUT_TAG
>(
  { size, theme, variant = "solid", dark, className, ...props }: C.Props<TTag> & InputProps,
  ref: React.Ref<TTag>
) {
  const [enabled] = useDarkMode();
  const config = useConfig()

  const classNames = C.useClassNames(() => {
    const base = "text-size leading-size rounded text-theme-active";
    const borderClass = config.borderClass;
    const sizeClass = "pl-size-x pr-size-x pt-size-y pb-size-y text-size leading-size";
    const variants: Record<Variant, string> = {
      solid: `
      bg-theme-active
      focus:bg-theme-base
      text-theme-base
      border-theme-base
      placeholder:text-theme-muted/50
    `,
      outline: `
      bg-transparent hover:bg-theme-active
      text-theme-base
      border-theme-base
      placeholder:text-theme-muted/50
    `,
      ghost: `
      bg-transparent hover:bg-theme-active
      text-theme-base hover:text-theme-active
      border-transparent
      placeholder:text-theme-muted/50
    `,
      inverted: `
      bg-theme-inverted hover:bg-theme-base
      text-theme-inverted hover:text-theme-active
      border-theme-inverted
      placeholder:text-theme-inverted/25
      `
    };
    return [base, borderClass, sizeClass, variants[variant], className];
  }, [variant, config, className]);

  return C.render({
    props: {
      ref,
      className: classNames,
      "data-size": size,
      "data-theme": theme !== undefined ? (enabled || dark ? `${theme}-dark` : theme) : undefined,
      ...props
    },
    defaultTag: DEFAULT_INPUT_TAG
  });
});
