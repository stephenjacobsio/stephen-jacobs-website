"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from "lucide-react";

const alertVariants = cva(
  "relative flex items-center p-4 rounded-lg border",
  {
    variants: {
      variant: {
        info: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
        success: "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
        warning: "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800",
        error: "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
      },
      dismissible: {
        true: "pr-10",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  icon?: React.ReactNode;
  onDismiss?: () => void;
}

const iconMap = {
  info: <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />,
  success: <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />,
  error: <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />,
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "info",
      dismissible = false,
      title,
      icon,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    const defaultIcon = iconMap[variant as keyof typeof iconMap];

    return (
      <div
        ref={ref}
        className={alertVariants({ variant, dismissible, className })}
        role="alert"
        {...props}
      >
        {icon || defaultIcon ? (
          <div className="mr-3 flex-shrink-0">{icon || defaultIcon}</div>
        ) : null}
        <div className="flex-1">
          {title && (
            <h3 className="font-medium mb-1 text-sm">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && onDismiss && (
          <button
            type="button"
            className="absolute right-2 top-2 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert, alertVariants };
