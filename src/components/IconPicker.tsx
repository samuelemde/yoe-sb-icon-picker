import { FC, useContext, useEffect } from 'react'
import { useFieldPlugin } from '@storyblok/field-plugin/react'
import { IconPickerOptions } from '@/types/icon'
import IconSelector from '@/components/IconSelector'
import Modal from '@/components/Modal'
import { loadIconsFromFont, loadIconsFromIcoMoonSelection } from '@/lib/utils'
import LoadingSpinner from '@/components/LoadingSpinner'
import { IconContext } from '@/provider/IconProvider'

const IconPicker: FC = () => {
  const { icons, setIcons, setIsFont, setDefaultSize } = useContext(IconContext)
  const plugin = useFieldPlugin()
  const options = plugin.data?.options as IconPickerOptions

  useEffect(() => {
    const loadIcons = async () => {
      if (!options) return
      if (options.icoMoonSelectionUrl) {
        const { icons, defaultSize } = await loadIconsFromIcoMoonSelection(
          options.icoMoonSelectionUrl,
        )
        setIcons(icons)
        setDefaultSize(defaultSize)
        setIsFont(false)
      } else if (options.fontUrl && options.iconNames) {
        const icons = await loadIconsFromFont(
          options.fontUrl,
          options.iconNames,
        )
        setIcons(icons)
        setIsFont(true)
      }
    }

    void loadIcons()
  }, [plugin.data?.options])

  if (plugin.type !== 'loaded' || !icons?.length) return <LoadingSpinner />

  if (!options.icoMoonSelectionUrl && !(options.fontUrl && options.iconNames)) {
    throw new Error('Either set icoMoonSelectionUrl or fontUrl')
  }

  return <>{!plugin.data?.isModalOpen ? <IconSelector /> : <Modal />}</>
}

export default IconPicker
