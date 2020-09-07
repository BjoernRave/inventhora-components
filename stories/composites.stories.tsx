import { withA11y } from '@storybook/addon-a11y'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import React, { useState } from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import withFormik from 'storybook-formik'
import StorybookWrapper from '../.storybook/Wrapper'
import { DocumentViewer, getTheme, ImageViewer, Table } from '../src'
import Footer from '../src/Footer'
export default {
  title: 'Composites',
  decorators: [
    StorybookWrapper,
    withKnobs,
    withA11y,
    withFormik,
    muiTheme([getTheme(false)]),
  ],
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
      data={
        boolean('Has data', true)
          ? [
              { name: 'Shoe', amount: 10 },
              { name: 'Table', amount: 20 },
              { name: 'Trouser', amount: 22 },
              { name: 'Ball', amount: 19 },
            ]
          : null
      }
      columns={[
        { accessor: 'name', Header: 'Name' },
        { accessor: 'amount', Header: 'Amount' },
      ]}
      withSearch={boolean('With Search?', true)}
    />
  )
}

export const ImageViewerStory = (props) => {
  const [images, setImages] = useState<any>([
    { url: '/image1.jpg', order: 0 },
    { url: '/image2.jpg', order: 1 },
    { url: '/image3.jpg', order: 2 },
  ])
  return (
    <ImageViewer
      onOrderChange={
        boolean('With Order Change', true)
          ? (newImages) => setImages(newImages)
          : null
      }
      onDelete={boolean('Can Delete?', false) ? () => {} : null}
      images={images}
    />
  )
}

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
