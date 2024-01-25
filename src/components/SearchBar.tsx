import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { FC, InputHTMLAttributes } from 'react'

const SearchBar: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn('relative w-full', className)}>
      <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
      <Input
        type="text"
        placeholder="Search"
        className="pl-8 pr-4"
        {...props}
      />
    </div>
  )
}
export default SearchBar
