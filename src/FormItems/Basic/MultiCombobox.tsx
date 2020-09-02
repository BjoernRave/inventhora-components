import React, { FC } from "react"
import styled from 'styled-components'


const MultiCombobox: FC<Props> = ({  }) => {
  const formName =
    typeof index === 'number' && subName ? `${name}[${index}].${subName}` : name
  const [, meta, helper] = useField(formName)
  const isLoading = !disabled && (loading || !Array.isArray(options))
  return (
    <AutoComple
        multiple
        id="tags-standard"
        options={top100Films}
        getOptionLabel={(option) => option.title}
        defaultValue={[top100Films[13]]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
      />
  )
}

export default MultiCombobox

interface Props {

}