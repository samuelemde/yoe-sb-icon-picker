import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'w-full justify-between rounded-lg border bg-background p-2.5 pl-[17px] text-sm font-normal tracking-wide hover:border-sb-green focus:border-sb-green focus:shadow-sb focus:outline-none focus:ring-0',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
