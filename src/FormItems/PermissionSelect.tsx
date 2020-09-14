import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@material-ui/core'
import { useField } from 'formik'
import { removeFromArray } from 'inventhora-utils'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import styled from 'styled-components'

const PermissionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledDivider = styled(Divider)`
  align-self: normal;
`

const StyledLabel = styled(FormLabel)`
  && {
    color: ${({ theme }) => theme.palette.text.primary};
    font-size: 24px;
    font-weight: bolder;
  }

  .Mui-disabled {
    color: ${({ theme }) => theme.palette.text.disabled};
  }

  .Mui-focused {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`

const PermissionSelect: FC<Props> = ({ permissions, name }) => {
  const { t } = useTranslation()
  const [field, meta, helper] = useField(name)

  const sortedPermissions = permissions?.reduce((prev, next) => {
    const splitted = next.name.split(':')

    return {
      ...prev,
      [splitted[1]]: prev[splitted[1]]
        ? [...prev[splitted[1]], splitted[0]]
        : [splitted[0]],
    }
  }, {})

  const handleSelect = (permission: string) => {
    if (!meta.value.includes(permission)) {
      const splitted = permission.split(':')
      if (
        splitted[0] !== 'read' &&
        !meta.value.includes(`read:${splitted[1]}`)
      ) {
        helper.setValue([...meta.value, `read:${splitted[1]}`, permission])
      } else {
        helper.setValue([...meta.value, permission])
      }
    } else {
      helper.setValue(removeFromArray([permission], meta.value))
    }
  }

  const handleSelectAll = (values: any[], group: string) => {
    if (values.every((val) => meta.value.includes(`${val}:${group}`))) {
      helper.setValue(
        removeFromArray(
          values.map((val) => `${val}:${group}`),
          meta.value
        )
      )
    } else {
      const missingValues = values
        .filter((val) => !meta.value.includes(`${val}:${group}`))
        .map((val) => `${val}:${group}`)
      helper.setValue([...meta.value, ...missingValues])
    }
  }

  const strings = [
    t('forms:create'),
    t('forms:read'),
    t('forms:update'),
    t('forms:import'),
    t('forms:export'),
    t('forms:delete'),
  ]

  return (
    <PermissionsWrapper>
      {Object.keys(sortedPermissions).map((pName) => (
        <div key={pName} style={{ width: '100%' }}>
          <FormControl style={{ margin: '20px 40px' }}>
            <LabelWrapper>
              <StyledLabel> {t(`common:${pName}`)}</StyledLabel>
              <FormControlLabel
                style={{ marginLeft: '10px' }}
                label={
                  sortedPermissions[pName].every((val) =>
                    meta.value.includes(val.value)
                  )
                    ? t('forms:unselectAll')
                    : t('forms:selectAll')
                }
                control={
                  <Checkbox
                    onChange={() =>
                      handleSelectAll(sortedPermissions[pName], pName)
                    }
                    checked={sortedPermissions[pName].every((val) =>
                      meta.value.includes(`${val}:${pName}`)
                    )}
                  />
                }
              />
            </LabelWrapper>
            <FormGroup>
              {sortedPermissions[pName].map((permission) => (
                <FormControlLabel
                  key={`${permission}:${pName}`}
                  label={t(`forms:${permission}`)}
                  control={
                    <Checkbox
                      onChange={() => handleSelect(`${permission}:${pName}`)}
                      checked={meta.value.includes(`${permission}:${pName}`)}
                    />
                  }
                />
              ))}
            </FormGroup>
          </FormControl>
          <StyledDivider />
        </div>
      ))}
    </PermissionsWrapper>
  )
}

export default PermissionSelect

export interface Props {
  permissions: any[]
  name: string
}
