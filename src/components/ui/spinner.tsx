import React from 'react'
import { cn } from '@/lib/utils'

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'muted' | 'white'
  className?: string
}

const sizeMap: Record<NonNullable<SpinnerProps['size']>, string> = {
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10'
}

const colorMap: Record<NonNullable<SpinnerProps['color']>, string> = {
  primary: 'border-primary',
  muted: 'border-muted-foreground',
  white: 'border-white'
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'sm',
  color = 'primary',
  className = ''
}) => {
  return (
    <div
      className={cn(
        'rounded-full border-4 border-t-transparent animate-spin',
        sizeMap[size],
        colorMap[color],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  )
}

export default Spinner
