import styled from 'styled-components'
import TextInput from './Basic/TextInput'

const ZipInput = styled(TextInput)`
  width: 30% !important;

  @media (max-width: 767px) {
    width: 100% !important;
  }
`

export default ZipInput
