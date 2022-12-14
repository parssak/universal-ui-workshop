import React from "react";
import { useConfig } from "../config/UniversalUIConfigContext";
import * as C from "../core";
import { useDarkMode } from "../hooks/useDarkMode";
import { Size, Theme, Variant } from "./types";

export interface ButtonProps {
  size?: Size;
  theme?: Theme;
  variant?: Variant;
  dark?: boolean;
}

const DEFAULT_BUTTON_TAG = "button";

export const Button = C.forwardRefWithAs(function <
  TTag extends React.ElementType = typeof DEFAULT_BUTTON_TAG
>(props: C.Props<TTag> & ButtonProps, ref: React.Ref<TTag>) {
  const { size, theme, variant = "solid", dark, className, ...rest } = props;
  const [enabled] = useDarkMode();
  const config = useConfig();

  const classNames = C.useClassNames(() => {
    const base = "font-medium tracking-tight rounded transition duration-75";
    const borderClass = config.borderClass;
    const sizeClass = "pl-size-x pr-size-x pt-size-y pb-size-y text-size leading-size";
    const variants: Record<Variant, string> = {
      solid: `
      bg-theme-base hover:bg-theme-active
      text-theme-base
      border-theme-base
    `,
      outline: `
      bg-transparent hover:bg-theme-active
      text-theme-base
      border-theme-base
    `,
      ghost: `
      bg-transparent hover:bg-theme-active
      text-theme-base hover:text-theme-active
      border-transparent
    `,
      inverted: `
      bg-theme-inverted hover:bg-theme-base
      text-theme-inverted hover:text-theme-active
      border-theme-inverted
      `
    };

    const configClasses = config.components?.button;

    let buttonClasses = !configClasses
      ? ""
      : typeof configClasses === "string"
      ? configClasses
      : configClasses(props);

    return [base, borderClass, sizeClass, variants[variant], buttonClasses, className];
  }, [props]);

  return C.render({
    props: {
      ref,
      className: classNames,
      "data-size": size,
      "data-theme": theme !== undefined ? (enabled || dark ? `${theme}-dark` : theme) : undefined,
      ...rest
    },
    defaultTag: DEFAULT_BUTTON_TAG
  });
});
