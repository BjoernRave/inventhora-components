import { withA11y } from '@storybook/addon-a11y'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import React, { useState } from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import withFormik from 'storybook-formik'
import { getTheme, Table } from '../src'
import Footer from '../src/Footer'

export default {
  title: 'Composites',
  decorators: [withKnobs, withA11y, withFormik, muiTheme([getTheme])],
}

export const FooterStory = (props) => <Footer />

export const TableStory = (props) => {
  const [selected, setSelected] = useState(null)
  return (
    <Table
      selected={boolean('Selectable', false) ? selected : null}
      onRowClick={
        boolean('Selectable', false) ? (row) => setSelected(row.id) : null
      }
      data={[
        { name: 'Shoe', amount: 10 },
        { name: 'Table', amount: 20 },
        { name: 'Trouser', amount: 22 },
        { name: 'Ball', amount: 19 },
      ]}
      columns={[
        { accessor: 'name', Header: 'Name' },
        { accessor: 'amount', Header: 'Amount' },
      ]}
      withSearch={boolean('With Search?', true)}
    />
  )
}
