import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'btn-sweep btn-sweep-default shadow-xs hover:shadow-md',
        destructive: 'btn-sweep btn-sweep-destructive shadow-xs hover:shadow-md',
        outline: 'btn-sweep btn-sweep-outline shadow-xs hover:shadow-md',
        secondary: 'btn-sweep btn-sweep-secondary shadow-xs hover:shadow-md',
        ghost: 'rounded-full hover:bg-accent hover:text-accent-foreground active:scale-[0.98]',
        link: 'text-primary underline-offset-4 hover:underline hover:opacity-80',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 px-4 text-xs font-semibold',
        lg: 'h-11 px-8 text-base font-semibold',
        icon: 'size-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size, asChild = false, children, ...props }, ref) => {
    const isSweep = !variant || ['default', 'outline', 'secondary', 'destructive'].includes(variant);

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {isSweep ? (
            React.cloneElement(
              child,
              undefined,
              <span className="relative z-10 inline-flex items-center justify-center gap-2">
                {child.props.children}
              </span>
            )
          ) : (
            children
          )}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isSweep ? (
          <span className="relative z-10 inline-flex items-center justify-center gap-2">
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
