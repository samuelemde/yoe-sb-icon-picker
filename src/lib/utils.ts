import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Icon, IconPickerOptions, IconSelection } from '@/types/icon'
import { parse } from 'opentype.js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const loadIconsFromIcoMoonSelection = async (url: string) => {
  const response = await fetch(url)
  const iconSelection = (await response.json()) as IconSelection

  const icons = iconSelection.icons
    .map((icon) => ({
      name: icon.properties.name
        .split('_')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' '),
      value: icon.properties.name,
      width: icon.icon.width,
      path: icon.icon.paths[0],
      ligatures: icon.properties.ligatures.split(','),
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  const defaultSize = {
    width: iconSelection.height ?? 1024,
    height: iconSelection.height ?? 1024,
  }

  return { icons, defaultSize }
}

const loadFont = async (fontUrl: string) => {
  const fontFace = new FontFace('IconFont', `url(${fontUrl})`, {
    weight: 'normal',
    style: 'normal',
    display: 'block',
    featureSettings: "'liga'",
  })
  const font = await fontFace.load()
  document.fonts.add(font)
}

const applyFont = (fontUrl: string) => {
  const style = `@font-face {
        font-family: Icons;
        src: url('${fontUrl}');
        font-weight: normal;
        font-style: normal;
        font-display: block;
        font-feature-settings: 'liga';
      }`

  const styleSheet = document.createElement('style')
  styleSheet.innerText = style
  document.head.appendChild(styleSheet)
}

export const loadIconsFromFont = async (fontUrl: string, iconNames: string) => {
  await loadFont(fontUrl)
  return iconNames
    .split(',')
    .map((character) => ({
      name: character
        .split('_')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' '),
      value: character,
      path: '',
      ligatures: [character],
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}
