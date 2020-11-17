import { withA11y } from '@storybook/addon-a11y'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import StorybookWrapper from '../.storybook/Wrapper'
import { DocumentViewer, getTheme, SubmitButton } from '../src'
export default {
  title: 'General',
  decorators: [
    StorybookWrapper,
    withKnobs,
    withA11y,
    muiTheme([getTheme(false)]),
  ],
}

const exampleFiles = [
  { url: 'https://inventhora.com', name: 'Document 1' },
  { url: 'https://inventhora.com', name: 'Document 2' },
  { url: 'https://inventhora.com', name: 'Document 3' },
]

export const SubmitButtonStory = (props) => (
  <SubmitButton loading={boolean('Is Loading?', false)}>Submit</SubmitButton>
)

export const DocumentViewerStory = (props) => (
  <DocumentViewer
    onDelete={boolean('With Delete', true) ? () => {} : null}
    documents={exampleFiles}
  />
)
