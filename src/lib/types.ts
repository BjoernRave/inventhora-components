import { Color } from '@material-ui/lab'
import { Dispatch, SetStateAction } from 'react'
import { OperationResult } from 'urql'

export type Language = 'es' | 'en' | 'de' | 'pt'

export interface Option {
  value: any
  label: string
  helperText?: string
}

export type TopBannerMessages = 'trialEnd'

export type DateFormat = 'daytime' | 'day' | 'time'

export interface ResponseHandle {
  setNotification: SetStateAction<Dispatch<NotificationType>>
  response: OperationResult<any>
  success?: string
  error: string
  errors?: { message: string; trigger: string }[]
  t: any
}

export interface Amount {
  id: string
  amount: string
  baseAmount: number
  name: string
}

export interface NotificationType {
  message: string
  state: Color
  duration?: number
}
