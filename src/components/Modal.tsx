import { Button } from '@/components/ui/button'
import { Cross1Icon } from '@radix-ui/react-icons'
import { FC, useContext, useState } from 'react'
import { FieldPluginResponse } from '@storyblok/field-plugin'
import SearchBar from '@/components/SearchBar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Icon } from '@/types/icon'
import SVGIcon from '@/components/SVGIcon'
import { useFieldPlugin } from '@storyblok/field-plugin/react'
import { IconContext } from '@/provider/IconProvider'

const Modal: FC = () => {
  const { actions } = useFieldPlugin()
  const { icons, isFont, value, setValue } = useContext(IconContext)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredIcons = icons.filter((icon) =>
    icon.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="bg-background p-10">
      <SearchBar
        className="mb-4"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        variant="ghost"
        type="button"
        className="fixed right-0 top-0 z-50"
        onClick={() => actions?.setModalOpen(false)}
      >
        <Cross1Icon />
        <span className="sr-only">Close Modal</span>
      </Button>
      <div className="lg:grid-cols-16 grid w-full grid-cols-6 gap-4 text-xl sm:grid-cols-10 md:grid-cols-12">
        <TooltipProvider delayDuration={50}>
          {filteredIcons.map((icon) => (
            <Tooltip key={icon.value}>
              <TooltipTrigger as-child>
                <AspectRatio ratio={1}>
                  <Button
                    variant="outline"
                    className="flex h-full w-full items-center justify-center p-0 text-center shadow hover:border-sb-green hover:bg-background"
                    onClick={() => {
                      setValue(icon.value === value ? '' : icon.value)
                      actions?.setContent(icon.value)
                      actions?.setModalOpen(false)
                    }}
                  >
                    {isFont ? (
                      <div
                        style={{ fontFamily: 'IconFont' }}
                        className="sm text-lg antialiased sm:text-2xl md:text-3xl"
                      >
                        {icon.value}
                      </div>
                    ) : (
                      <div className="flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7">
                        <SVGIcon icon={icon} />
                      </div>
                    )}
                  </Button>
                </AspectRatio>
              </TooltipTrigger>
              <TooltipContent side="bottom">{icon.value}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  )
}

export default Modal
