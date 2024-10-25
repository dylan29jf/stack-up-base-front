import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { motion, MotionProps, useAnimate } from 'framer-motion'

import { cn } from '@core/utils'

const buttonVariants = cva(
  'group inline-flex items-center relative overflow-hidden justify-center whitespace-nowrap rounded-lg ring-offset-background transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        default:
          'bg-accent-300 hover:shadow-lg focus:bg-accent-400/90 disabled:bg-gray-300',
        secondary:
          'border border-primary-400 hover:shadow-md focus:bg-primary-400/10 disabled:bg-gray-50 disabled:border-gray-500',
        tertiary:
          'focus:border-primary-200 hover:shadow-md hover:bg-primary-400/10 disabled:bg-gray-50 disabled:border-gray-500',
        fill: 'bg-primary-400/10 hover:shadow-md hover:bg-primary-400/10 disabled:bg-gray-50 disabled:border-gray-500',
        'fill-gray':
          'focus:border-gray-200 hover:shadow-md hover:bg-gray-400/10 disabled:bg-gray-50 disabled:border-gray-500',
        'fill-white':
          'focus:border-gray-200 hover:shadow-md hover:bg-white/10 disabled:bg-gray-50 disabled:border-gray-500',
        menuResponsive:
          'bg-transparent hover:shadow-md hover:bg-primary-400/10 disabled:bg-gray-50 disabled:border-gray-500',
        flag: 'border border-gray-500 bg-white hover:border-primary-500 ',
        'danger-fill':
          'focus:border-danger-200 hover:shadow-md hover:bg-danger-50/50 disabled:bg-gray-50 disabled:border-gray-500',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-9 px-3',
        lg: 'h-12 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const textVariants = cva('font-semibold z-10', {
  variants: {
    variant: {
      default:
        'text-primary-800 group-disabled:text-gray-700 group-disabled:pointer-events-none',
      secondary:
        'text-primary-500 group-disabled:text-gray-700 group-disabled:pointer-events-none',
      tertiary:
        'text-primary-500 group-disabled:text-gray-700 group-disabled:pointer-events-none',
      fill: 'text-primary-500 group-disabled:text-gray-700 group-disabled:pointer-events-none',
      'fill-gray':
        'text-gray-800 group-disabled:text-gray-700 group-disabled:pointer-events-none',
      'fill-white':
        'text-gray-200 group-disabled:text-gray-700 group-disabled:pointer-events-none',
      menuResponsive:
        'text-white group-disabled:text-gray-700 group-disabled:pointer-events-none',
      flag: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      'danger-fill':
        'text-danger-500  group-disabled:text-gray-700 group-disabled:pointer-events-none',
    },
    size: {
      default: 'text-sm',
      sm: 'text-sm',
      lg: 'text-[14px]',
      icon: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

const variantExpanded = cva('', {
  variants: {
    variant: {
      default: 'bg-accent-50/50',
      secondary: 'bg-primary-100/50',
      tertiary: 'bg-primary-100/50',
      fill: 'bg-primary-100/50',
      'fill-gray': 'bg-gray-300/50',
      'fill-white': 'bg-gray-300/50',
      menuResponsive: 'bg-primary-100/50',
      flag: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      'danger-fill': 'bg-danger/50',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  startContent?: React.JSX.Element
  endContent?: React.JSX.Element
  disabledHoverAnimation?: boolean
}

type MergeButtonProps = ButtonProps & MotionProps

const Button = React.forwardRef<HTMLButtonElement, MergeButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      startContent,
      endContent,
      disabledHoverAnimation = false,
      ...props
    },
    ref,
  ) => {
    const [scope, animate] = useAnimate()

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        whileTap={{ scale: 0.95 }}
        whileHover={{
          y: disabledHoverAnimation ? 0 : -3,
        }}
        disabled={isLoading || props?.disabled}
        onTap={async () => {
          if (scope.current) {
            await animate(
              scope.current,
              {
                opacity: 1,
              },
              { duration: 0.001 },
            )
            await animate(
              scope.current,
              {
                width: '100%',
                height: '100px',
              },
              {
                duration: 0.4,
              },
            )
            await animate(
              scope.current,
              {
                opacity: 0,
              },
              { duration: 0.001 },
            )
            animate(scope.current, {
              width: '0px',
              height: '0px',
            })
          }
        }}
        ref={ref}
        {...props}>
        <motion.span
          className={cn(variantExpanded({ variant }), 'absolute rounded-full')}
          ref={scope}></motion.span>
        {isLoading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-loader-circle mr-2 h-4 w-4 animate-spin">
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        )}
        {!isLoading && startContent && (
          <span
            className={cn(
              textVariants({ variant }),
              'pr-0.5 flex items-center justify-center group-hover:-translate-x-0.5 transition-transform',
            )}>
            {startContent}
          </span>
        )}
        <span className={cn(textVariants({ variant }))}>{props.children}</span>
        {!isLoading && endContent && (
          <span
            className={cn(
              textVariants({ variant }),
              'pl-0.5 flex items-center justify-center group-hover:translate-x-0.5 transition-transform',
            )}>
            {endContent}
          </span>
        )}
      </motion.button>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
