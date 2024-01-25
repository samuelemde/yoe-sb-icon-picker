import { FC } from 'react'
import { useFieldPlugin } from '@storyblok/field-plugin/react'
import IconPicker from '@/components/IconPicker'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Cross1Icon } from '@radix-ui/react-icons'
import { ErrorBoundary } from 'react-error-boundary'
import IconContextProvider from '@/provider/IconProvider'

type FallbackProps = {
  error: Error
}
const fallbackRenderer: FC<FallbackProps> = ({ error }) => {
  return (
    <div className="bg-sb-red-25 flex items-center gap-4 rounded-md p-2.5 pl-[17px]">
      <Cross1Icon className="bg-sb-red rounded-md p-1 text-white" />
      {error.message}
    </div>
  )
}

const FieldPlugin: FC = () => {
  const { type, error } = useFieldPlugin()

  if (type === 'loading') return <LoadingSpinner size={40} />

  if (type === 'error') {
    return fallbackRenderer({ error })
  }

  return (
    <ErrorBoundary fallbackRender={fallbackRenderer}>
      <IconContextProvider>
        <IconPicker />
      </IconContextProvider>
    </ErrorBoundary>
  )
}

export default FieldPlugin
