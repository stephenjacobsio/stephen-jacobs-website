"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const progressBarVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 rounded-full transition-all",
  {
    variants: {
      variant: {
        default: "bg-cyan-600 dark:bg-cyan-500",
        success: "bg-green-600 dark:bg-green-500",
        warning: "bg-yellow-600 dark:bg-yellow-500",
        error: "bg-red-600 dark:bg-red-500",
      },
      animated: {
        true: "transition-all duration-500 ease-in-out",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      animated: true,
    },
  }
);

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariants> {
  value: number;
  max?: number;
  variant?: VariantProps<typeof progressIndicatorVariants>["variant"];
  animated?: boolean;
  showValue?: boolean;
  valuePosition?: "top" | "right";
  label?: string;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value,
      max = 100,
      size,
      variant = "default",
      animated = true,
      showValue = false,
      valuePosition = "top",
      label,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div className="w-full" {...props}>
        {(label || (showValue && valuePosition === "top")) && (
          <div className="flex justify-between mb-1">
            {label && (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </span>
            )}
            {showValue && valuePosition === "top" && (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {value}%
              </span>
            )}
          </div>
        )}
        <div className="flex items-center gap-3">
          <div
            ref={ref}
            className={progressBarVariants({ size, className })}
          >
            <div
              className={progressIndicatorVariants({
                variant,
                animated,
              })}
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={value}
              aria-valuemin={0}
              aria-valuemax={max}
            />
          </div>
          {showValue && valuePosition === "right" && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[40px]">
              {value}%
            </span>
          )}
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
