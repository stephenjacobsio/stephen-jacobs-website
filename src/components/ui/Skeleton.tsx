"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const skeletonVariants = cva(
  "animate-pulse bg-gray-200 dark:bg-gray-700 rounded",
  {
    variants: {
      variant: {
        default: "opacity-75",
        subtle: "opacity-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant,
      width,
      height,
      circle = false,
      ...props
    },
    ref
  ) => {
    const styleProps: React.CSSProperties = {};
    
    if (width) {
      styleProps.width = typeof width === "number" ? `${width}px` : width;
    }
    
    if (height) {
      styleProps.height = typeof height === "number" ? `${height}px` : height;
    }
    
    if (circle) {
      styleProps.borderRadius = "9999px";
    }

    return (
      <div
        ref={ref}
        className={skeletonVariants({ variant, className })}
        style={styleProps}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

// Predefined skeleton components for common use cases
const SkeletonText = ({ lines = 3, className = "", ...props }: { lines?: number } & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className="h-4" 
          width={i === lines - 1 && lines > 1 ? "70%" : "100%"} 
        />
      ))}
    </div>
  );
};

const SkeletonCard = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div 
      className={`rounded-lg border border-gray-200 dark:border-gray-700 p-4 ${className}`}
      {...props}
    >
      <Skeleton className="h-32 mb-4" />
      <Skeleton className="h-4 mb-2" />
      <Skeleton className="h-4 mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
};

const SkeletonAvatar = ({ size = 40, className = "", ...props }: { size?: number } & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Skeleton 
      circle 
      width={size} 
      height={size} 
      className={className}
      {...props}
    />
  );
};

export { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar };
