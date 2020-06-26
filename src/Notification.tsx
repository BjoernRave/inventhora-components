import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
} from 'react'
import { NotificationType, TopBannerMessages } from './lib/types'

const initialState: {
  notification: NotificationType
  setNotification: Dispatch<SetStateAction<NotificationType>>
  showBanner: TopBannerMessages
  setShowBanner: Dispatch<SetStateAction<TopBannerMessages>>
  showChat: boolean
  setShowChat: Dispatch<SetStateAction<boolean>>
} = {
  notification: null,
  setNotification: null,
  showBanner: null,
  setShowBanner: null,
  showChat: false,
  setShowChat: null,
}

export const NotificationContext = createContext(initialState)

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = NotificationContext.Provider

const Notification: FC<Props> = () => {
  const { notification, setNotification } = useNotification()

  useEffect(() => {
    if (Boolean(notification?.message) && notification?.duration !== -1) {
      setTimeout(() => setNotification(null), notification?.duration ?? 3000)
    }
  }, [Boolean(notification?.message)])
  if (!notification) return null

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={Boolean(notification?.message)}>
      <Alert variant='filled' severity={notification?.state}>
        {notification?.message}
      </Alert>
    </Snackbar>
  )
}

export default Notification

interface Props {}
