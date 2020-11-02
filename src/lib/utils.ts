import { useEffect, useState } from 'react'
import { ResponseHandle } from './types'

export const isServer = typeof window === 'undefined'

export const useScrollPosition = () => {
  const [topDistance, setTopDistance] = useState(0)

  const setTopDistanceEvent = () => {
    setTopDistance(window.pageYOffset)
  }

  useEffect(() => {
    document.addEventListener('scroll', setTopDistanceEvent)
    return () => {
      document.removeEventListener('scroll', setTopDistanceEvent)
    }
  }, [])

  return topDistance
}
export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const useIsMobile = (
  initialWidth = Infinity,
  initialHeight = Infinity
) => {
  const [state, setState] = useState<{ width: number; height: number }>({
    width: !isServer ? window.innerWidth : initialWidth,
    height: !isServer ? window.innerHeight : initialHeight,
  })

  useEffect((): (() => void) | void => {
    if (!isServer) {
      const handler = () => {
        setState({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      window.addEventListener('resize', handler)

      return () => {
        window.removeEventListener('resize', handler)
      }
    }
  }, [])

  return state.width < 767
}

export const handleResponse = ({
  setNotification,
  error,
  errors = [],
  response,
  success,
  t,
}: ResponseHandle) => {
  if (response.error) {
    let result = { state: 'error', message: error }

    errors.push(
      { message: t('common:duplicateDataError'), trigger: 'already exists' },
      {
        message: t('common:duplicateDataError'),
        trigger: 'Unique constraint failed',
      },
      {
        message: t('common:inUseError'),
        trigger: 'violate the required relation',
      },
      {
        message: t('common:notAuthorizedError'),
        trigger: 'Not Authorised',
      }
    )

    errors.forEach(({ message, trigger, callback }) => {
      if (response?.error?.message.indexOf(trigger) !== -1) {
        result = { state: 'error', message }
        if (callback) {
          callback()
        }
      }
    })
    setNotification(result as any)
    return false
  } else if (success) {
    setNotification({ state: 'success', message: success } as any)
    return true
  } else {
    return true
  }
}
