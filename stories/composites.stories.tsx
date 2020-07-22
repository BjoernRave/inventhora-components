import { withA11y } from '@storybook/addon-a11y'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import React, { useState } from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import withFormik from 'storybook-formik'
import { DocumentViewer, getTheme, ImageViewer, Table } from '../src'
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

export const ImageViewerStory = (props) => (
  <ImageViewer
    onDelete={boolean('Can Delete?', false) ? () => {} : null}
    images={[
      { url: '/image1.jpg' },
      { url: '/image2.jpg' },
      { url: '/image3.jpg' },
    ]}
  />
)

export const DocumentViewerStory = (props) => (
  <DocumentViewer
    canDownload={boolean('Can Download', true)}
    onDelete={boolean('Can Delete?', true) ? () => {} : null}
    documents={[
      { url: '/image1.jpg', name: 'Document1' },
      { url: '/image2.jpg', name: 'Document2' },
      { url: '/image3.jpg', name: 'Document3' },
    ]}
  />
)
