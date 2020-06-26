import { Form as FormikForm } from 'formik'
import styled from 'styled-components'

const Form = styled(FormikForm)`
  > *:not(label) {
    margin: 8px 0;
  }

  > button {
    margin: 20px 0;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Form
