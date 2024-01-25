import { FC, useContext, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { PopoverClose } from '@radix-ui/react-popover'
import { cn } from '@/lib/utils'
import SVGIcon from './SVGIcon'
import { IconContext } from '@/provider/IconProvider'
import { useFieldPlugin } from '@storyblok/field-plugin/react'

const IconSelector: FC = () => {
  const { actions } = useFieldPlugin()
  const [open, setOpen] = useState(false)
  const { icons, setIcons, isFont, value, setValue } = useContext(IconContext)

  return (
    <div className={cn({ 'h-[400px]': open })}>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant="sb"
            role="combobox"
            aria-expanded={open}
            size="sb"
          >
            {value ? (
              <div className="flex items-center gap-4">
                {isFont ? (
                  <div style={{ fontFamily: 'IconFont' }}>
                    {icons.find((icon) => icon.value === value)?.value}
                  </div>
                ) : (
                  <SVGIcon
                    icon={icons.find((icon) => icon.value === value)!}
                    size={20}
                  />
                )}
                {icons.find((icon) => icon.value === value)?.name}
              </div>
            ) : (
              <div className="text-muted-foreground">Select an Icon...</div>
            )}
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-screen p-0">
          <Command>
            <CommandInput placeholder="Search" />
            <CommandList>
              <CommandEmpty>No Icons found.</CommandEmpty>
              <div className="w-full p-2">
                <PopoverClose
                  className="flex w-full cursor-pointer items-center justify-center rounded-sm bg-primary px-3 py-1.5 text-center text-sm font-bold text-white outline-none hover:bg-primary-hover"
                  onClick={() => actions?.setModalOpen(true)}
                >
                  See All
                </PopoverClose>
              </div>
              <CommandSeparator />
              <CommandGroup className="p-0">
                {icons.map((icon) => (
                  <CommandItem
                    key={icon.value}
                    value={icon.name}
                    onSelect={() => {
                      setValue(icon.value === value ? '' : icon.value)
                      actions?.setContent(icon.value)
                      setOpen(false)
                    }}
                  >
                    <div
                      className={cn('flex items-center gap-4 p-1', {
                        'text-sb-green': value === icon.value,
                      })}
                    >
                      {isFont ? (
                        <div style={{ fontFamily: 'IconFont' }}>
                          {icon.value}
                        </div>
                      ) : (
                        <SVGIcon
                          icon={icon}
                          size={20}
                        />
                      )}
                      {icon.value}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default IconSelector
