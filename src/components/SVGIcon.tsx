import { FC, useContext } from 'react'
import { Icon } from '@/types/icon'
import { IconContext } from '@/provider/IconProvider'

type IconProps = {
  icon: Icon
  size?: string | number
}
const SVGIcon: FC<IconProps> = ({ icon, size = '100%' }) => {
  const { defaultSize } = useContext(IconContext)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio={'xMidYMid meet'}
      width={size}
      height={size}
      viewBox={`0 0 ${icon.width ?? defaultSize?.width ?? 1024} ${defaultSize?.height ?? 1024}`}
    >
      <path d={icon.path!} />
    </svg>
  )
}

export default SVGIcon
