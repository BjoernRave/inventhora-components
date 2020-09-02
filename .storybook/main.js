module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-knobs/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    // '@degjs/storybook-addon-taffy/register',
    'storybook-addon-material-ui/register',
    'storybook-formik/register',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
          },
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    })

    config.resolve.extensions.push('.ts', '.tsx')

    return config
  },
}
// import { configure, addDecorator } from '@storybook/react'
// import Wrapper from './Wrapper'
// import { withTaffy } from '@degjs/storybook-addon-taffy'

// addDecorator(Wrapper)

// import '@storybook/addon-console'

// // addDecorator(withTaffy)
