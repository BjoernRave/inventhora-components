import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import React, { FC } from 'react'

const BooleanIcon: FC<Props> = ({ value }) => {
  return value ? <CheckIcon /> : <CloseIcon />
}

export default BooleanIcon

interface Props {
  value: boolean
}
