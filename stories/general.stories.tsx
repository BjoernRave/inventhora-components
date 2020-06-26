import { withA11y } from '@storybook/addon-a11y'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import { getTheme, SubmitButton } from '../src'

export default {
  title: 'General',
  decorators: [withKnobs, withA11y, muiTheme([getTheme])],
}

export const SubmitButtonStory = (props) => (
  <SubmitButton loading={boolean('Is Loading?', false)}>Submit</SubmitButton>
)
