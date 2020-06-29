import { withA11y } from '@storybook/addon-a11y'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import withFormik from 'storybook-formik'
import { AddressInput, getTheme } from '../src'
import Footer from '../src/Footer'

export default {
  title: 'Composites',
  decorators: [withKnobs, withA11y, withFormik, muiTheme([getTheme])],
}

export const AddressInputStory = (props) => (
  <AddressInput withBilling={boolean('With Billing Address', true)} />
)

export const FooterStory = (props) => <Footer />
