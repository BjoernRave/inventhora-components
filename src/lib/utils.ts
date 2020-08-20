import { format, isDate, parse } from 'date-fns'
import { IncomingMessage } from 'http'
import { NextPageContext } from 'next'
import { useEffect, useState } from 'react'
import { UAParser } from 'ua-parser-js'
import { DateFormat, ResponseHandle, TopBannerMessages } from './types'

export const isServer = typeof window === 'undefined'

export const isDev = process.env.NODE_ENV === 'development'

export const dateTimeFormat = 'dd.MM.yyyy - HH:mm'

export const timeFormat = 'HH:mm'

export const dateFormat = 'dd.MM.yyyy'

export const getDateTimeFormat = (dateString: DateFormat) => {
  switch (dateString) {
    case 'daytime':
      return dateTimeFormat

    case 'day':
      return dateFormat

    case 'time':
      return timeFormat
  }
}

export const uniquifyArray = (a: any[] | undefined) => {
  if (!a || !Array.isArray(a)) return []
  const seen = {}
  return a.filter((item) => {
    if (!item) return false
    return (seen as any).hasOwnProperty(item) ? false : (seen[item] = true)
  })
}

export const uniquifyObjectArray = (a: any[] | undefined, id: string) => {
  if (!a || !Array.isArray(a)) return []
  const seen = {}
  return a.filter((item) => {
    if (!item) return false
    if (!item[id]) return false
    return (seen as any).hasOwnProperty(item[id])
      ? false
      : (seen[item[id]] = true)
  })
}

export const capitalizeString = (string: string) => {
  return string[0].toUpperCase() + string.slice(1, string.length)
}

export const isValidDate = (d: any) => {
  return d instanceof Date && !isNaN(d as any)
}

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

export const getErrorMessage = (error: any): string => {
  if (typeof error === 'object') {
    return getErrorMessage(error[Object.keys(error)[0]])
  }

  return error
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

    errors.forEach(({ message, trigger }) => {
      if (response?.error?.message.indexOf(trigger) !== -1) {
        result = { state: 'error', message }
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

export const cleanObject = <T>(object: T): T => {
  const newObject = {} as any

  Object.keys(object).map((entry) => {
    if (
      object[entry] !== 'N/A' &&
      (typeof object[entry] === 'boolean' || Boolean(object[entry]))
    ) {
      newObject[entry] = object[entry]
    }
  })
  return newObject
}

export const removeFromArray = (items: string[], array: string[]) => {
  const newArray = Array.from(array)
  items.forEach((item) => {
    newArray.splice(
      newArray.findIndex((val) => val === item),
      1
    )
  })
  return newArray
}

export const isMobile = (ctx: NextPageContext) => {
  const uaParser = new UAParser(
    ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent
  )

  const device = uaParser.getDevice().type

  return device === 'mobile' || device === 'tablet'
}

export const getBannerMessage = (settings: Partial<any>): TopBannerMessages => {
  const trialDate = new Date()
  trialDate.setDate(trialDate.getDate() + 5)

  if (settings?.type === 'trial' && new Date(settings?.dueDate) < trialDate) {
    return 'trialEnd'
  }
  return null
}

export const generateRandomString = (length: number) => {
  let result = ''
  const specials = '!@#$%^&*'
  const numbers = '0123456789'
  const smallChars = 'abcdefghijklmnopqrstuvwxyz'
  const bigChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < length / 4; i++) {
    result += specials.charAt(Math.floor(Math.random() * specials.length))
    result += numbers.charAt(Math.floor(Math.random() * numbers.length))
    result += smallChars.charAt(Math.floor(Math.random() * smallChars.length))
    result += bigChars.charAt(Math.floor(Math.random() * bigChars.length))
  }
  return result
}

export const getLanguages = (t: any) => {
  return [
    { value: 'es', label: t('common:spanish') },
    { value: 'en', label: t('common:english') },
    { value: 'pt', label: t('common:portuguese') },
    { value: 'de', label: t('common:german') },
  ]
}

export const formatDate = (
  date: string | number | Date,
  dateString: DateFormat,
  timezone?: string
) => {
  if (!date || date === 'N/A') return date

  const actualDate = isDate(date) ? (date as Date) : new Date(date)

  return format(actualDate, getDateTimeFormat(dateString))
}

export const parseDate = (date: string, dateString: DateFormat) => {
  return parse(date, getDateTimeFormat(dateString), new Date())
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

export const roundTo = (
  number: number,
  decimals: number,
  asNumber?: boolean
) => {
  const x = Math.pow(10, Number(decimals) + 1)
  if (asNumber) return Number((Number(number) + 1 / x).toFixed(decimals))
  return (Number(number) + 1 / x).toFixed(decimals)
}

export const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/\./g, '-')
    .replace(/\(|\)|\/|\\|\[|\]|\{|\}|\|/g, '')
}

export const getSubdomain = (req: IncomingMessage) => {
  if (process.env.BASE_URL === 'https://testing.inventhora.com') {
    return 'testing'
  }
  if (
    req.headers.host.indexOf('localhost') === 0 &&
    req.headers.host.indexOf('inventhora') === -1
  ) {
    return 'dev'
  } else {
    return req.headers.host.split('.')[0]
  }
}

export const parseNumber = (number: string | number) => {
  if (typeof number === 'number') return number
  return Number(number.replace(',', '.'))
}

export const removeFromObjectArray = (
  array: object[],
  key: string,
  value: any
): any[] => {
  const newArray = Array.from(array)

  newArray.splice(
    newArray.findIndex((item) => item[key] === value),
    1
  )

  return newArray
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

export const getObjectKeyByString = (o: any, s: string) => {
  s = s.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  s = s.replace(/^\./, '') // strip a leading dot
  const a = s.split('.')
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i]
    if (!Boolean(o)) return null
    if (k in o) {
      o = o[k]
    } else {
      return
    }
  }
  return o
}
