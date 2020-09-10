import { IconButton, Tooltip } from '@material-ui/core'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'

const DarkmodeSwitch: FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation()

  return (
    <Tooltip title={t('common:toggleDarkMode')}>
      <IconButton onClick={() => onChange(value)}>
        {value ? <Brightness4Icon /> : <BrightnessHighIcon />}
      </IconButton>
    </Tooltip>
  )
}

export default DarkmodeSwitch

interface Props {
  value: boolean
  onChange: (value: boolean) => void
}
