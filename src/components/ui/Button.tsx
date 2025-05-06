"use client";

import React from "react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
        outline: "bg-transparent border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 dark:text-gray-200",
        ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200",
        link: "bg-transparent underline-offset-4 hover:underline text-cyan-600 dark:text-cyan-400 hover:bg-transparent",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  leftIconName?: string;
  rightIconName?: string;
  isLoading?: boolean;
  isExternal?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      href,
      leftIconName,
      rightIconName,
      isLoading,
      isExternal,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = href ? Link : "button";
    const linkProps = href
      ? {
          href,
          ...(isExternal && {
            target: "_blank",
            rel: "noopener noreferrer",
          }),
        }
      : {};

    // Dynamically get the icon components if icon names are provided
    const LeftIcon = leftIconName ? LucideIcons[leftIconName as keyof typeof LucideIcons] : null;
    const RightIcon = rightIconName ? LucideIcons[rightIconName as keyof typeof LucideIcons] : null;

    return (
      <Comp
        className={buttonVariants({ variant, size, fullWidth, className })}
        ref={ref as any}
        {...linkProps}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white" />
        ) : LeftIcon ? (
          <LeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        ) : null}
        {children}
        {RightIcon && !isLoading && (
          <RightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
