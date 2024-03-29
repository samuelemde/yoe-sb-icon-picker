import { FC } from 'react'
import { useFieldPlugin } from '@storyblok/field-plugin/react'
import IconPicker from '@/components/IconPicker/IconPicker'
import LoadingSpinner from '@/components/LoadingSpinner'
import { X } from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'
import IconContextProvider from '@/provider/IconProvider'

type FallbackProps = {
  error: Error
}
const fallbackRenderer: FC<FallbackProps> = ({ error }) => {
  return (
    <div className="flex items-center gap-4 rounded-md bg-sb-red-25 p-2.5 pl-[17px]">
      <X className="rounded-md bg-sb-red p-1 text-white" />
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
