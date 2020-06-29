import { FormGroup, FormLabel } from '@material-ui/core'
import { useField } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { isServer } from '../lib/utils'

const EditorWrapper = styled(FormGroup)`
  width: 100%;
  div > {
    width: 100%;
  }

  .te-toolbar-section {
    border-color: rgba(0, 0, 0, 0.23);
    width: calc(100% + 8px);
    margin-left: -4px;
  }

  .tui-editor-defaultUI {
    border-color: rgba(0, 0, 0, 0.23);
    border-radius: 4px;
    padding: 5px;

    :hover {
      border-color: rgba(0, 0, 0, 0.87);

      .te-toolbar-section {
        border-color: rgba(0, 0, 0, 0.87);
      }
    }

    :focus-within {
      padding: 4px;
      border-width: 2px;
      border-color: #3c9f80;

      .te-toolbar-section {
        border-width: 2px;
        border-color: #3c9f80;
      }
    }
  }
`

const WYSIWYGInput: FC<Props> = ({ name, subName, index, label, required }) => {
  const { lang } = useTranslation()
  const ref = useRef(null)
  const formName =
    typeof index === 'number' && subName ? `${name}[${index}].${subName}` : name
  const [component, setComponent] = useState(null)

  const [, meta, helper] = useField(formName)

  // useEffect(() => {
  //   ref?.current?.getInstance().setMarkdown(meta.value)
  // }, [meta.value])

  useEffect(() => {
    if (!isServer) {
      const { Editor } = require('@toast-ui/react-editor')
      setComponent({ Component: Editor })
    }
  }, [])

  return (
    <EditorWrapper>
      <FormLabel style={{ marginBottom: 10 }}>
        {label + (required ? ' *' : '')}
      </FormLabel>

      {component?.Component && (
        <component.Component
          onChange={() =>
            helper.setValue(ref?.current?.getInstance().getMarkdown())
          }
          initialValue={meta.value}
          ref={ref}
          toolbarItems={[
            'heading',
            'bold',
            'italic',
            'strike',
            'divider',
            'hr',
            'quote',
            'divider',
            'ul',
            'ol',
            'task',
            'indent',
            'outdent',
            'divider',
            'table',
            'image',
            'link',
          ]}
          language={lang}
          hideModeSwitch
          initialEditType='wysiwyg'
          usageStatistics={false}
        />
      )}
    </EditorWrapper>
  )
}

export default WYSIWYGInput

interface Props {
  name: string
  subName?: string
  index?: number
  label: string
  required?: boolean
}
