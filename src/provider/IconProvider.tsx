import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'
import { Icon } from '@/types/icon'

type IconContextType = {
  icons: Icon[]
  isFont: boolean
  defaultSize?: { width: number; height: number }
  value: string | null
  setIcons: Dispatch<SetStateAction<Icon[]>>
  setIsFont: Dispatch<SetStateAction<boolean>>
  setDefaultSize: Dispatch<
    SetStateAction<{ width: number; height: number } | undefined>
  >
  setValue: Dispatch<SetStateAction<string | null>>
}

export const IconContext = createContext<IconContextType>({
  icons: [],
  isFont: false,
  value: '',
  setIcons: () => {
    throw new Error('setIcons function must be overridden by provider')
  },
  setIsFont: () => {
    throw new Error('setIsFont function must be overridden by provider')
  },
  setValue: () => {
    throw new Error('setValue function must be overridden by provider')
  },
  setDefaultSize: () => {
    throw new Error('setDefaultSize function must be overridden by provider')
  },
})

const IconContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [icons, setIcons] = useState<Icon[]>([])
  const [isFont, setIsFont] = useState<boolean>(false)
  const [defaultSize, setDefaultSize] = useState<{
    width: number
    height: number
  }>()
  const [value, setValue] = useState<string | null>(null)

  const props = {
    icons,
    isFont,
    defaultSize,
    value,
    setIcons,
    setIsFont,
    setDefaultSize,
    setValue,
  }

  return <IconContext.Provider value={props}>{children}</IconContext.Provider>
}

export default IconContextProvider
