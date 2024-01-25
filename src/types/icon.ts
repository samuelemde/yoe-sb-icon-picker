export type IcoMoonIcon = {
  icon: { paths: string[]; width?: number }
  properties: {
    name: string
    ligatures: string
  }
}

export type IconSelection = {
  IcoMoonType: 'selection'
  icons: IcoMoonIcon[]
  height: number
}

export type Icon = {
  name: string
  value: string
  path?: string
  width?: number
  ligatures?: string[]
}

export type IconPickerOptions = {
  icoMoonSelectionUrl?: string
  fontUrl?: string
  iconNames?: string
}

export type IconPickerMode = 'svg' | 'font'
