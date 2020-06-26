import { configure, addDecorator } from '@storybook/react'
import Wrapper from './Wrapper'
import { withTaffy } from '@degjs/storybook-addon-taffy'

addDecorator(Wrapper)

import '@storybook/addon-console'

addDecorator(withTaffy)
