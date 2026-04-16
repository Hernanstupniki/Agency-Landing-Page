import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "button-fx inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[0_3px_0_rgba(15,23,42,0.08),0_18px_28px_-14px_rgba(15,23,42,0.32)] hover:bg-primary/80 hover:text-primary-foreground hover:shadow-[0_4px_0_rgba(15,23,42,0.08),0_26px_38px_-16px_rgba(15,23,42,0.38)] dark:shadow-[0_3px_0_rgba(255,255,255,0.04),0_20px_34px_-16px_rgba(2,8,23,0.52)] dark:hover:shadow-[0_4px_0_rgba(255,255,255,0.05),0_28px_42px_-18px_rgba(2,8,23,0.6)]',
        destructive:
          'bg-destructive text-white shadow-[0_3px_0_rgba(127,29,29,0.08),0_18px_28px_-14px_rgba(127,29,29,0.34)] hover:bg-destructive/90 hover:shadow-[0_4px_0_rgba(127,29,29,0.08),0_26px_38px_-16px_rgba(127,29,29,0.4)] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-[0_2px_0_rgba(148,163,184,0.1),0_16px_26px_-16px_rgba(148,163,184,0.34)] hover:border-foreground/35 hover:bg-foreground hover:text-background hover:shadow-[0_3px_0_rgba(148,163,184,0.1),0_24px_34px_-18px_rgba(148,163,184,0.4)] dark:bg-input/30 dark:border-input dark:shadow-[0_2px_0_rgba(255,255,255,0.04),0_18px_30px_-16px_rgba(2,8,23,0.46)] dark:hover:border-foreground/35 dark:hover:bg-foreground dark:hover:text-background dark:hover:shadow-[0_3px_0_rgba(255,255,255,0.05),0_26px_38px_-18px_rgba(2,8,23,0.56)]',
        secondary:
          'bg-secondary text-secondary-foreground shadow-[0_2px_0_rgba(148,163,184,0.08),0_16px_26px_-16px_rgba(148,163,184,0.3)] hover:bg-secondary/70 hover:shadow-[0_3px_0_rgba(148,163,184,0.08),0_24px_34px_-18px_rgba(148,163,184,0.36)]',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
